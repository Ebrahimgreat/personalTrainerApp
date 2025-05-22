import { Hono } from "hono";
import { db, } from "../../db/index.js";

import { eq,sum,sql } from "drizzle-orm";
import { nutritionTable } from "../../db/schema.js";
import { usersTable } from "../../db/schema.js";
import { weightTable } from "../../db/schema.js";
import { unionAll } from 'drizzle-orm/sqlite-core'
import { clerkMiddleware,getAuth } from "@hono/clerk-auth";

import { union } from "zod";
import { use } from "chai";
const dashboardRoutes=new Hono();


dashboardRoutes.get('/',async(c)=>{

    const auth=getAuth(c);
   
  if(!auth?.userId){
    return c.json({error:'Unauthorized'});
  }
  const person=await db.query.usersTable.findMany({
    where:eq(usersTable.user_id,auth.userId),
    with:{
        children:true,
        workout:true,
        weight:true
    }
  })
  if(!person)
  {
    return c.json('not found');
  }
return c.json(person)



    const nutrientPage:number=c.req.query('weight');
    const weightPage:number=c.req.query('weight')
   


const data1=await db.select({user_id:nutritionTable.user_id,nutrientDate:nutritionTable.created_at, calories:sum(nutritionTable.calories),protein:sum(nutritionTable.protein),carbs:sum(nutritionTable.carbs),fat:sum(nutritionTable.fat)}).from(nutritionTable).where(eq(nutritionTable.user_id,1)).groupBy(nutritionTable.created_at).limit(5);
const newObject={
    weight:[],
    nutrients:[]
}

const data2=await db.select({user_id:weightTable.user_id, weightDate:weightTable.created_at, scaleWeight:weightTable.scaleWeight}).from(weightTable).where(eq(weightTable.user_id,1)).limit(5)
newObject.weight.push(...data2);
newObject.nutrients.push(...data1);
return c.json(newObject)
    const data= (await db.query.usersTable.findMany({
        with:{
            nutrients:{
                limit:5,
                orderBy:nutritionTable.created_at,
                groupBy:nutritionTable.user_id,
                columns:{
                calories:sql<number>`sum(${nutritionTable.calories})`.as('calories')
                },

                offset:(nutrientPage-1)*5,
            
              

            },
            weight:{
                limit:5,
                offset:(weightPage-1)*5
            },
            workout:{
                limit:5
            }
        },
       
    }))
    
    return c.json(data);
 

})

export default dashboardRoutes;
