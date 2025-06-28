import { Hono } from 'hono';
import { usersTable } from './db/schema.js';

import { db } from './db/db.js';
import {basicAuth} from "hono/basic-auth";
import { sql,eq,and} from 'drizzle-orm';
import{cors} from 'hono/cors';
import { ParamsSchema,UserSchema } from './zod/schemas.js';
import nutritionRoutes from './routes/nutrition/index.js';
import dashboardRoutes from './routes/dashboard/dashboard.js';


import exerciseRoutes from './routes/exercise/index.js';
import{cache} from "hono/cache";
import{clerkMiddleware,getAuth} from '@hono/clerk-auth';
import programmeRoutes from './routes/programme/index.js';

import clientRoutes from './routes/clients/index.js';
import latestActivitiesRoutes from './routes/latestActivities/index.js';
import {stream,streamText,streamSSE} from 'hono/streaming';
import type { ServerWebSocket } from 'bun';
import {createBunWebSocket} from 'hono/bun';
import messageRoute from './routes/messages/index.js';
import roomMembers from './routes/roomMember/index.js';
const app = new Hono()
const{upgradeWebSocket,websocket}=createBunWebSocket<ServerWebSocket>()
const cacheStore=new Map();

import { createRoute } from '@hono/zod-openapi';
import measurementRoute from './routes/measurements/index.js';
import { createClerkClient, EmailAddress } from '@clerk/backend';
import {clientSchema} from './zod/clientSchema.js';
import templateRoutes from './routes/template/index.js';
import {zValidator} from '@hono/zod-validator';
import {z} from '@hono/zod-openapi';

app.get('/',async(c)=>{
  return c.json("Hello Ebrahim");
})

app.use('/api/trpc/*',)

app.use('*',
  clerkMiddleware())


  
const myRoute=app.get('/api/funny',
(c)=>{
  return c.json({
    name:'Ebrahim',
    email:'ebrahimgreat@gmail.com',
    age:23
  });
});





let users=new Map<number,{socket:WebSocket; roomId:number,reciever:number}>();
let messages=new Map<number,string>();




app.get('/ws',upgradeWebSocket((_)=>{

  return{

  
    onClose:(_,ws)=>{
     

 
    },
   onOpen(_,ws){
    //Web Socket opened
    console.log('web socket opened')
    
 },



   
   onMessage(event,ws){
    console.log("I am running")
   let timer:number=0;

   const data=JSON.parse(event.data);
   if(data.type==='left'){
    console.log("The User has Been Deleted")
    users.delete(data.sender)
  
   }


    if(users.size>=2)
    {
      const currentTime=new Date().toLocaleTimeString();
      users.forEach((item)=>{
        if(item.reciever===data.reciever)
        {
          
         
         item.socket.send(event.data)
        }
      })
      console.log(data)
    }
  
    

    /*if(users.size>=2)
    {
      console.log('SIZE is 2')
      console.log(event.data)
     const data=(JSON.parse(event.data))
    users.forEach((item,key)=>{
      console.log(key)
      console.log(data.sender)
      if(key==data.sender)
      {
        console.log("YES SIR SENDING DATA")
        item.send(event.data)
      }
    
    })
     
      return;
    }
      */
   

  
    
    
users.set(data.sender,{
 socket:ws,
  roomId:data.roomNumber,
  reciever:data.sender
})

console.log("The users size is",users.size);


 
  },
    onError:(event,ws)=>{
      console.log('error')
      ws.send('error e')
    }
  }

  
}))





app.use('/api/*',cors())
app.use('/api/*',clerkMiddleware())
app.use('/api2/*',
  cors({
    origin:['http://localhost:3000','http://localhost:8081'],
    allowMethods:['POST','GET','PUT'],
    credentials: true,

  })
)
app.get('/hello',async(c)=>{
 return c.json({message:'HLI'})
  


})
app.post('/api/email-check',async(c)=>{
  const body=await c.req.json();

  const user=await db.query.usersTable.findFirst({
    where:eq(usersTable.email,body.email)
  });
  if(!user){
    return c.json("Not Exist");
  }
 return c.json("User Exists")


})


app.get('/api/roles',async(c)=>{

 
  const auth=getAuth(c);
  if(!auth){
    return c.json('not found');
  }
  return c.json(auth.sessionClaims?.metadata)
})

app.post('/api/login',async(c)=>{
const body=await c.req.json();
console.log(body.email)
return c.json(body)
})
app.get('/api/search',async(c)=>{
const clientID = '34c4fd1f3b5248e1b16c31de3f119379'
const clientSecret = '87b3be69a28a49f8abe9cedb60659d5a'

var options = {
   method: 'POST',
   url: 'https://oauth.fatsecret.com/connect/token',
  
   auth : {
      user : clientID,
      password : clientSecret
   },
   headers: { 'content-type': 'application/x-www-form-urlencoded'},
   form: {
      'grant_type': 'client_credentials',
      'scope' : 'basic'
   },
   json: true
};

return c.json(options)

 

})



const route=app.route('/api/programme',programmeRoutes);

app.route('/api/activity',latestActivitiesRoutes)
app.route('/api/roomMembers',roomMembers);
app.route('/api/measurements',measurementRoute)

app.route('/api/exercise',exerciseRoutes);
app.route('/api/nutrition',nutritionRoutes)
app.route('/api/dashboard',dashboardRoutes)
app.route('/api/clients',clientRoutes)
app.route('/api/template',templateRoutes);
app.route('/api/messages',messageRoute);



app.post('/api/client/store',async(c)=>{
  const auth=getAuth(c);
  


  if(!auth?.userId)
  {
    return c.json("Validation Has been Failed")
  }


  const userFind=await db.query.usersTable.findFirst({
    where:eq(usersTable.user_id,auth.userId)
  })



  const query=await c.req.json();

   const data=await db.insert(usersTable).values({
    name:query.name,
    age:query.age,
    parent_id:userFind?.id
   }).returning()


 
 return c.json({message:data})

  
})

app.get('/api/',(c)=>{
  return c.json('Hello Ebrahim, Welcome. You can Track Your Clients Here. 1.api/clients(To see Clients) ');
})

app.get('/api/stream',(c)=>{
  return stream(c,async(stream)=>{
    c.header('Content-Type','text/event-stream')
    
  

    stream.onAbort(()=>{
      console.log('aborted')
    })
    let count=0;
    const interval=setInterval(async()=>{
      console.log(count)
      await stream.write(`data: ${JSON.stringify(count++)} `)
    },1000)
  
    setTimeout(async()=>{
      clearInterval(interval)
      await stream.close()
    },10000)
  })

})



app.post('/api/login',async(c)=>{
  const body=await c.req.json()
  return c.json(body);



  
  
})



app.get('/api',async(c)=>{
const data=await db.select().from(usersTable);
return c.json(data)
  

}
 

)




app.get('/api/me',async(c)=>{
  const auth=getAuth(c);
  if(!auth?.userId){
    return c.json('User does not exisst');
  }
  const user=await db.query.usersTable.findFirst({
    where:eq(usersTable.user_id,auth.userId)
  })
  return c.json(user)

})


export default{
  port:3001,
  fetch:app.fetch,
  websocket,
  
}
console.log('Bun running')

export type AppType=typeof myRoute;
