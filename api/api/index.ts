export const config = {
    runtime: 'edge'
  }
  
  import { handle } from 'hono/vercel'
  import {app} from '../src/index'
  
  export default handle(app)