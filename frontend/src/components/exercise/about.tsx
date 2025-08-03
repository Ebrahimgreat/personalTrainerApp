
import { Show } from "solid-js";
type AboutExerciseProps={
    name:string,
    equipment:string,
    target:string
    

}

function AboutExercise(props:AboutExerciseProps)
{
    return(
        <div class="bg-white shadow-xl">

            <Show when={props.name!=''}>
                
      
                <h1 class="text-center font-bold ">
                 {props.name}
                 </h1>
            <h2 class="font-semibold ml-10">
                About
            </h2>
        
            <p>

      
           <span class=" ml-10">
       Equipment:
       </span> <span class="font-light">
{props.equipment}
</span>
       </p>
       <p>

<span class=" ml-10">


            Target Muscle Group <span class="font-extralight">
          {props.target}
          </span>
            </span>
            </p>
</Show>
        </div>
    )

}
export default AboutExercise;