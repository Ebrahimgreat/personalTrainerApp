import { Hono } from "hono";
import { exerciseSchema } from "../../zod/exerciseSchema.js";
import { db } from "../../db/index.js";
import { like } from "drizzle-orm";
import { exerciseTable } from "../../db/schema.js";
const exerciseRoutes=new Hono();


exerciseRoutes.get('/all',async(c)=>{
  const body=await db.select().from(exerciseTable);
  return c.json(body)
})
exerciseRoutes.get('/',async(c)=>{
    const query=c.req.query('name');
    if(query=='')
    {
      const body=await db.select().from(exerciseTable).limit(5);
    }
    const body=await db.select().from(exerciseTable).where(like(exerciseTable.name,`${query}%`))
    return c.json(body);
})
exerciseRoutes.post('/store',async(c)=>{
    const body=await c.req.json();


    const result=exerciseSchema.safeParse(body);
    if(!result.success)
    {
        return c.json('failed sir')
    }

      await db.insert(exerciseTable).values({
        name:body.name,
        description:body.description
      })
      return c.json("Accepted")
    }

)
export default exerciseRoutes;
