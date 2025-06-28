import { Hono } from "hono";
import { db } from "../../db/db";
import { desc, eq,or } from "drizzle-orm";
import { programmesTable, programmeWorkoutTable, usersTable } from "../../db/schema";
import { getAuth } from "@hono/clerk-auth";
import { programmeDeletionSchema } from "../../zod/programmeSchema";
const programmeRoutes=new Hono();


programmeRoutes.post('/delete',async(c)=>{
  const auth=getAuth(c);
  if(!auth?.userId){
    return c.json({message:"Authentication Error"})
  }
  const body=await c.req.json();
  const verification= programmeDeletionSchema.safeParse(body)
  if(verification.error){
    return c.json({message:"Error Verification"})
  }
  const data=await db.delete(programmesTable).where(eq(programmesTable.id,body.id))
  return c.json("Item Deleted");
});



programmeRoutes.post('/store',async(c)=>{
  const auth=getAuth(c);
  if(!auth?.userId)
  {
    return c.json({error:"Unable to Verify User"});
  }
  
  const userFind=await db.query.usersTable.findFirst({
    where:eq(usersTable.user_id,auth.userId)
  })
  if(!userFind){
    return c.json({message:"User does not exist"})
  }

  const body=await db.insert(programmesTable).values({
    user_id:userFind.id,
    name:'Untitled'
  }).returning({id:programmesTable.id});
  return c.json(body);


})

programmeRoutes.post('/update',async(c)=>{
  const data=await c.req.json();
const programme=await db.update(programmesTable).set({name:data?.name,description:data.description}).where(eq(programmesTable.id,data.id)).returning();
return c.json("UPdated")


})
const programmes = programmeRoutes.get('/', async (c) => {
  const auth = getAuth(c);
  if (!auth?.userId) {
    return c.json({ message: "Unverified" });
  }

  const user = await db.query.usersTable.findFirst({
    where: eq(usersTable.user_id, auth?.userId),
  });

  if (!user) {
    return c.json({ message: "Unable to find user" });
  }

  const data = await db.query.programmesTable.findMany({
    where: or(
      eq(programmesTable.user_id, user?.id),
      eq(programmesTable.assigned_to, user?.id)
    ),
    orderBy: [desc(programmesTable.id)],
    with: {
      programmeWorkout: {
        with: {
          programmeDetails: {
            with: {
              exercise: true,
            },
          },
        },
      },
    },
  });

  return c.json(data);
});




programmeRoutes.get('/details',async(c)=>{
    const data= Number(c.req.query('id'))
    const body=await db.query.programmesTable.findFirst({
        where:eq(programmesTable.id,data),
        with:{
          programmeWorkout:true
        }
           
        
    })
    return c.json(body)
    
})




export default programmeRoutes;
export type myProgrammeType=typeof programmes;