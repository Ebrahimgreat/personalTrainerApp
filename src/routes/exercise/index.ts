import { Hono } from "hono";
import { exerciseSchema } from "../../zod/exerciseSchema.js";
import { db } from "../../db/index.js";
import { like } from "drizzle-orm";
import { customExerciseTable, exerciseTable } from "../../db/schema.js";
import { eq,and} from "drizzle-orm";
import { exercise } from "../../../frontend/src/components/CreateExerciseForm.js";
import { Exercise, ExerciseDetailed } from "../../types/Exercise/exercise.js";
const exerciseRoutes=new Hono();


exerciseRoutes.get('/all',async(c)=>{
  
  const exerciseName:string= c.req.query('exerciseName') || '';
  const type:string= c.req.query('type') || '';
  const equipment:string=c.req.query('equipment')|| '';
  console.log(exerciseName)
  const filters=[];
  const filtersCustomExercise=[];

  if(exerciseName!='')
  {
    console.log('yes')
   filters.push(like(exerciseTable.name,`%${exerciseName}%`));
   filtersCustomExercise.push(like(customExerciseTable.name,`%${customExerciseTable.name}%`));
   
  }
  if(equipment!='' && equipment!='Equipment')
  {
    filters.push(eq(exerciseTable.equipment,equipment))
    filtersCustomExercise.push(eq(customExerciseTable.equipment,equipment))
  }
  
  if(type!='' && type!='Type'){
    console.log('yes')
    filters.push(eq(exerciseTable.type,type))
    filtersCustomExercise.push(eq(customExerciseTable.type,type))
  }


  const body1=await db.select().from(customExerciseTable).where(filters.length? and(...filtersCustomExercise):undefined)
  const body2=body1.flatMap((item)=>({
    id:item.id,
    name:item.name,
    equipment:item.equipment,
    target:item.type,
    instructions:item.instructions?.split('.')

  }))


  const body=await db.select().from(exerciseTable).where(filters.length?  and (...filters): undefined);
 const newBody:ExerciseDetailed[]=body.flatMap((item)=>({
  id:item?.id?? '',
  name:item?.name ?? '',
  equipment:item?.name ?? '',
  instructions:item.instructions?.split('.')||[],
  photo:item?.photo?? '',
  target:item?.type?? ''

 }))
let newArray=newBody.concat(body);
return c.json(newArray);



  

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
