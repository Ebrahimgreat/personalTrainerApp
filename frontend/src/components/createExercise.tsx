import { createSignal } from "solid-js";
import Button from "./button";
import{submitForm,exercise,setExercise} from "./CreateExerciseForm"


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
       
       <form onSubmit={handleSubmit} class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2">
              Exercise Name
            </label>
            <input value={exercise.name} onChange={(e)=>setExercise('name',e.currentTarget.value)} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 "/>
            <label class="block text-gray-700 text-sm font-bold mb-2">
              Exercise Type
            </label>
            <select value={exercise.type} onchange={(e)=>setExercise("type",e.currentTarget.value)}>
                <For each={options}>
                    {(item)=><option>
                        {item}
                        </option>}
                </For>

            </select>
          
      
      
        </div>
          
        <label class="block text-gray-700 text-sm font-bold mb-2">
                Description
            </label>
           <textarea class="shadow appearance-none w-full py-2 px-3">
            </textarea>
        

<Button>
    Submit
</Button>

       </form>
        </div>
    )
    
}
export default CreateExercise;