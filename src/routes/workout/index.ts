import { Hono } from "hono";
import { workoutSchema,workoutDeletionSchema } from "../../zod/workoutSchema.js";
import { db } from "../../db/index.js";
import { eq } from "drizzle-orm";

import { usersTable, weightTable, workoutDetailsTable, workoutTable } from "../../db/schema.js";
import { getAuth } from "@hono/clerk-auth";
import { create } from "domain";
const workoutRoutes=new Hono();
workoutRoutes.get('/',async(c)=>{
    const auth=getAuth(c);
    if(!auth?.userId){
        return c.json('error')
    }

    
    const findUser=await db.query.usersTable.findFirst({
      where:eq(usersTable.user_id,auth.userId)
    });

    if(!findUser){
        return c.json('not exist')
    }
   const data=await db.query.workoutTable.findMany({
    where:eq(weightTable.user_id,findUser?.id),
    with:{
        programme:true
    }
   
   })
   return c.json(data);

})

workoutRoutes.post('/remove',async(c)=>{
    const data=await c.req.json();
    const result=workoutDeletionSchema.safeParse(data.item);
    if(!result.success)
    {
        return c.json({message:'Validation has been failed',error:result.error})

    }


try{
    await db.delete(workoutDetailsTable).where(eq(workoutDetailsTable.workout_id,data.item.id));
    await db.delete(workoutTable).where(eq(workoutTable.id,data.item.id)).returning()

}
catch(error)
{
   return c.json("Error")
}
   return c.json('no error')

   

})


workoutRoutes.get('/show',async(c)=>{
    const value=c.req.query('date');
    const query=new Date(value);
  
    
    const data=await db.query.workoutTable.findFirst({
        where:eq(workoutTable.created_at,query),
        with:{
            workoutDetail:{
                with:{
                    exercise:true,

                }
            }
        },
    })
   if(!data)
   {
    return c.json("No items");
   }
   else return c.json(data)


})
workoutRoutes.get('/stats',async(c)=>{
    const query=c.req.query('id');
    const data=await db.query.workoutDetailsTable.findMany({
        where:eq(workoutDetailsTable.exercise_id,query),
        with:{
            workout:true,
            exercise:true
        }
    })
    if(!data)
    {
        return c.json("No items found")
    }
    return c.json(data)
  
  })

  workoutRoutes.post('/update',async(c)=>{
    const body=await c.req.json();
    body.item.forEach(value=>{
        console.log(value)

        const result=workoutSchema.safeParse({
            name:value.name,
            rir:value.rir,
            workout_id:value.workout_id,
            set:value.set,
            reps:value.reps,
            exercise_id:value.exercise_id
        });
        if(!result.success)
        {
         return c.json("Failed");
        }
     
 
     })
    for(let index=0; index<body.item.length; index++)
    { console.log(body.item[index].id)
        
        if( body.item && body.item[index].id!=0){
           console.log(true)
        const data=await db.update(workoutDetailsTable).set({
            exercise_id:body.item[index].exercise_id,
            set:body.item[index].set,
            weight:body.item[index].weight,
            reps:body.item[index].reps,
            rir:body.item[index].rir,
            workout_id:body.item[index].workout_id


        }).where(eq(workoutDetailsTable.id,body.item[index].id)).returning();
    }
    else{
        console.log('function execution')
        const data1=await db.insert(workoutDetailsTable).values({
            exercise_id:body.item[index].exercise_id,
            set:body.item[index].set,
            weight:body.item[index].weight,
            reps:body.item[index].reps,
            rir:body.item[index].rir,
            workout_id:7

        }).returning();
    }

    }
    return c.json("Updated")
   
  })


workoutRoutes.post('/store',async(c)=>{

    const body=await c.req.json();
    const  auth=getAuth(c)
    if(!auth?.userId){
        return c.json('not exist')
    }
    const user=await db.query.usersTable.findFirst({
        where:eq(usersTable.user_id,auth.userId)
    })
   

let workoutId={}
if(body.programme===0)
{
     workoutId=await db.insert(workoutTable).values({
        user_id:user?.id,
        created_at:body.created_at
    }).returning()
}
else{
     workoutId=await db.insert(workoutTable).values({
        user_id:user?.id,
        created_at:new Date(body.created_at),
        programme_id:body.programme
    }).returning()
}



    
  for(let i=0; i<body.item.length; i++)
  {
    console.log(body.item[i])
    const result=workoutSchema.safeParse({
        exercise_id:body.item[i].exercise_id,
        name:body.item[i].name,
        set:body.item[i].set,
        reps:body.item[i].reps,
        rir:body.item[i].rir,
        weight:body.item[i].weight,
        workout_id:workoutId[0].id




    })

    if(!result.success)
    {
        console.log(result.error)
       
        return c.json('failed',)
    }

  }


    return c.json('passed')
 


       const result=workoutSchema.safeParse(body.item);
       if(!result.success)
       {
        console.log(result.error)
        return c.json('failed')
      
       }
    
    return c.json('passed')

   
    for (let index = 0; index < body.item.length; index++) {
       const data=await db.insert(workoutDetailsTable).values({
        exercise_id:body.item[index].exercise_id,
        set:body.item[index].set,
        weight:body.item[index].weight,
        reps:body.item[index].reps,
        rir:body.item[index].rir,
       workout_id:workoutId[0].id


       })
     
        
    }
    return c.json("Workout Added")
  

    

})
export default workoutRoutes;