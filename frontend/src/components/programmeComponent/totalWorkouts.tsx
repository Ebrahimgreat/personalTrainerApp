import { Store } from "solid-js/store";
import { Signal,For } from "solid-js";
import Button from "../button";
type TotalWorkouts={
  items:{name:string}[];
  setWorkoutSignal:(index:number)=>void
  removeItem:(index:number)=>void
 
}

function TotalWorkouts(props:TotalWorkouts){
    return(
    
    <div class="bg-white p-4 shadow-md">
           <h1 class="font-extrabold text-center">
                 Workouts
                 </h1>
        <ul class="bg-gray-100 rounded w-48 divide-opacity-25">
            <For each={props.items}>
                {(item,key)=>(<div>
                    <li onclick={()=>props.setWorkoutSignal(key())}>
                        {item.name}

                    </li>
                    <li>
                       <Button onClick={()=>props.removeItem(key())}>
                        Remove
                        </Button>
                    </li>
                    </div>

                )}
            </For>

        </ul>
        
  
    
        </div>

    )
    
}
export default TotalWorkouts;