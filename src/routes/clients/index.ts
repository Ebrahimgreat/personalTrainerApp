import { Hono } from "hono";
import { db } from "../../db";
import { and, between, eq, inArray, isNotNull, like, lte, max } from "drizzle-orm";
import { clerkMiddleware,getAuth } from "@hono/clerk-auth";
import { workoutTable,workoutDetailsTable,usersTable, userProgrammeTable,exerciseTable, weightTable, measurementsTable, measurementsDataTable } from "../../db/schema";
import { createClerkClient } from "@clerk/backend";
import { number, set } from "zod";
import { programmeDetails } from "../../../frontend/src/components/programmeDetails";
import { Exercise, ExerciseDetailed } from "../../types/Exercise/exercise";
import { Client, DetailedClient } from "../../types/client/client";
import { info } from "console";
import { DetailedWorkout, Workout, workoutDetails } from "../../types/workout/workout";
import { idSchema, idSchema } from "../../zod/idSchema";
import WorkoutStats from "../../../frontend/src/components/clientPage/workoutStats/workoutStats";

const clientRoutes=new Hono();




function addDays( startDate:Date,days:number):string[]{
  const dateArray:string[]=[];
  for(let i=0; i<days; i++)
  {
    const dateString=new Date(startDate.getTime()+(i*1)*24*60*60*1000).toISOString().split('T')[0];
   

    dateArray.push(dateString);
    
console.log(dateString)
   
  }

  return dateArray
 
 
}



clientRoutes.get('/:id/workoutStats',async(c)=>{
  let dateArray:string[]=[];
  let startDate:Date=new Date();
  
  const query:string= String((c.req.query('date')))
  if(query!=''){
    startDate= new Date(query);
    
  }
 

  dateArray=addDays(startDate,7);



 

  const id=Number(c.req.param('id'))
  const parse=idSchema.safeParse({id})
  if(!parse.success){
    return c.json({error:'"Walidation Error"'})
  }
const workout=await db.select().from(workoutDetailsTable).innerJoin(workoutTable,eq(workoutDetailsTable.workout_id,workoutTable.id)).where(and(eq(workoutTable.user_id,id),inArray(workoutTable.created_at,dateArray))).innerJoin(exerciseTable,eq(workoutDetailsTable.exercise_id,exerciseTable.id))

type bodyPart={
  equipmentName:string,
  stats:bodyPartStats

}
type bodyPartStats={

  totalSets:number,
  totalVolume:number,
}
const myStats=new Map<string,{totalSets:number; totalVolume:number}>();
const type=['Chest','Biceps','Legs','Triceps','Back','Abs'];
for(let i=0; i<type.length; i++)
{
  myStats.set(type[i],{
    totalSets:0,
    totalVolume:0
  })
}

for(let i=0; i<workout.length; i++){
  if(myStats.has(workout[i].exercise.type)){
    console.log("YES")
    const currentStats=myStats.get(workout[i].exercise.type) || {totalSets:0,totalVolume:0}
    const newVolume=currentStats.totalVolume+Number(workout[i].workoutDetails.weight)
    const newSets=currentStats.totalSets+1;
  

   myStats.set(String(workout[i].exercise.type),{
    totalVolume:newVolume,
    totalSets:newSets
   })

  }

}


let myArray:bodyPart[]=[];


for(let i=0; i<type.length; i++){
  if(myStats.has(type[i])){
    const volume=myStats.get(type[i]);
  
      myArray.push({
        equipmentName:type[i],
          stats:{
            totalSets:volume?.totalSets??0,
            totalVolume:volume?.totalVolume??0

          }
        })
      }
     

   
  
}
return c.json(myArray)



});

