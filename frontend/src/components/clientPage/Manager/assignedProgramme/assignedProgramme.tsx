type Programme={
    id:number,
    status:string,
    name:string,
    description:string,
    workout:Workout,

}
type Workout={
    id:number,
    name:string,
    details:details[]

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

export type programme={
    name:string,
    id:number,
    userProgramme:userProgramme,
    description:string,
    workout:programmeWorkout
}

export type userProgramme={
    id:number,
    name:string
    
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
    programme:Programme,
    allProgramme:programme,
    programme_id:number
    
}
import { Dialog } from "@kobalte/core/dialog"
import { Button } from "../../../../components/ui/button"
import {TextField,TextFieldRoot} from "../../../ui/textfield"
import { For,Show } from "solid-js"
import { DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../../ui/dialog"
import Programme from "../../programme/programme"
function AssignedProgramme(props:props)
{
    return(<div class="bg-white h-full shadow-md p-8 w-full mx-auto flex flex-col overflow-y-auto">
        <div class="flex flex-row justify-between">

        <h1 class="font-bold text-lg">
            Programmes Enrolled

        </h1>
    <Dialog >
        <DialogTrigger>
            <Button>
                Change
            </Button>
        </DialogTrigger>
        <DialogContent class="bg-white w-full h-full max-w-none">
            <DialogHeader>
                <DialogTitle>
                    My Programmes
                </DialogTitle>

            </DialogHeader>
            <Programme programme_id={props.programme_id} programme={props.allProgramme}>
                
            </Programme>
        </DialogContent>
        </Dialog>
</div>
      

      <div class="overflow-y-auto">
       <h2 class="font-semibold">
      {props.programme?.name?? ""}
      </h2>
      <span class="font-bold">
        {props.programme?.status}
      </span>
      <p class="text-gray-600">
        {props.programme.description}

      </p>

         
            

                <For each={props.programme.workout}>
                    {(workout)=><div class="mt-2 space-y-1 pl-4">
                        <h4 class="text-gray-600 font-medium">
                            {workout.name}
                        </h4>
                        

                        <For each={workout.details}>
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
   
        
    </div>)

}
export default AssignedProgramme;