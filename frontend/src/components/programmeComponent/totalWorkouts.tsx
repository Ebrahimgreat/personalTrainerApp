import { Store } from "solid-js/store";
import { Signal,For } from "solid-js";
import Button from "../button";
type TotalWorkouts={
  items:{name:string}[];
  setWorkoutSignal:(index:number)=>void
  removeItem:(index:number)=>void
  selectedIndex:number,
  setSelectedindex:(item:number)=>void,
  workoutSignal:number,

 
}

function TotalWorkouts(props:TotalWorkouts){
    return(
    
    <div class="bg-white p-4 shadow-md">
           <h1 class="font-extrabold text-center">
                 Workouts
                 </h1>
        <ul class=" rounded list-decimal divide-y ">
            <For each={props.items}>
                {(item,key)=>(<li class={`group flex items-center justify-between px-4 py-2 cursor-pointer transition-colors rounded-md ${key()===props.workoutSignal?' text-black font-bold shadow-inner':'hover:bg-gray-100'}`} onclick={()=>props.setWorkoutSignal(key())}>
                        
                        <input value={item.name } class={'w-full px-4 py-2 mb-4  border rounded-lg focus:outline-none focus:ring-2 pink-500" placeholder="5 Day Split'} type="text">
              
                     </input>

              

          
                       <span>
                   <button onClick={()=>props.removeItem(key())}>
                   X
                        </button>
                        </span>
          
                    </li>

                )}
            </For>

        </ul>
        
  
    
        </div>

    )
    
}
export default TotalWorkouts;