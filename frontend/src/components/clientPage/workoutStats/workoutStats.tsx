



import { createSign } from "crypto"
import { For,createSignal } from "solid-js"


type bodyPart={
    equipmentName:string,
    stats:bodyPartStats
  
  }
 
  type bodyPartStats={
  
    totalSets:number,
    totalVolume:number,
  }
  type props={
    stats:bodyPart[],
    startDate:string,
    endDate:string,
    setStartDate:(item:string)=>void
    backButtonPressed:()=>void,
    NextButtonPressed:()=>void
  }








function WorkoutStats(props:props)
{

     
    function addDays(date:Date,days:number){
        const newDate=new Date(date.getTime()+days*24*60*60*1000)
        return new Date(newDate).toDateString();

     }

    const [startDate,setStartDate]=createSignal<string>(new Date().toDateString())
    const [endDate,setEndDate]=createSignal(addDays(new Date(startDate()),7))



    return (<div class="bg-gray-50 shadow-lg rounded-2xl p-6 max-w-md mx-auto">
<div class="flex row justify-between">
  <button class="border" onclick={()=>props.backButtonPressed()}>
    Back
  </button>
  <button class="border" onclick={()=>props.NextButtonPressed()}>
    Next
  </button>
</div>
        <h1 class="font-bold text-center">
         Weekly Stats 
     <span class="text-gray-900">
    
    {props.startDate}---{props.endDate}
    </span>

        </h1>
    
  
     
       
    <For each={props.stats}>
        {(item)=><div class="flex flex-row justify-between  px-3 py-3 gap-x-4">
          <span class="font-bold">
      </span> {item?.equipmentName ?? ""}
<p>
            <span>
                 Set: 
              
                   <span class="font-bold">
                {item.stats?.totalSets ?? 0}
             </span>
            </span>
            </p>
            <span>
                 Volume:
                {item.stats?.totalVolume ?? 0}
            </span>
            </div>}
        </For>


    </div>)
    
}
export default WorkoutStats;