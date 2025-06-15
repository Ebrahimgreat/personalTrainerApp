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
import { idSchema} from "../../zod/idSchema";
import WorkoutStats from "../../../frontend/src/components/clientPage/workoutStats/workoutStats";
import { weightSchema } from "../../zod/weightSchema";
import { Measurements } from "../../types/measurements";
import { measurementSchema } from "../../zod/measurementsSchema";
import { Programme } from "../../types/userProgramme/programme";
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
  /*
  @route Get/Clients
  Fetch all Clients for a user with a 
  @desc Fetch all Clients for the logged-in trainer
  @param{string}[name]- Optional query Param to filter Clients by name
  @returns{Array<Object>} List of Client Users
  */
    const auth=getAuth(c)
    console.log(auth);
 
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

  /*
  @route get/clients/programmes
  @desc fetch the active programme of a client that is created by the logged in trainer
  @param{string} id
  @returns{Programme}} Active Programme with their details and exercise
  */


  
  const auth=getAuth(c);
  if(auth?.userId){
    return c.json({Error:"Unable to verify user"});
  }
  const id=c.req.param('id');
  const userProgramme=await db.query.userProgrammeTable.findFirst({
    
    where:and(
    eq(userProgrammeTable.user_id,id),
    eq(userProgrammeTable.status,'active'),

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
  if(!userProgramme){
    return c.json({})
  }


  
const programme:Programme={
  status:userProgramme?.status?? "",
  id:Number(userProgramme?.programme?.id),
  name:(userProgramme.programme?.name?? ""),
  description:userProgramme.programme?.description?? "",
  workout:userProgramme.programme?.programmeWorkout?.map((value)=>({
    id:value.id,
    name:value.name,
    details:value.programmeDetails?.map((detail)=>({
      id:detail.id,
      repRange:detail.repRange,
      set:detail.sets,
    exercise:{
      id:detail.exercise.id,
      name:detail.exercise.name,
      equipment:detail.exercise.equipment

    }
    }))
  }))
  

}

  return c.json(programme);
})




clientRoutes.get('/:id/measurements',async(c)=>{
  const auth=getAuth(c);
  if(auth?.userId){
    return c.json({Error:"Unable to verify User"});
  }


  type UserMeasurement={
    name:string,
    created_at:string,
    value:number,
    trend?:number
  }
  const id=Number(c.req.param('id'));
  const result=idSchema.safeParse({id});
  const query:number=Number(c.req.query('id'));
  const searchId:number=query?? null;



  if(!result.success){
    return c.json({error:'validation Failed'})
  }
  
  
  const data= await db.select().from(measurementsDataTable).innerJoin(measurementsTable,eq(measurementsDataTable.measurement_id,measurementsTable.id)).where(and(eq(measurementsDataTable.user_id,id),eq(measurementsTable.id,searchId))).limit(7)
 
 if(searchId!=5){

  const measurements:UserMeasurement=data.map((item)=>({
  name:item.measurements.name,
  created_at:item.measurementsData.created_at,
  value:item.measurementsData.value,

 }))
 
 return c.json(measurements)

}
else{

  let trendWeight:number=0;
  let measurements:UserMeasurement[]=[]
  for(let i=0; i<data.length; i++)
  {
    console.log(data[i].measurementsData.value)
    const trend:number=Number(data[i].measurementsData?.value??0)
    const trendWeight:number=trend/(i+1)
  measurements.push({
    name:data[i].measurements.name,
    created_at:data[i].measurementsData.created_at?? "",
    value:Number(data[i].measurementsData.value?? 0),
    trend:trend

  })

  }
  return c.json(measurements)
 

}
 

});







clientRoutes.get('/:id/workoutHistory',async(c)=>{
  const auth=getAuth(c);
  if(auth?.userId){
    return c.json({Error:"Unable to verify User"});
  }




  
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
    measurementData:{
      with:{
        measurement:true
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
    measurement:response?.measurementData?.map((item)=>({
      id:item.id
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

clientRoutes.post('/:id/weights/store',async(c)=>{


  
  const body:Weight=c.req.json();
  return c.json(body)
  const id=Number(c.req.param('id'));
  const verification=idSchema.safeParse({id});
  if(!verification.success){
    return c.json('Error has occcured');

  }
  const measurement=await db.insert(measurementsDataTable).values({
    measurement_id:5,
    user_id:id,
    created_at:body.created_at,
    value:body.scaleWeight,
   
  })
  return c.json("Data has been created")


})



clientRoutes.post('/:id/measurements/store',async(c)=>{
  const body=await c.req.json();
  return c.json(body)
  const id=Number(c.req.param('id'));
  
  const verification=idSchema.safeParse({id});
  if(!verification.success){
    return c.json("Error has occured")
  }
  return c.json("no error has occured")


let measurements:Measurements[]=[
  {created_at:'2025-01-01',value:85,measurement_id:5,user_id}
]
for(let i=0; i<measurements.length; i++)
{
  const verfication=measurementSchema.safeParse(measurements[i]);
  if(!verfication.success){
    return c.json("Error has been occured")
  }
}
return c.json('No Error')
});





clientRoutes.post('/:id/weights/store',async(c)=>{
  
  const id:number=Number(c.req.param('id'));

  const verification=idSchema.safeParse({id});
  if(!verification.success)
  {
    return c.json('Schema Valiation has been failed')
  }
  const body={
    scaleWeight:50,
    created_at:new Date(),
    user_id:id
  }
  const verificationOfWeight=weightSchema.safeParse(body);
  if(!verification.success){
    return c.json("Validation has been failed");
  }
  const newWeight=await db.insert(measurementsDataTable).values({
    measurement_id:3,
    value:50,
    user_id:id
  });
  console.log("Weight inserted")
 return c.json("Weight Has been stored");
  
})

clientRoutes.get('/:id/weights',async(c)=>{
  const id=c.req.param('id')

  const weight=await db.query.weightTable.findFirst();
  return c.json(weight)

})


clientRoutes.get('/:id/stats',async(c)=>{


  const exercise_id=c.req.query('id');
 const query=c.req.param('id')


 type Stats={
  created_at:string,
  exercise:{
    name:string,
    id:number
  }
  reps:number,
  weight:number,
  rir:number,
  set:number
 }

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

const data=await db.select().from(workoutDetailsTable).innerJoin(exerciseTable,eq(workoutDetailsTable.exercise_id,exerciseTable.id)).innerJoin(workoutTable,eq(workoutDetailsTable.workout_id,workoutTable.id)).where(and(eq(workoutTable.user_id,query),eq(exerciseTable.id,exercise_id)))

 
  

  const statsWorkout:Stats[]=data.map((item)=>({
    created_at:item.workout.created_at,
    exercise:{
      name:item.exercise.name,
      weight:item.workoutDetails.weight,
      reps:item.workoutDetails.reps,
      set:item.workoutDetails.set,
      rir:item.workoutDetails.rir
    }

  }))

  
    
return c.json(statsWorkout);
});






  

clientRoutes.post('/store',async(c)=>{
   const data=await c.req.json()

   return c.json("HELLO");
  
   
   try{
    
    const clerkClient=createClerkClient({secretKey:process.env.CLERK_SECRET_KEY})


  const user=await clerkClient.users.createUser({
    
    emailAddress:[data.emailAddress],
    password:data.password
  })
  console.log(user)
  return c.json(user)
   

}
catch(error){
    console.log(error)
  
  

}
}



)






clientRoutes.post('/:id/workout/store',async(c)=>{
  const auth=getAuth(c);
  const id:number=Number(c.req.param('id'));
  if(!auth?.userId){
    return c.json("Error")
  }
 const verification=idSchema.safeParse({id});
 if(!verification.success){
  return c.json("Error has been occured");
 }



  type Exercise={
    id:number,
    name:string
  }
  type exerciseDetails={
    id:number,
    set:number,
    reps:number,
    weight:number
   

  }
  type workoutDetails={
    id:number,
    name:string,
    exercise:Exercise[];


  }
  type workout={
    name:string,
    date:string,
    id:number,
    workout:workoutDetails[]

  }
  
  const body:workout=await c.req.json();
  return c.json(body)
  
})
export default clientRoutes;