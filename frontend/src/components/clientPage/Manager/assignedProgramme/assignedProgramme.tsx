type Programme={
    id:number,
    name:string,
    description:string,
    programmeWorkout:Workout,

}

type Workout={
    id:number,
    name:string,
    programme_id:number,
    programmeDetails:details[]

}
type Exercise={
    id:number,
    name:string
}
type details={
    id:number,
    repRange:string,
    sets:number
    exercise:Exercise
}

type ExerciseDetailed={
    id:number,
    name:string,
    equipment:string,
    target:string
}


export type userProgramme={
    id:number,
    user_id:number,
    status:string,
    programme:Programme
    
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
    programme:userProgramme
    allProgramme:Programme,
    programme_id:number,
    updateProgramme:(item:number)=>void
    
}
import { Button } from "../../../../components/ui/button"
import {TextField,TextFieldRoot} from "../../../ui/textfield"
import { createSignal, For,Show } from "solid-js"
import { Dialog,DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../../../ui/dialog"
import AssignProgramme from "../../programme/assignProgramme"
import { AlertDialogContent, AlertDialogHeader, AlertDialogTitle } from "../../../ui/alert-dialog"
function AssignedProgramme(props:props)
{

    const[dialogOpen,setDialogOpen]=createSignal<boolean>(false)

    return(<div class="bg-white h-full shadow-md p-8 w-full mx-auto flex flex-col overflow-y-auto">
        <div class="flex flex-row justify-between">



<Dialog open={dialogOpen()} onOpenChange={setDialogOpen}>
    <DialogTrigger>
        <Button>
            Modify
        </Button>
        <DialogContent class="bg-white w-full h-full max-w-none">
                        <DialogHeader>
              <DialogTitle>
                Assign New Programme
                </DialogTitle>
            </DialogHeader>
            <AssignProgramme updateProgramme={(item)=>props.updateProgramme(item)} programme_id={props.programme_id} programme={props.allProgramme}>

            </AssignProgramme>
            
<DialogFooter>
    <Button onclick={()=>setDialogOpen(false)}>
        Cancel
    </Button>
   
</DialogFooter>
        </DialogContent>

    </DialogTrigger>
</Dialog>
        <h1 class="font-bold text-lg">
            Programmes Enrolled

        </h1>
        
       
   
</div>
      

<Show when={!props.programme}>
    No Programme Enrolled
</Show>

<Show when={props.programme && props.programme.id}>

      <div class="overflow-y-auto">
       <h2 class="font-semibold">
        
      {props.programme.programme.name}
      </h2>


      <span class="font-bold">
        {props.programme.status}
      </span>
     

         
            

                <For each={props.programme.programme.programmeWorkout}>
                    {(workout)=><div class="mt-2 space-y-1 pl-4">
                        <h4 class="text-gray-600 font-medium">
                            {workout.name}
                        </h4>
                        

                        <For each={workout.programmeDetails}>
                            {(detail)=><div class="flex flex-row gap-x-4 text-sm">
                                
                                <span class="font-semibold">
                                    {detail.exercise.name}-

                                </span>
                                <span>
                                    Sets: {detail.sets}
                                </span>
                                <span>
                                    Rep Range: {detail.repRange}
                                </span>
                                </div>

}
</For>

         
      
                
                
                </div>}
                </For>
       
            <div class="border-b">

   
            <p class="text-center">
               
                </p>
                </div>
                </div>
   
        </Show>
    </div>)

}
export default AssignedProgramme;