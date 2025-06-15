import { createResource,For, createSignal,Show, createEffect } from "solid-js";
import { createStore } from "solid-js/store";
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=add" />
import Button from "../button";
import { exercise } from "../CreateExerciseForm";
import { createSign } from "crypto";
import Modal from "../modal";
import Workout from "../../workout";
import { useAuth } from "clerk-solidjs";
import { useLocation } from "@solidjs/router";

import addIcon from './assets/icons/add.svg';
import ExerciseLibrary from "../exercise/exerciseLibrary";
import CreateExercise from "../exercise/createExercise";

import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";

const [submitDialog,setSubmitDialog]=createSignal(false)
type exerciseInformation={
    id:number,
    name:string,
    equipment:string,
    target:string,
}
type programmeTypes={
    id:number,
    name:string,
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

type props={
    clientName:string,
    showProgramme:string,
    programmeTypeSelected:programmeTypes,
updateProgrammeType:(item:number)=>void,
    programmeTypes:programmeTypes[],
    setShowProgramme:(item:string)=>void,
    programmeExercises:exerciseInformation[],
    exercises:exerciseInformation[],
    myExercise:workout,
    addExercise:(item:workout)=>void,
    searchString:string,
    type:string,
    equipment:string,
    setSearchString:(item:string)=>void
    setEquipment:(item:string)=>void,
    setType:(item:string)=>void,
    setWorkoutName:(item:string)=>void,
    setDate:(item:string)=>void,
    workoutName:string,

    removeItem:(item:number,value:number,key:number)=>void,
    updateWorkout:(item:number,value:number,key:number)=>void,
    submitWorkout:()=>void
}


const equipmentArray:string[]=['Barbell','Dumbell','KettleBells','Body Weight','Cable']
const bodyPart:string[]=['Chest','Quads','Hamstrings','Rear Delts','Tricpes']


function CreateWorkout(props:props)
{

    const location=useLocation()
    const[id,setId]=createSignal(location.search.slice(4))

   const{getToken}=useAuth();
  
    

    const fetchData=async()=>{
      
        const response=await fetch(`http://localhost:3001/api/exercise/all?id=${id()}&exerciseName=${searchExercise()}&type=${exerciseType()}&equipment=${exerciseEquipment()}`,{
            method:'GET'
        })
        return response.json();
    }
    const[programme,setProgramme]=createSignal('No Programme')
    const[workoutName,setWorkoutName]=createSignal('')
    const [searchExercise,setSearchExercise]=createSignal('')
    const[exerciseType,setExerciseType]=createSignal('')
    const[exerciseEquipment,setEquipment]=createSignal('')

    const[confirmationDialog,setConfirmationDialog]=createSignal(false)

    const[dateSelected,setDateSelected]=createSignal(new Date().toDateString())
  
   
  function updateSearchString(item:string){
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

  function submitWorkout(){
    props.submitWorkout()
  }

  function updateWorkout(id:number,key:number,value:number,field:string){
    props.updateWorkout(id,key,value,field)
  }

  function removeItem(id:number,value:number,key:number){
   props.removeItem(id,value,key)
  }
  function addExercise(item:workout){


   props.addExercise(item)
  }

  function updateProgrammeType(item:number){
   
   props.updateProgrammeType(item)
   
  }

   







createEffect(()=>{
    console.log("Confirmation",submitDialog())
})
   
    
    
    return(
        <div class="h-full w-full">

            <div class="flex flex-row justify-between">

        
<div>


<h1 class="text-3xl font-semi-bold text-gray-900 ">
               Create Workout
        
         
            </h1>
            <span class="text-gray-600 text-sm">
                Search For exisitng Exercises and add them.
            </span>
           
</div>
      
            <Modal title="New Exercise" buttonText="Create Exercise">
                <CreateExercise/>
            </Modal>
</div>

           


            <Show when={confirmationDialog()}>
                <Modal buttonText="hello">
                    hi
                </Modal>
         
            </Show>
            
            
           
          
        {props.programmeExercises.length}
        <div class="grid grid-cols-1 md:grid-cols-2 w-full gap-x-4" >

        
           
           
            <ExerciseLibrary showProgramme={props.showProgramme} updatingExercise={(item)=>addExercise(item)} equipmentSelected={props.equipment}   equipment={equipmentArray} types={bodyPart} typeSelected={props.type} setTypeSelected={(item)=>props.setType(item)} setEquipment={(item)=>updateEquipment(item)} myExercises={props.showProgramme==='No Programme'? props.exercises: props.programmeExercises} setSearchSelected={(item)=>updateSearchString(item)}  searchExercise={props.searchString} >
        
            </ExerciseLibrary>


        
            





<div class="h-[400px] overflow-y-auto">


    
<div class="flex-1 overflow p-5 ">




                    
<Show when={programme()==='No Programme'}>

    <select disabled value={props.clientName} class=" disabled:cursor-not-allowed w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-5  ">
        <option>
          {props.clientName}
        </option>
        
    </select>
    <select onchange={(e)=>props.setShowProgramme(e.currentTarget.value)} value={props.showProgramme} class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-5">
        <option>
            Programme
        </option>
        <option>
            No Programme
        </option>

    </select>
{props.programmeTypeSelected.id}
<Show when={props.showProgramme==='Programme'}>

    <select onchange={(item)=>updateProgrammeType(item.currentTarget.value)}   value={props.programmeTypeSelected.id}>
      <For each={props.programmeTypes}>
        {(item)=><option value={item.id}>
            {item.name}
          
            </option>}
            </For>

    </select>
</Show>

            <input type="text" onchange={(e)=>updateWorkoutName(e.currentTarget.value)} value={props.workoutName} class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-5" placeholder="Enter Name of Workout..">
            </input>
            </Show>
         
         <label class="block">
            Date
         </label>


            <input type="date" onChange={(e)=>updateDate(e.currentTarget.value)} class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-10 ">
            </input>
      
           <AlertDialog open={submitDialog()}>
            <AlertDialogTrigger onclick={()=>setSubmitDialog(true)}>
                
            <Button>
                Submit
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent class="bg-white">
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you sure you want to submit?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action will submit the workout.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                   <Button onClick={()=>setSubmitDialog(false)}>
                Cancel
                </Button>
                <Button onClick={()=>submitWorkout()} >
                    Continue
                </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
           </AlertDialog>
                


                
            



                 
            <div class=" text-black shadow-lg mt-4 px-3">
               

               <For each={props.myExercise}>
                {(item,key)=>(
                  <div class="grid gap-4">
                           
                     
    
        
             <h2 class="text-lg font-bold">
               Name: {item.name}
  
       </h2>
                
                        

                <For each={(item.exercise)}>
                    {(value,internalKey)=>(
                   
                <div class="  text-black shadow-md p-8 flex mb-10 flex-col">
           
            
        
              
                 <div class="grid grid-cols-5 border-b p-2 gap-x-4">

     
         <div class="flex flex-col">

  
                <p class="text-sm">
                    Set
                </p>
                {value.set}

         
                  </div>
                      

             
<div class="flex flex-col">



                 <p class="text-sm">

                         Weight
   
                        </p>
                        <input type="number" value={value.weight} onchange={(e)=>updateWorkout(key(),internalKey(),Number(e.currentTarget.value),'weight')}   class="border shadow-md rounded">
                </input>
                
                
  </div>


<div class="flex flex-col">
    

           <p class="text-sm ">
            reps
           </p>

           <input value={value.reps} onchange={(e)=>updateWorkout(key(),internalKey(),Number(e.currentTarget.value),'reps')} type="number" class="border shadow-md rounded">
                </input>
                

                
</div>


<div class="flex flex-col">


              
                        <button onclick={()=>removeItem(key(),value.id,item.id)} type="button" class="w-10 h-10 text-white text-sm bg-red-500 rounded-full shadow-md">
                         X
                        </button>
</div>
<div class="flex flex-col">


                        <button onclick={()=>addExercise(item)}  type="button" class="w-10 h-10 text-white text-sm bg-blue-500 rounded-full shadow-md">
                       +
                        </button>
                        </div>
                        </div>
                   
                    

                   </div> )}
                   </For>
                   </div>
                )  }
               </For>
         
                
                </div>
            

           





                


</div>
</div>


          




</div>
</div>
           

    )
}
export default CreateWorkout;