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

type props={
    workout:Programme[]
}

import { For,Show } from "solid-js"
function AssignedProgramme(props:props)
{
    return(<div class="bg-white h-full shadow-md p-8 w-full mx-auto flex flex-col overflow-y-auto">
        <h1 class="font-bold text-lg">
            Programmes Enrolled

        </h1>
        <input type="text" class="border p-1 mb-4" placeholder="search Programmes For User">
        </input>

      <div class="overflow-y-auto">


           <For each={props.workout}>
            {(programme)=><div class="border border-gray-400 overflow-x-auto">
                <h2 class="font-semibold text-gray-700">
                   {programme.name}
                   </h2>
                   <span class="font-bold">
                    {programme.status}
                   </span>
                

                   <p>
                    {programme.description}
                   </p>

                <For each={programme.workout}>
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