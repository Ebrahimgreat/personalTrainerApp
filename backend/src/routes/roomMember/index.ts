import { getAuth } from "@hono/clerk-auth";
import { Hono } from "hono";
import { db } from "../../db/db";
import { eq } from "drizzle-orm";
import { roomMembersTable, roomsTable, usersTable } from "../../db/schema";

const roomMembers=new Hono();
roomMembers.get('/',async(c)=>{
    const auth=getAuth(c);
    const user=await db.query.usersTable.findFirst({
        where:eq(usersTable.user_id,auth?.userId)
    })
    if(user?.parent_id==null)
    {
        
        const rooms=await db.query.roomsTable.findMany({
            where:eq(roomsTable.user_id,user.id)
        })
        let users=[]
       for(let i=0; i<rooms.length; i++)
       {
        console.log(rooms[i].id)
        users=await db.query.roomMembersTable.findMany({
            where:eq(roomMembersTable.id,rooms[i].id),
            with:{
                user:true
            }
        })

       }
       return c.json(users)
    }
   
   const roomMembers=await db.query.roomMembersTable.findMany({
    where:eq(roomMembersTable.user_id,user?.id),
    with:{
        user:true,
        room:{
            with:{
                user:true
            }
        }
    }
   })
   return c.json(roomMembers)

});

export default roomMembers;