clientRoutes.get('/',async(c)=>{
    const auth=getAuth(c)
 
    if(!auth?.userId){
        return c.json('failed')
    }
   const searchString:string=c.req.query('name')?? '';
   const searchValue:string=searchString??'';

      const data=await db.query.usersTable.findMany({
      where: and(isNotNull(usersTable.parent_id),
      like(usersTable.name,`%${searchValue}%`)
    )
      ,
      columns:{
        user_id:false,
        password:false,
        parent_id:false
      },
      with:{
        userProgramme:{
          columns:{
            user_id:false
          },
          with:{
            
            programme:{
              columns:{
                user_id:false,
                assigned_to:false
              }
            }
          }
        }
      }
       
    
         
    })
    

    if(!data)
    {
        return c.json('not found')
    }
    
    return c.json(data)
})




clientRoutes.get('/:id/programmes',async(c)=>{


  type programmeDetails={
    id:number,
  
    name:string,
    sets:number,
    repRange:number
    exercise:Exercise
  }
  type ProgrammeWorkout={
    id:number,
    name:string,
    details:programmeDetails[]

  }
  type Programme={
    status:string,
    id:number,
    name:string,
    description:string
    workout:ProgrammeWorkout;

  }
  type ExpectedProgramme={
    id:number,
    name:string,
    description:string,
    user_id:number,
    

  }
  
  
  type myProgramme={
    programme:Programme,
   

  }
  
  
  const id=c.req.param('id');
  const userProgramme=await db.query.userProgrammeTable.findMany({
    
    where:and(
    eq(userProgrammeTable.user_id,id),
    eq(userProgrammeTable.status,'active')
    ),
    with:{
     programme:{
      with:{
        programmeWorkout:{
          with:{
            programmeDetails:{
             with:{
              exercise:true
             }
            }
          }
        }
      }
     }
    }
    
  })
  


  const myProgramme:Programme[]=userProgramme.map((item)=>({
    status:item.status,
    id:Number(item.programme?.id??0),
    name:String(item.programme?.name?? ""),
    description:String(item.programme?.description??""),
    workout:item.programme?.programmeWorkout?.map((value:ProgrammeWorkout)=>({
      id:value.id,
      name:value.name,
      details:value.programmeDetails.map((detail:programmeDetails)=>({
        id:detail.id,
  
        exercise:{
          name:detail.exercise.name,
          id:detail.exercise.id
        },
        repRange:detail.repRange,
        sets:detail.sets
      

      }))
    }))

  }))


  return c.json(myProgramme);
})




clientRoutes.get('/:id/measurements',async(c)=>{

  type UserMeasurement={
    name:string,
    created_at:string,
    value:number
  }
  const id=Number(c.req.param('id'));
  const result=idSchema.safeParse({id});
  const query:number=Number(c.req.query('id'));
  const searchId:number=query?? null;



  if(!result.success){
    return c.json({error:'validation Failed'})
  }
  if(searchId==0 || searchId==null)
  {
    return c.json('Please Provide correct Id of the measurement')
  }
  
  const data= await db.select().from(measurementsDataTable).innerJoin(measurementsTable,eq(measurementsDataTable.measurement_id,measurementsTable.id)).where(and(eq(measurementsDataTable.user_id,id),eq(measurementsTable.id,searchId))).limit(5)
 const measurements:UserMeasurement=data.map((item)=>({
  name:item.measurements.name,
  created_at:item.measurementsData.created_at,
  value:item.measurementsData.value

 }))
  return c.json(measurements)
});

clientRoutes.get('/:id/workoutHistory',async(c)=>{



  const id=Number(c.req.param('id'));
  const dateQuery=c.req.query('date');
  const date:string=dateQuery?? ""
  const result=idSchema.safeParse({id});
  if(!result.success){
    return c.json({error:'Validation Failed'})
  }

  const workout=await db.query.workoutTable.findMany({
    where:and(eq(workoutTable.user_id,id),
    like(workoutTable.created_at,`%${date}%`)
  ),
 
    with:{
      programme:true,
      workoutDetail:{
        with:{
          exercise:{
            columns:{
              photo:false,
              instructions:false
            }
          }
        }
      }
    }
  })




  const myWorkout:DetailedWorkout[]=workout.map((item)=>({
    id:item.id,
    name:item?.name?? "",
    created_at:item.created_at,
    programme:{
      name:item.programme?.name?? "",
      description:item.programme?.description?? "",
      
    },
  
    
    workout:item.workoutDetail.map((value:workoutDetails)=>({
      id:value.id,
    reps:value.reps,
    sets:value.set,
    weight:value.weight,
    rir:value.rir,
    exercise:{
      name:value.exercise.name,
      id:value.exercise.id
    }


    }))
   

  }))
 

  return c.json(myWorkout)

})


