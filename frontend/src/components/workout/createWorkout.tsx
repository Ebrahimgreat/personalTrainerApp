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




type exerciseInformation={
    id:number,
    name:string,
    equipment:string,
    target:string,
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
    removeItem:(item:number,value:number,key:number)=>void
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

  function removeItem(id:number,value:number,key:number){
   props.removeItem(id,value,key)
  }
  function addExercise(item:workout){


   props.addExercise(item)
  }
  
   

   
    
    
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
           
          
        
        <div class="grid grid-cols-1 md:grid-cols-2 w-full gap-x-4" >

        
           
           
            <ExerciseLibrary updatingExercise={(item)=>addExercise(item)} equipmentSelected={props.equipment}   equipment={equipmentArray} types={bodyPart} typeSelected={props.type} setTypeSelected={(item)=>props.setType(item)} setEquipment={(item)=>updateEquipment(item)} myExercises={props.exercises} setSearchSelected={(item)=>updateSearchString(item)}  searchExercise={props.searchString} >
        
            </ExerciseLibrary>


        
            





<div class="flex flex-col">


    
<div class="flex-1 overflow p-5 ">




                    
<Show when={programme()==='No Programme'}>

    <select disabled value={props.clientName} class=" disabled:cursor-not-allowed w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-5  ">
        <option>
          {props.clientName}
        </option>
        
    </select>
    <select class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-5">
        <option>
            Programme
        </option>
        <option>
            No Programme
        </option>

    </select>


            <input type="text" onchange={(e)=>updateWorkoutName(e.currentTarget.value)} value={props.workoutName} class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-5" placeholder="Enter Name of Workout..">
            </input>
            </Show>
         
         <label class="block">
            Date
         </label>


            <input type="date" onChange={(e)=>updateDate(e.currentTarget.value)} class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-10 ">
            </input>

                


                
            



                 
            <div class=" text-black shadow-lg mt-4 h-full overflow-y-scroll px-3">
               

               <For each={props.myExercise}>
                {(item,key)=>(
                    <div class="min-h-[200px] max-h-[200px] overflow-y-auto">
                           <span class="text-lg font-semibold text-blue-500">
                     
    
        
         Name: {item.name}
  
       
                  </span>
                        

                <For each={(item.exercise)}>
                    {(value)=>(
                   
                <div class="  text-black shadow-md p-8 flex mb-10 flex-col">
           
            
        
              
                 <div class="grid grid-cols-5 border-b p-2 gap-x-4">

     
         <div class="flex flex-col">

  
                <p class="text-sm">
                    Set
                </p>
                <input value={value.set} type="text" class="shadow-appearance-none border w-full border-gray-300 ">
                </input>
                

         
                  </div>
                      

             
<div class="flex flex-col">



                 <p class="text-sm">

                         Weight
   
                        </p>
                        <input value={value.weight} type="text" class="border shadow-md rounded">
                </input>
                
                
  </div>


<div class="flex flex-col">
    

           <p class="text-sm ">
            reps
           </p>

           <input value={value.reps} type="text" class="border shadow-md rounded">
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