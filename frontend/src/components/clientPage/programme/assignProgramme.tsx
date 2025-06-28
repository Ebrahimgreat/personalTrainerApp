import { createSignal, For } from "solid-js"


import Button from "../../ui/button"
import {AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../../ui/alert-dialog"
type ExerciseDetailed={
    id:number,
    name:string,
    equipment:string,
    target:string
}
export type programme={
    name:string,
    id:number,
    description:string,

    workout:programmeWorkout
}


export type programmeDetails={
    id:number,
    repRange:string,
    sets:string,
    exercise:ExerciseDetailed

}
export type programmeWorkout={
    id:number,
    name:string,
    details:programmeDetails


}
type props={
    programme:programme[],
   programme_id:number,
   updateProgramme:(item:number)=>void
}




function AssignProgramme(props:props){
    return(<div class="h-full w-full overflow-y-auto">

     <For each={props.programme}>
        {(item)=><div class="px-4 py-3 space-y-6 mt-3 border">
            <div class="flex flex-row justify-between">
                 
           
            <h1 class="font-bold">
              {item.name}
              </h1>
              <p class="underline">

                {item.id===props.programme_id? "Already Assigned": ""}
              </p>
             
              <Button onclick={()=>props.updateProgramme(item.id)}   disabled={item.id==props.programme_id} variant="outline">
                Assign
              </Button>
              </div>
              
              <p class="text-gray-600">
                {item.description}
              </p>
        
               <For each={item.workout}>
                {(value)=><div class="mt-4 border p-4">
                    <p class="text-center">
                        {value.name}
                        </p>
                        <For each={value.details}>
                            {(detail)=><div class="flex flex-row gap-x-3">
                              Rep Range
                                   <p> {detail.repRange}
                                </p>
                                Sets
                                <p>
                                    {detail.sets}
                                </p>
                                <p>
                                 {detail.exercise.name}
                                 </p>
                                </div>}
                        </For>

                    
              </div>
              
}
              </For>

            </div>}
            </For>
    </div>)

}
export default AssignProgramme;