import type { WorkoutHistoryType } from "../../../../types/workoutHistory"
import Button from "../../../ui/button"

type props={
    workout:WorkoutHistoryType[],
    incrementPage:()=>void,
    decrementPage:()=>void,
}


import { For,Show } from "solid-js"

function WorkoutHistory(props:props)
{ return(
    <div class="bg-white shadow-md p-4 flex flex-col">
        <h1 class="font-bold text-lg mb-4">
            Workout History
            
        </h1>
   
 
       
     
        <Show when={props.workout.length==0}>
            <h2 class="font-bold text-center">
        No Workout Found 
        </h2>
        </Show>


<Show when={props.workout.length>0}>


        <For each={props.workout}>
           
            {(item)=><div class="border p-2 my-2 text-sm overflow-x-auto">

               <Button>
                Delete
                </Button>
               
                <h1 class="text-center font-bold">

   
                {new Date(item.created_at).toDateString()}
                </h1>
                <p class="text-center text-gray-600">
           
                {/* {item.programme.name===''?` No Programme Followed: ${item.name}`: ` Programme Followed: ${item.programme?.name}`} */}
                </p>
                <table class="w-full">
                    <thead>
                        <tr>
                            <th>
                                Exercise
                            </th>
                            <th>
                                Set
                            </th>
                            <th>
                                Weight
                            </th>
                            <th>
                                Reps
                            </th>
                            <th>
                                RIR
                            </th>
                        </tr>
                    </thead>

             <tbody>

     
                    <For each={item.workoutDetail}>
                        {(value)=><tr>
                            {value.exercise.name}

                                    <td class="px-4 py-2">
                                       {value.exercise.name}
                                       </td>
                              
                            
                           
                
                          
              
                            <td class="px-4 py-2">{value.set}</td>
                           

              
                                <td class="px-4 py-2">
                                 {value.reps}
                                 </td>

                            
                            
                                   <td class="px-4 py-2">
                                   {value.weight? value.weight: 'NA'}
                                   </td>
                          
                          
                         
                                    
                         

                            </tr>}
                    </For>
                    
                    </tbody>
                    </table>
                   
        
                
                </div>}
                
        </For>
        <div class="flex flex-row justify-between">
            <Button onclick={()=>props.decrementPage()}>
                Previous
            </Button>
            <Button onclick={()=>props.incrementPage()}>
                Next
            </Button>
            

        </div>
       
        </Show>

    </div>

)

}
export default WorkoutHistory;