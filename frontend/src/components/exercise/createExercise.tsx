import { createSignal,For } from "solid-js";
import Button from "../button";
import{submitForm,exercise,setExercise} from "../CreateExerciseForm"
const exerciseType:string[]=['chest','biceps','triceps','rear delts']


function CreateExercise()
{
    function handleSubmit(event:Event)
    {
        event.preventDefault();
        submitForm();
    }
    const options:string[]=['Chest','arms','Bicep','Tricep','Legs'];

    
    return(
        <div>
       
       <form onSubmit={handleSubmit} class="  rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2">
              Exercise Name
            </label>
            <input value={exercise.name} onChange={(e)=>setExercise('name',e.currentTarget.value)}  class="shadow appearance-none border border-gray-300 w-full rounded-xl focus:outline-none focus:ring-2 py-2 px-3 mb-2 "/>
          

            <label class="block text-gray-700 text-sm font-bold mb-2">
              Equipment
            </label>
            <select  class="w-full shadow appearance-none border border-gray-300 rounded-xl focus:outline-none focus:ring-2 py-2 px-3 mb-2 ">
               <For each={exerciseType}>
                {(item)=><option>
                    {item}
                    </option>}
               </For>
                
            </select>
            <label class="block text-gray-700 text-sm font-bold mb-2">
              Type
            </label>
           

            <select value={exercise.type} onchange={(e)=>setExercise("type",e.currentTarget.value)}  class=" w-full shadow appearance-none border border-gray-300 rounded-xl focus:outline-none focus:ring-2 py-2 px-3 mb-2">
                <For each={options}>
                    {(item)=><option>
                        {item}
                        </option>}
                </For>

            </select>
          
      
      
        </div>
          
        <label class="block text-gray-700 text-sm font-bold mb-2">
               Instructions
            </label>
           <textarea class="w-full shadow appearance-none border border-gray-300 rounded-xl focus:outline-none focus:ring-2 py-2 px-3 mb-2 ">
            </textarea>
        

<Button>
    Submit
</Button>

       </form>
        </div>
    )
    
}
export default CreateExercise;