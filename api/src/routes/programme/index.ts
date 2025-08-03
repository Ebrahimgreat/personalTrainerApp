import { Hono } from "hono";
import { db } from "../../db/db";
import { and, desc, eq,or,count } from "drizzle-orm";
import { programmesTable, programmeWorkoutTable, userProgrammeTable, usersTable } from "../../db/schema";
import { getAuth } from "@hono/clerk-auth";
import { programmeDeletionSchema } from "../../zod/programmeSchema";
import { userProgramme } from "../../../drizzle/schema";
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
  const page=Number(c.req.query('page'))
  
  const offset=(page-1)*5
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

  const totalPages=await db.select({count:count()}).from(programmesTable).where(eq(programmesTable.user_id,user.id));

  const data = await db.query.programmesTable.findMany({
    limit:3,
    offset:offset,
    where: or(
      eq(programmesTable.user_id, user?.id),
      eq(programmesTable.assigned_to, user?.id),
      
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
type ProgrammeData={
  totalPages:number,
  programme:[]
}
const programmeData:ProgrammeData=({
  totalPages: Math.ceil(totalPages[0].count / 3),
  programme:data
})

  return c.json(programmeData);
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



programmeRoutes.get('/myProgramme',async(c)=>{
  const auth=getAuth(c);
  if(!auth.userId){
    return c.json({message:'User Unverfied'})
  }
  const userToFind=await db.query.usersTable.findFirst({
    where:eq(usersTable.user_id,auth.userId)
  });
  if(!userToFind){
    return c.json({message:'User To Exist'})
  }
  const userProgramme=await db.query.userProgrammeTable.findFirst({
    where:and(eq(userProgrammeTable.user_id,userToFind.id),
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
  return c.json(userProgramme)

 
})


export default programmeRoutes;
export type myProgrammeType=typeof programmes;