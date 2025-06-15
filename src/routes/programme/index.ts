import { Hono } from "hono";
import { db } from "../../db";
import { eq,or } from "drizzle-orm";
import { programmesTable, usersTable } from "../../db/schema";
import { getAuth } from "@hono/clerk-auth";
import { Programme } from "../../types/userProgramme/programme";
import userProgrammeRoute from "../userProgramme";
const programmeRoutes=new Hono();


programmeRoutes.post('/store',async(c)=>{
  const body=await c.req.json();
  return c.json(body)
})
programmeRoutes.get('/',async(c)=>{
  const auth=getAuth(c);
  const user=await db.query.usersTable.findFirst({
    where:eq(usersTable.user_id,auth?.userId)
  })



    const data=await db.query.programmesTable.findMany({
      where:or(eq(programmesTable.user_id,user?.id),eq(programmesTable.assigned_to,user?.id)),
      
      
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
    })

    
  const programme:Programme=data.map((item)=>({
    id:item.id,
   name:item.name,
   description:item.description,
   
  
   workout:item.programmeWorkout?.map((value)=>({
    id:value.id,
    name:value.name,
    details:value.programmeDetails.map((detail)=>({
      id:detail.id,
      repRange:detail.repRange,
      sets:detail.sets,
      exercise:{
        id:detail.exercise.id,
        name:detail.exercise.name,
        equipment:detail.exercise.equipment
      }
    }))

  
  }))
  }))

return c.json(programme)
})
programmeRoutes.get('/client',async(c)=>{
    const query=c.req.query('name')
  const data=await db.query.usersTable.findMany({
    where:eq(usersTable.name,query)
  })
 if(data.length==0){
    return c.json('0')
 }



return c.json(data)
})


programmeRoutes.get('/details',async(c)=>{
    const data= c.req.query('id')
    const body=await db.query.programmesTable.findMany({
        where:eq(programmesTable.id,data),
        with:{
            
            programmeWorkout:{
                with:{
                    programmeDetails:{
                      with:{
                        exercise:true
                      }
                    }
                }
            },
            
            
            userProgramme:{
                with:{
                    user:true,
                   
                }
            }
        }

        
    })
    return c.json(body)
    
})
export default programmeRoutes;