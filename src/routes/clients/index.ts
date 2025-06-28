import { Hono } from "hono";
import { db } from "../../db/db";
import { and, between, desc, eq, inArray, isNotNull, like, lte, max } from "drizzle-orm";
import { clerkMiddleware,getAuth } from "@hono/clerk-auth";
import { workoutTable,workoutDetailsTable,usersTable, userProgrammeTable,exerciseTable, weightTable, measurementsTable, measurementsDataTable, programmesTable } from "../../db/schema";
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
import { deleteMeasurementSchema, insertMeasurementMultipleSchema, insertWeightSchema, measurementSchema, updateMeasurementSchema } from "../../zod/measurementsSchema";
import { Programme } from "../../types/userProgramme/programme";
import { clientDeletionSchema, clientUpdateSchema } from "../../zod/clientSchema";
import { workoutSchema } from "../../zod/workoutSchema";
import { workoutHistory, workoutHistorySchema } from "../../zod/workoutHistorySchema";
import { updateClientProgrammeSchema, userProgrammeSchema } from "../../zod/clientProgrammeschema";
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



clientRoutes.post('/delete',async(c)=>{
  const auth=getAuth(c);
  if(!auth?.userId){
    return c.json({message:"Unverfied"})
  }

  const body=await c.req.json();
  const verfication=clientDeletionSchema.safeParse(body);
  if(verfication.error)
  {
    return c.json({message:"Error"})
  }
  const data=await db.delete(usersTable).where(eq(usersTable.id,body.id))
  return c.json("Data deleted")
  
})

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
const workout = await db
  .select()
  .from(workoutDetailsTable)
  .innerJoin(workoutTable, eq(workoutDetailsTable.workout_id, workoutTable.id))
  .innerJoin(exerciseTable, eq(workoutDetailsTable.exercise_id, exerciseTable.id))
  .where(
    and(
      eq(workoutTable.user_id, id),
      inArray(workoutTable.created_at, dateArray)
    )
  );
return c.json(workout)
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

