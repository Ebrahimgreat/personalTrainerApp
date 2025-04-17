import { Hono } from "hono";
import { db, } from "../../db/index.js";
import { eq,sum } from "drizzle-orm";
import { nutritionTable } from "../../db/schema.js";
import { nutritionSchema, removeNutritionSchema } from "../../zod/nutirtionSchema.js";

const nutritionRoutes=new Hono();
nutritionRoutes.get('/',async(c)=>{
    const page:number=Number(c.req.query('page'))
    console.log('from nutrition')
    const nutrition=await db.select({calories:sum(nutritionTable.calories),protein:sum(nutritionTable.protein),created_at:nutritionTable.created_at,carbs:sum(nutritionTable.carbs),fat:nutritionTable.fat}).from(nutritionTable).limit(5).offset((page-1)*5).groupBy(nutritionTable.created_at)
    return c.json(nutrition);
})
nutritionRoutes.get('/show',async(c)=>{
    const query=new Date(c.req.query('date'));

    const data=await db.select().from(nutritionTable).where(eq(nutritionTable.created_at,query));
    return c.json(data)

})


nutritionRoutes.post('/remove',async(c)=>{
    const body=await c.req.json();
 
  
    const result=removeNutritionSchema.safeParse(body);
  
    if(!result.success)
    {
        return c.json({message:'Validation has been failed',error:result.error})
    }
    else{

        await db.delete(nutritionTable).where(eq(nutritionTable.id,body.id))
        return c.json('deleted successfully')
    }

})






nutritionRoutes.post('/store',async(c)=>{
    const body=await c.req.json();
  body.item.forEach(value => {
    const result=nutritionSchema.safeParse(value);
    if(!result.success)
    {
        console.log("Failed")
    }
})
    
        for (let index = 0; index < body.item.length; index++) {
            await db.insert(nutritionTable).values({
                protein:body.item[index].protein,
                carbs:body.item[index].carbs,
                fat:body.item[index].fat,
                calories:body.item[index].calories,
                user_id:body.item[index].user_id,
                created_at: new Date(body.item[index].created_at)
                
            })
    
        }
        return c.json("nutrient created")

})
      




export default nutritionRoutes