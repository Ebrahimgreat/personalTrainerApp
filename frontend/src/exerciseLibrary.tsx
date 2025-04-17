import { createResource, createSignal, For,Show } from "solid-js";
import Button from "./components/button";
import { createStore } from "solid-js/store";
import CreateExercise from "./components/createExercise";
import { useNavigate } from "@solidjs/router";
import Modal from "./components/modal";
type myexercise={
    name:string,
    type:string,
    instructions:string

}
function exerciseLibrary()
{
    const navigate=useNavigate();
    
    const filters=['Chest','Triceps','Bicep','Quads','Hamstrings'];
   
    const fetchData=async()=>{
        const response=await fetch('http://localhost:3001/api/exercise/all',{
            method:'GET'
        })
        return response.json();
    }
  

    const[myExercises,setMyExercises]=createResource(fetchData);
    const [myExerciseSelected,setMyExerciseSelected]=createStore<myexercise>({
        name:'',
        type:'',
        instructions:''

    })
      
   const updateExercise=(item:object)=>{
    console.log('hello')
    setMyExerciseSelected('instructions',item.instructions),
    setMyExerciseSelected('name',item.name),
    setMyExerciseSelected('type',item.type)
   

   }
    
    const[exercise,setExerciseSelected]=createSignal('')


    return(
        <div class="flex flex-col">
           
           <div class="flex flex-row justify-between">

         
            <p class="font-bold">
                Exercise Library
        
         
            </p>
            <Modal buttonText="Custom Exercise">
                <CreateExercise>

                </CreateExercise>

            </Modal>
            
            </div>
            <div class="flex flex-row justify-around gap-x-3">
            <div class="bg-white min-w-[300px] max-w-[300px] shadow-lg mt-4 max-h-[300px] min-h-[300px] overflow-y-scroll px-5 py-3">
         
         
          <Show when={myExercises()}>
          <input class="shadow appearance-none border border-gray-300 rounded-xl focus:outline-none focus:ring-2 py-2 px-3 mb-2 " type="text" placeholder="search Exercise"/>

                <ol class="list-decimal">
          <For each={myExercises()}>
            {(item,count)=><div class="flex flex-col w-full mb-2 text-center">
               
              

                <li class="w-32 cursor-pointer hover:bg-amber-50" onClick={()=>updateExercise(item)}>
               
                  
                 {item.name}

                </li>
            
                </div>

                }
            </For>
            </ol>
     
          </Show>
          </div>
         <div class="bg-white shadow w-full">
           <div  class="flex flex-col items-center justify-center">
            
           <h2 class="font-bold">
          {myExerciseSelected.name}
          </h2>
          <h3 class="line-clamp-6">
       
            {myExerciseSelected.instructions}

          </h3>
            </div>
            
            

         </div>
       
        </div>

        </div>

    )
    
}
export default exerciseLibrary;