const mainClientRoute=clientRoutes.get('/',async(c)=>{
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
      columns:{
        assigned_to:false,
        
      },
      with:{
        programmeWorkout:{
          with:{
            programmeDetails:{
              columns:{
                programme_workoutId:false,

              },
             with:{
              exercise:{
                columns:{
                  instructions:false,
              photo:false
                }
              }
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

  const verfication=userProgrammeSchema.safeParse(userProgramme);
  if(verfication.error){
    return c.json({message:verfication.error.format()})
  }
 

  return c.json(userProgramme)


  
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










clientRoutes.post('/:id/updateProgramme',async(c)=>{
  const id=Number(c.req.param('id'))
  const auth=getAuth(c);
  if(auth?.userId){
   return c.json({messsage:"Verification Failed"})
  }
  const data=await c.req.json();
  const verfication= updateClientProgrammeSchema.safeParse(data);
  if(verfication.error){
    return c.json({messsage:"Error"})
  }
  const programmeFind=await db.query.userProgrammeTable.findFirst({
    where:and(
      eq(userProgrammeTable.status,'active'),
      eq(userProgrammeTable.user_id,id)
    )

  })
  if(programmeFind){
    const dataUpdata=await db.update(userProgrammeTable).set({status:'not active'}).where(eq(userProgrammeTable.programme_id,programmeFind.id))
  }
  const newData=await db.insert(userProgrammeTable).values({programme_id:data.id,user_id:id,status:'active'}).returning();
  return c.json(newData)
  




})


//Measurements


clientRoutes.get('/:id/measurements',async(c)=>{
  const auth=getAuth(c);
  if(auth?.userId){
    return c.json({Error:"Unable to verify User"});
  }


  type Measurement={
    id:number,
    name:string,
    created_at:string,
    value:number,
  }
  const id=Number(c.req.param('id'));
  const result=idSchema.safeParse({id});
  const query:number=Number(c.req.query('id'));
  const searchId:number=query?? null;



  if(!result.success){
    return c.json({error:'validation Failed'})
  }
  
  
  const data= await db.select().from(measurementsDataTable).innerJoin(measurementsTable,eq(measurementsDataTable.measurement_id,measurementsTable.id)).where(and(eq(measurementsDataTable.user_id,id),eq(measurementsTable.id,searchId)));
 
 


  const measurements:Measurement=data.map((item)=>({
    id:item.measurementsData.id,
  name:item.measurements.name,
  created_at:item.measurementsData.created_at,
  value:item.measurementsData.value,


 
  }))
  return c.json(measurements)
 
 

 

});






clientRoutes.post('/:id/measurement/delete',async(c)=>{
  const auth=getAuth(c);
  if(!auth?.userId){
    return c.json({message:"Unverfied"})
  }
  const response= await c.req.json();

  const verification=deleteMeasurementSchema.safeParse(response);
  if(verification.error){
    return c.json({message:verification.error.flatten()})
  }
  const data=await db.delete(measurementsDataTable).where(eq(measurementsDataTable.id,verification.data.id)).returning();
  return c.json(data)
  
})

clientRoutes.post('/:id/measurement/storeMultiple',async(c)=>{
  const id=c.req.param('id')
  const auth=getAuth(c);
  if(!auth?.userId){
    return c.json({message:"Unverified"})
  }
  const data=await c.req.json();

  const verfication=insertMeasurementMultipleSchema.safeParse(data);
  if(verfication.error){
    return c.json({message:verfication.error.message});
  }
  for(let i=0; i<verfication.data.measurement.length; i++)
  {
    if(verfication.data.measurement[i].value!=0)
    {
      const data=await db.insert(measurementsDataTable).values({measurement_id:verfication.data.measurement[i].id,user_id:id,created_at:verfication.data.created_at})



    }
  }

  return c.json(data)
})










clientRoutes.post('/:id/measurementUpdate',async(c)=>{
  const id=Number(c.req.param('id'))
  const auth=getAuth(c);
  if(!auth?.userId){
    return c.json("Unverfied");
  }
  const data=await c.req.json();


  const verification=updateMeasurementSchema.safeParse(data);
  if(verification.error){
    return c.json("ERROR BODD")
  }
  const dataToUpdate=await db.update(measurementsDataTable).set({created_at:data.created_at,value:data.value,user_id:id}).where(eq(measurementsDataTable.id,data.id)).returning();
  return c.json(dataToUpdate);
})







const clientWorkoutHistory=clientRoutes.get('/:id/workoutHistory',async(c)=>{
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


  const workout:workoutHistory=await db.query.workoutTable.findMany({
    where:eq(workoutTable.user_id,id),
  
 
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


for(let i=0; i<workout.length; i++)
{
  const verfication=workoutHistorySchema.safeParse(workout[i])
  if(verfication.error){
    return c.json({message:verfication.error.flatten()})
  }
}
const workoutToSend:workoutHistory=workout;
return c.json(workoutToSend)

})


clientRoutes.get('/:id',async(c)=>{

const id=c.req.param('id');


type clientInfo={
  client:DetailedClient
}


const data=await db.query.usersTable.findFirst({
  where:eq(usersTable.id,id)

});
return c.json(data)





})

clientRoutes.post('/:id/weights/store',async(c)=>{


  const id=c.req.param('id')
const auth=getAuth(c);
if(!auth?.userId){
  return c.json({message:"Unverified"})
}
const data=await c.req.json();

const verfication=insertWeightSchema.safeParse(data);

if(verfication.error){
return c.json({message:verfication.error.flatten()})
}
const newRecord=await db.insert(measurementsDataTable).values({value:verfication.data.scaleWeight,created_at:verfication.data.created_at,user_id:id,measurement_id:4}).returning();
return c.json(newRecord)


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





clientRoutes.post('/:id/updateInformation',async(c)=>{
  const id=Number(c.req.param('id'))
  const auth=getAuth(c);
  if(!auth?.userId){
    return c.json({message:"Verification of User Failed"})
  }
  const data=await c.req.json();
const verifcationOfData=clientUpdateSchema.safeParse(data);
if(verifcationOfData.error){
  return c.json({message:"Verfication Failed"})
}
const updateInformation=await db.update(usersTable).set({name:data.name,age:data.age,notes:data.notes}).where(eq(usersTable.id,id));
return c.json(updateInformation)

})



  

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
  
  const body=await c.req.json();
  const workoutVerification=workoutSchema.safeParse(body.workout);
  if(workoutVerification.error){
    return c.json({message:"Failed To verify"})
  }
  const insertRecord=await db.insert(workoutTable).values({name:body.workout.name,date:body.workout.date,user_id:id}).returning();
   for(let i=0; i<body.workout.workout.length; i++)
   {
    const newRecord=await db.insert(workoutDetailsTable).values({workout_id:insertRecord[0].id,set:body.workout.workout[i].exercise.set,reps:body.workout.workout[i].reps,weight:body.workout.workout[i].weight,exercise_id:body.workout.workout[i].id})

   }
 return c.json({message:"Workout Added"})
  
})
export default clientRoutes;
export type mainClientType= typeof mainClientRoute;
export type clientWorkoutHistoryType= typeof clientWorkoutHistory