clientRoutes.get('/:id',async(c)=>{

const id=c.req.param('id');


type clientInfo={
  client:DetailedClient
}


const response=await db.query.usersTable.findFirst({
  where:eq(usersTable.id,id),
  columns:{
    password:false,
    parent_id:false,
    user_id:false
    
  },
  with:{
    userProgramme:{
    
      with:{
        programme:{
          columns:{
            user_id:false,
            assigned_to:false

          },
          with:{
           programmeWorkout:{
            with:{
              programmeDetails:true
            }
           }
          }
        }
        
      }
    },
    weight:{
      columns:{
        user_id:false
      }
    },
    workout:{
      with:{
        workoutDetail:{
          with:{
            exercise:true
          }
        }
      }
    }
  

  }

})



const information:clientInfo={
  client:{
    name:response?.name??'Unkown',
    age:response?.age?? 18,
    email:response?.email?? '',
    weight:response?.weight.map((item)=>({
      scaleWeight:item.scaleWeight,
      created_at:new Date(item.created_at)

    })),
    programme:{
        name:response?.userProgramme?.[0]?.programme?.name?? 'No Programme',
        description:response?.userProgramme?.[0]?.programme?.description?? 'No Description'

    },
    workout:response?.workout.map((item)=>({
      name:item?.name?? '',
      created_at:item.created_at,
      workoutDetail:item.workoutDetail.map((value)=>({
        id:value.id,
        set:value.set,
        reps:value.reps,
        name:value.exercise.name,
        exercise_id:value.exercise.id,


      }))
    }))
    
      
      
    }

}

return c.json(information)


})


clientRoutes.get('/:id/weights',async(c)=>{
  const id=c.req.param('id')

  const weight=await db.query.weightTable.findFirst();
  return c.json(weight)

})


clientRoutes.get('/:id/stats',async(c)=>{


  const exercise_id=c.req.query('id');
 const query=c.req.param('id')


 type maximumExercise={
  maximumWeight:number,
  exercise:ExerciseDetailed,

  
 }
 let stats:maximumExercise={
  maximumWeight:0,
  exercise:{
    name:'',
 
    id:Number(query),
    target:'',
    equipment:'',
  }
 }


  const data=await db.query.workoutDetailsTable.findMany({
    where:eq(workoutDetailsTable.exercise_id,exercise_id),
    with:{
      exercise:true
    }
  })

  

  for(let i=0; i<data.length; i++){
  if(stats.maximumWeight<Number(data[i].weight)){
    stats.maximumWeight=Number(data[i].weight)
  stats.exercise={
    id:Number(data[0].exercise_id),
    name:String(data[0].exercise?.name ?? ""),
    target:data[0].exercise.target?? "",
    equipment:data[0].exercise.equipment
  




  }
      
  }
}
return c.json(stats);
});

  

clientRoutes.post('/store',async(c)=>{
   const data=await c.req.json()
  
   
   try{
    
    const clerkClient=createClerkClient({secretKey:process.env.CLERK_SECRET_KEY})


  const user=await clerkClient.users.createUser({
    
    emailAddress:[data.item.emailAddress],
    password:data.item.password
  })
   return c.json('Created')


}
catch(error){
    console.log(error)
    return c.json('No',{message:error})
   
  

}
}
)

export default clientRoutes;