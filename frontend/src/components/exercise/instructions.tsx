import { For,Show } from "solid-js";

type instructions={
    instruction:[]
}

function ExerciseInstructions(props:instructions){
    return(<div class="bg-white  h-full overflow-y-auto  shadow-xl">

        
       <h1 class="font-bold">
      Instructions
      </h1>

      <ul class=" ml-5 space-y-2">
        <For each={props.instruction}>
            {(item,key)=>
            <li class="">
               <span class="bg-gray-400 text-white  border-gray-800 rounded-full shadow flex items-center justify-center mr-5 w-8 h-h-8 font-bold">
         {key()+1} 
         </span> 
         <span class="text-gray-700 text-sm">

    
         {item}
         </span>

            </li>

            }

            
        </For>

 
      
        </ul>

    </div>)
    

}
export default ExerciseInstructions;
