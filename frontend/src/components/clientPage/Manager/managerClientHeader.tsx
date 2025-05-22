import Button from "../../button"
import { For } from "solid-js"
const tabBar:string[]=['Overview','WorkoutProgramme','Exercise Statistics']
import { useNavigate } from "@solidjs/router"
import Modal from "../../modal"
import CreateWeight from "../../weight/createWeight"
import CreateWorkout from "../../workout/createWorkout"


type workout={


            exercise:{
                id:number,
                name:string,
                exercises:{
                set:number,
                weight:number,
                repRange:number
                }[];
            }[];

        
    
       
    
   
}

type exerciseInformation={
    id:number,
    name:string,
    equipment:string,
    target:string,
}
type props={
   name:string,
   email:string,
   exercises:exerciseInformation[],
   myExercise:workout,
   addExercise:(item:workout)=>void,
   searchString:string,
   equipment:string,
   type:string,
   setSearchString:(item:string)=>void,
   setType:(item:string)=>void,
   setEquipment:(item:string)=>void,
   setWorkoutName:(item:string)=>void,
  workoutName:string,
   setDate:(item:string)=>void,
   removeItem:(id:number,value:number,key:number)=>void

}


function ManagerClientHeader(props:props)
{
    function updateSearchString(item:string)
    {
        console.log("item",item)
        props.setSearchString(item)

    }
    function updateType(item:string){
        props.setType(item)
    }
    function updateEquipment(item:string){
        props.setEquipment(item)
    }
    function updateWorkoutName(item:string){
        props.setWorkoutName(item)
    }
    function updateDate(item:string){
        props.setDate(item)
    }
    function addExercise(item:workout){

        props.addExercise(item)
    }
    function removeItem(item:number,value:number,id:number){
     props.removeItem(item,value,id)
        
    }



    const navigate=useNavigate();
    return(
        <div class="w-full p-4 bg-white">
        <div class="flex flex-row justify-between">



<For each={props.myExercise.exercise}>
    {(item)=><p>
        {item}</p>}
</For>
    
    <span class=" font-bold text-2xl">
        {props.name? props.name :''}
    </span>
    <Modal title="New Weight" buttonText="Create Weight" >
  <CreateWeight clientName={props.name}/>
        
    </Modal>


       <Modal buttonText="Add Workout" title="Create Workout">
        
        <CreateWorkout removeItem={(number,value,key)=>removeItem(number,value,key)} workoutName={props.workoutName} setWorkoutName={(item)=>updateWorkoutName(item)} myExercise={props.myExercise} equipment={props.equipment} setEquipment={(item)=>updateEquipment(item)} setType={(item)=>updateType(item)}    type={props.type} searchString={props.searchString} setSearchString={(item)=>updateSearchString(item)} addExercise={(item)=>addExercise(item)}   exercises={props.exercises} clientName={props.name}/ >
        </Modal>
 



        </div>
        </div>
    )

}
export default ManagerClientHeader;