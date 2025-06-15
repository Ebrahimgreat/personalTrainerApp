

type Exercise={
    name:string,
    id:number

}

type WorkoutDetails={
    id:number,
    reps:number,
    sets:number,
    weight:number,
    rir:number
    exercise:Exercise,

    


}

type Workout={
    name:string,
    created_at:string,
    workoutDetail:WorkoutDetails
}
type myWorkout={
    workout:Workout[]
    date:string,
    setDate:(item:string)=>void
}


import { For,Show } from "solid-js"

function WorkoutHistory(props:myWorkout)
{ return(
    <div class="bg-white shadow-md p-4 flex flex-col">
        <h1 class="font-bold text-lg mb-4">
            Workout History
        </h1>
        <input onchange={(e)=>props.setDate(e.currentTarget.value)} value={props.date} type="date" class="shadow-appearance-none border w-full border-gray-300 rounded-xl focus:outline-none focus:ring-2 py-2 px-3 mb-2">
        </input>
        <Show when={props.workout.length==0}>
            <h2 class="font-bold text-center">
        No Workout Found 
        </h2>
        </Show>
        <For each={props.workout}>
            {(item)=><div class="border p-2 my-2 text-sm overflow-x-auto">
                
                <h1 class="text-center font-bold">

        
                {new Date(item.created_at).toDateString()}
                </h1>
                <p class="text-center text-gray-600">
           
                {item.programme.name===''?` No Programme Followed: ${item.name}`: ` Programme Followed: ${item.programme?.name}`}
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

     
                    <For each={item.workout}>
                        {(value)=><tr>

                                    <td class="px-4 py-2">
                                       {value.exercise.name}
                                       </td>
                              
                            
                           
                
                          
              
                            <td class="px-4 py-2">{value.sets}</td>
                           

              
                                <td class="px-4 py-2">
                                 {value.reps}
                                 </td>

                            
                            
                                   <td class="px-4 py-2">
                                   {value.weight? value.weight: 'NA'}
                                   </td>
                          
                          
                         
                                    <td>
                                      {value.rir}
                                      </td>
                    
                         

                            </tr>}
                    </For>
                    
                    </tbody>
                    </table>
                   
        
                
                </div>}
                
        </For>
        

    </div>

)

}
export default WorkoutHistory;