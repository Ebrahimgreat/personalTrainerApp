import AboutExercise from "../../exercise/about";


import { For,Show } from "solid-js";
type Stats={
    created_at:string,
    exercise:{
    name:string,
    weight:number,
    reps:number,
    set:number
    }

}
type props={
    stats:Stats[]
   
}
function ClientStats(props:props){
    return(
        <div class="bg shadow-md flex flex-col">
       <h1 class="font-bold text-center">
        Stats Overview
        </h1>
     
        <Show when={props.stats}>
            
        
       <For each={props.stats}>

        {(item)=><div class="flex w-full bg-white shadow-md flex-row gap-x-4">
            <p class="text-sm">

      
            {item.created_at}
            </p>
            <p>
                 {item.exercise.name}
                </p>
                <p class="text-sm"> 
                   Set
                   </p>

                <p class="text-sm">
                {item.exercise.set}
                </p>
                Reps
                <p>
                {item.exercise.reps}
                </p>
                <p class="text-sm">

          
                Weight
                </p>
                {item.exercise.weight}
            </div>}
       </For>
       </Show>
            

        </div>
    )

}
export default ClientStats;