import { For,Show } from "solid-js";
import Modal from "../modal";
import { Exercise } from "../../../../backend/src/db/schema";

type props={
   equipmentSelected:string,
   equipment:string[],
   typeSelected:string,
   types:string[]
   searchExercise:string,
   myExercises:[],
   selectAction:number
   selectExercise:string,
   showProgramme?:string,

 
   setTypeSelected:(item:string)=>void,
   setEquipment:(item:string)=>void,
   setSearchSelected:(item:string)=>void,
   updatingExercise:(item:Exercise)=>void,

}
function ExerciseLibrary(props:props){
    
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


<Show when={props.showProgramme==='No Programme'}>


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
</Show>
<div class="h-[400px] overflow-auto">


<ul class="">





<For each={props.myExercises}>
{(item,count)=> <li class="cursor-pointer px-4 py-2 rounded-lg hover:bg-indigo-100 text-grey-600" onClick={()=>props.updatingExercise(item)}>



<Show when={props.myExercises}>
  
 {item.name}
 </Show>

 <span class="fonst-extralight block sm">
    {item.target}
 </span>

</li>



}
</For>


</ul>
</div>


</Show>

    </div>)

}
export default ExerciseLibrary;