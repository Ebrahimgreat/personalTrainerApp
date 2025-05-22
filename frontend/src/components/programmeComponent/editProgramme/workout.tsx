import { For,Show } from "solid-js";
type props={
    programmeName:string,
    workouts:[],
    workoutClicked:(value:string)=>void
}
function EditProgrammeWorkout(props:props){
    <div class="bg-white">
        <h1 class="text-center font-bold">
            {props.programmeName}



        </h1>
        <ul>
            <For each={props.workouts}>
                {(item)=><li onClick={()=>props.workoutClicked(item.name)}>
                    {item}
                    </li>}

            </For>
        </ul>

    </div>

}
export default EditProgrammeWorkout;