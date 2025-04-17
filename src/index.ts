import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { usersTable } from './db/schema.js';
import { nutritionTable } from './db/schema.js';
import { weightTable } from './db/schema.js';
import { db } from './db/index.js';
import {basicAuth} from "hono/basic-auth";
import { sql,eq,and} from 'drizzle-orm';
import{cors} from 'hono/cors';
import{z} from '@hono/zod-openapi'
import { ParamsSchema,UserSchema } from './zod/schemas.js';
import weightRoutes from './routes/weight/index.js';
import nutritionRoutes from './routes/nutrition/index.js';
import dashboardRoutes from './routes/dashboard/dashboard.js';
import workoutRoutes from './routes/workout/index.js';
import customFoodRoute from './routes/customFood/food.js';
import exerciseRoutes from './routes/exercise/index.js';
import{cache} from "hono/cache";
import{clerkMiddleware,getAuth} from '@hono/clerk-auth';
import programmeRoutes from './routes/programme/index.js';
import userProgrammeRoute from './routes/userProgramme/index.js';
import clientRoutes from './routes/clients/index.js';
import{createNodeWebSocket} from '@hono/node-ws';
import latestActivitiesRoutes from './routes/latestActivities/index.js';
import {stream,streamText,streamSSE} from 'hono/streaming';

const app = new Hono()
const{injectWebSocket,upgradeWebSocket}=createNodeWebSocket({app})
const cacheStore=new Map();


app.use('*',clerkMiddleware())
app.get('/websocket',upgradeWebSocket((c)=>{
  return{

  onMessage:(event,ws)=>{
    console.log('Message')
  },
  onClose(){
    console.log('Connection Closed')
  },
 onOpen:()=>{
  console.log('Connection opne')
 }
}
}

))



app.get('/children',async(c)=>{
  const body=await db.query.usersTable.findFirst({
    with:{
      children:true
    }
  })
  return c.json(body)


})



app.use('/api/*',cors())
app.use('/api/*',clerkMiddleware())
app.use('/api2/*',
  cors({
    origin:'http://localhost:3000/',
    allowMethods:['POST','GET','PUT'],
    credentials: true,

  })
)
app.get('/hello',async(c)=>{
  return c.html(`<h1> Hello</h1>`)
  


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


app.route('/api/programme',programmeRoutes);
app.route('/api/customFoods',customFoodRoute)
app.route('/api/weight',weightRoutes)
app.route('/api/workout',workoutRoutes)
app.route('/api/userProgramme',userProgrammeRoute)
app.route('/api/activity',latestActivitiesRoutes)

app.route('/api/exercise',exerciseRoutes);
app.route('/api/nutrition',nutritionRoutes)
app.route('/api/dashboard',dashboardRoutes)
app.route('/api/clients',clientRoutes)



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




app.get('/api/dogs',(c)=>{
  return c.text("Hello Ebrahim")
})


const server=serve({
  fetch: app.fetch,
  port: 3001
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})

injectWebSocket(server)