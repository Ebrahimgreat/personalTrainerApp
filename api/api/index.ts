export const config = {
    runtime: 'edge'
  }
  
  import { handle } from 'hono/vercel'
  import app from '../src/index.js'
  
  export default handle(app)