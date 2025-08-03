import { createSignal, For } from "solid-js"
const tabBar:string[]=['Overview','WorkoutProgramme','Exercise Statistics']
import { useNavigate } from "@solidjs/router"
import CreateWeight from "../../weight/createWeight"
import CreateWorkout from "../../workout/createWorkout"
import { Button } from "../../ui/button";
import AddMeasurement from "../measurements/addMeasurement"
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../../ui/dialog"


type programmeExercise={
    id:number
    name:string,
    exercise:string,
    equipment:number

}
type programmeTypes={
    id:number,
    name:string
}

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
type Measurement={
    name:string,
    id:number,
    value:number
}
type props={
    programmeTypes:programmeTypes[],
    measurementDate:string,
    updateMeasurementDate:(item:string)=>void,
  updateProgrammeType:(item:number)=>void,
    programmeTypeSelected:programmeTypes,
    
    programmeExercise:[]
    measurements:Measurement[],
    showProgramme:string,
    setShowProgramme:(item:string)=>void,
   name:string,
   email:string,
   weight:number,
   weightCreated:string,
   updateScaleWeight:(item:number)=>void,
  updateMeasurement:(key:number,item:number)=>void,
   updateWeightDate:(item:string)=>void,
   addWeight:()=>void,
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
  workoutDate:string,
   setDate:(item:string)=>void,
 updateWorkout:(key:number,internalKey:number,value:number,field:string)=>void,
   removeItem:(id:number,value:number,key:number)=>void,
   submitWorkout:()=>void
   submitMeasurement:()=>void

}


function ManagerClientHeader(props:props)
{


    const[openWorkout,setOpenWorkout]=createSignal<boolean>(false)
    const[open,setOpen]=createSignal<boolean>(false)
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

    function updateProgrammeType(){
      
    }



    const navigate=useNavigate();
    return(
        <div class="w-full p-4 bg-white">
        <div class="grid grid-cols-1 md:grid-cols-5 gap-4">



<For each={props.myExercise.exercise}>
    {(item)=><p>
        {item}</p>}
</For>
    
    <span class=" text-2xl font-semibold text-gray-800  pl-4 text-gray-600">
        {props.name? props.name :''}
    </span>
   

    <Dialog open={open()} onOpenChange={setOpen}>
        <DialogTrigger>
            <Button variant="outline">


            Log Measurement
            </Button>

        </DialogTrigger>
   
            <DialogContent class="bg-white w-full  ">
<DialogHeader>


            <DialogTitle>
                New Measurement
            </DialogTitle>
            <DialogDescription>
             All values must be entered in inches. Ensure accurate input to help track your progress effectively.
            </DialogDescription>
        

         
            <AddMeasurement setCloseDialog={()=>setOpen(false)}   measurementDate={props.measurementDate} updateDate={(item)=>props.updateMeasurementDate(item)} submitMeasurement={()=>props.submitMeasurement()}   updateMeasurement={(key,number)=>props.updateMeasurement(key,number)} measurements={props.measurements}/>

    </DialogHeader>
    </DialogContent>

    </Dialog>
    
   
   
  <Dialog>
    <DialogTrigger >
        <Button variant="outline">
        Quick Weight Add

        </Button>
    </DialogTrigger>

    <DialogContent class="sm:max-w-[425px] bg-white ">
    <DialogHeader>
        <DialogTitle>
            Create Weight
        </DialogTitle>
    </DialogHeader>

       <CreateWeight weightCreated={props.weightCreated} addWeight={props.addWeight} updateDate={(item)=>props.updateWeightDate(item)} updateScaleWeight={(item)=>props.updateScaleWeight(item)}  clientName={props.name} scaleWeight={props.weight}>
        </CreateWeight>
    </DialogContent>
   </Dialog>


       <Dialog open={openWorkout()} onOpenChange={setOpenWorkout}>
        <DialogTrigger>
            <Button variant="outline">
                Create Workout
            </Button>
        </DialogTrigger>
        <DialogContent class="bg-white w-full h-full max-w-none">
            <DialogHeader>
                <DialogTitle>
                    New Workout
                </DialogTitle>
            </DialogHeader>
            <CreateWorkout closeDialog={()=>setOpenWorkout(false)} date={props.workoutDate}  updateProgrammeType={(item)=>props.updateProgrammeType(item)}  programmeTypeSelected={props.programmeTypeSelected} programmeTypes={props.programmeTypes} showProgramme={props.showProgramme} programmeExercises={props.programmeExercise} setShowProgramme={(item)=>props.setShowProgramme(item)} updateWorkout={(key:number,internalKey:number,value:number,field:string)=>props.updateWorkout(key,internalKey,value,field)} submitWorkout={props.submitWorkout} removeItem={(number,value,key)=>removeItem(number,value,key)} workoutName={props.workoutName} setWorkoutName={(item)=>updateWorkoutName(item)} myExercise={props.myExercise} equipment={props.equipment} setEquipment={(item)=>updateEquipment(item)} setType={(item)=>updateType(item)}    type={props.type} searchString={props.searchString} setSearchString={(item)=>updateSearchString(item)} addExercise={(item)=>addExercise(item)}   exercises={props.exercises} clientName={props.name}/ >

        </DialogContent>
        
 </Dialog>
 



        </div>
        </div>
    )

}
export default ManagerClientHeader;