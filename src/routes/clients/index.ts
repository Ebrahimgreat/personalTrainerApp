import { Hono } from "hono";
import { db } from "../../db";
import { eq } from "drizzle-orm";
import { usersTable } from "../../db/schema";
import { clerkMiddleware,getAuth } from "@hono/clerk-auth";
import { createClerkClient } from "@clerk/backend";


const clientRoutes=new Hono();




clientRoutes.get('/',async(c)=>{
    const auth=getAuth(c)
    if(!auth?.userId){
        return c.json('failed')
    }
    const data=await db.query.usersTable.findMany({
        where:eq(usersTable.user_id,auth?.userId),
        with:{
          children:{
            with:{
               userProgramme:{
                with:{
                    programme:true
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

clientRoutes.get('/getClient',async(c)=>{
  const data=c.req.query('id')
if(!data){
  return c.json('not exist')
}
const response=await db.query.usersTable.findMany({
  where:eq(usersTable.id,data),
  with:{
    weight:true,
    workout:true
  }

})
return c.json(response)

})

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