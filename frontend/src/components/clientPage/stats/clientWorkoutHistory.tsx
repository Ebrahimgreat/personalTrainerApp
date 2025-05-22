
type myWorkout={
    workout:Workout
}




type props={
    equipmentSelected:string,
    equipment:string[],
    types:string[],
    typeSelected:string,
    selectAction:number,
    selectedExercise:string,
    setTypeSelected:(item:string)=>void,
    setEquipment:(item:string)=>void,
    myExercises:string[],
    workout:myWorkout,
    setSelectedExercise:(item:string)=>void,
    updatingExercise:(item:object)=>void

}






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








import { Show,For } from "solid-js"

function ClientWorkoutHistory(props:props)
{
 
    return(<div class="h-full overflow-y-auto bg-white shadow-xl">
    <div>
       <Show when={props.selectAction==-1}>
                   
            
                   Please Add Workout to select Exercises
                   <div class="flex items-center justify-center">
       
              
                   <img  class="rounded-full border h-16 w-16  object-cover bg-black" src='/src/assets/icons/exerciseSvg.svg'>
                   </img>
                   </div>
          
               </Show>
               </div>
               <Show when={props.selectAction!==-1}>
       
       
       <div class="border-b px-6 py-3">
       
       
               <div class="flex flex-row justify-around mr-10 ml-10">
       
               <select value={props.equipmentSelected} onchange={(e)=>props.setEquipment(e.currentTarget.value)} class="shadow-appearance-none border border-gray-300 rounded-xl focus:outline-none focus:ring-2 py-2 px-3 mb-2">
             
               <option selected>
                   Equipment
                </option>
                <For each={props.equipment}>
                   {(item)=><option>
                       {item}
                       </option>}
                       
                </For>
                
                <option>
                   No option
                </option>
               </select>
               <select class="shadow-appearance-none border border-gray-300 rounded-xl focus:outline-none focus:ring-2  px-3 mb-2"   onchange={(e)=>props.setTypeSelected(e.currentTarget.value)} value={props.typeSelected} onChange={(e)=>props.setTypeSelected(e.currentTarget.value)}>
               <option>Type</option>
                   <For each={props.types}>
                 
                       {(item)=><option>
                           {item}
                           </option>}
                   </For>
                   <option>
                       No option
                   </option>
               </select>
               
       </div>
       
       
       <input disabled={props.selectAction==-1} value={props.searchExercise} onChange={(e)=>props.setSearchSelected(e.currentTarget.value)} class=" disabled:cursor-not-allowed  shadow appearance-none border w-full border-gray-300 rounded-xl focus:outline-none focus:ring-2 py-2 px-3 mb-2 " type="text" placeholder="search Exercise"/>
       </div>
       <ul class="">
       
           
       <For each={props.workout}>
       {(item,count)=><div>
          <For each={item.workout}>
          {(value)=><div>
            <p onclick={()=>props.updatingExercise(value)} class="cursor-pointer">{value.exercise.name}</p>
            </div>
            }
          </For>
       
        <span class="fonst-extralight block sm">
           {item.target}
        </span>
       

       
       
       </div>
       }

       </For>
       
       
       </ul>
       
       
       </Show>
       

    </div>)

}
export default ClientWorkoutHistory;