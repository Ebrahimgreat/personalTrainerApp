import { createEffect, createResource, createSignal, For,Show } from "solid-js";
import Button from "./components/ui/button";
import { createStore } from "solid-js/store";
import { useNavigate } from "@solidjs/router";
import AboutExercise from "./components/exercise/about";
import ExerciseInstructions from "./components/exercise/instructions";
import {
    useQuery
} from '@tanstack/solid-query';
import { hc } from "hono/client";
import { myExerciseType } from "../../backend/src/routes/exercise";
const client=hc<myExerciseType>('http://localhost:3001/api/exercise')



import ExerciseLibrary from "./components/exercise/exerciseLibrary";
import CreateExercise from "./components/exercise/createExercise";
import Dialog, { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./components/ui/dialog";
import {TextField,TextFieldLabel,TextFieldRoot} from "./components/ui/textfield";
import { TextArea } from "@kobalte/core/text-field";
import { getAuth } from "@hono/clerk-auth";
import { useAuth } from "clerk-solidjs";
type myExercises=Awaited<ReturnType<typeof client.all.$get>>;
const equipment:string[]=['Barbell','Dumbell','KettleBells','Body Weight','Cable','Machine']
const bodyPart:string[]=['Chest','Quads','Hamstrings','Rear Delts','Tricpes']
const[typeSelected,setTypeSelected]=createSignal('Type')
const[searchExercise,setSearchExercise]=createSignal('')
const [equipmentSelected,setEquipment]=createSignal('Equipment')
type exercise={
    name:string,
    type:string
    equipment:string,
    instructions:string
}

const [newExercise,setNewExercise]=createStore<exercise>({
    name:"",
    type:"Chest",
    equipment:"Barbell",
    instructions:""
    
})


function Exercise()
{
    const {getToken,isSignedIn}=useAuth();


    const submitExercise=async(event:Event)=>{
        event.preventDefault();
        try{
            const token=await getToken();
            const data=await fetch('http://localhost:3001/api/exercise/store',{
                method:"POST",
                headers:{
                    'Authorization':`Bearer ${token}`,
                    
                },
                body:JSON.stringify({
                    name:newExercise.name,
                    equipment:newExercise.equipment,
                    type:newExercise.type,
                    instructions:newExercise.instructions

                })
            })
        }
        catch(error){
            console.log(error)
        }

    }
    const navigate=useNavigate();
    
    const filters=['Chest','Triceps','Bicep','Quads','Hamstrings'];
   
    const fetchData=async()=>{
        const response=await client.all.$get({
            query:{
                searchExercise:searchExercise(),
                type:typeSelected(),
                equipment:equipmentSelected()
            }
        })
      
        return await response.json();
    }
  



    const[myExercises,setMyExercises]=createResource(()=>[searchExercise(),typeSelected(),equipmentSelected()],
    ([search,type,equipment])=>fetchData());
    const [myExerciseSelected,setMyExerciseSelected]=createStore<myexercise>({
        name:'',
        type:'Chest',
        instructions:'',
        equipment:'Barbell',
        targetMuscleGroup:''

    })
      
   const updateExercise=(item:object)=>{
    console.log('hello')
    setMyExerciseSelected('instructions',item.instructions),
    setMyExerciseSelected('name',item.name),
    setMyExerciseSelected('type',item.type)
    setMyExerciseSelected('equipment',item.equipment)
    setMyExerciseSelected('targetMuscleGroup',item.type)
   

   }

   createEffect(()=>{
    if(!isSignedIn()){
   navigate('/')
    }
 
  })

createEffect(()=>{
    if(typeSelected()==='No option')
    {
        setTypeSelected('')
    }
    if(equipmentSelected()=='No option')
    {
       setEquipment('')
    }
})


    
    const[exercise,setExerciseSelected]=createSignal('')


   

    return(
        <div class="flex flex-col w-full">


<Show
  when={myExercises.loading}>
    <div class="flex justify-center items-center p-4">
      <svg class="size-6 text-gray-500 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none"
        viewBox="0 0 24 24" stroke="currentColor">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z" />
      </svg>
      <span>Loading</span>
    </div>

  </Show>

         

<h1 class="text-3xl font-semi-bold text-gray-900 ">
                Exercises
        
         
            </h1>
            <div class="flex flex-row justify-between mb-10">


            <p class="text-gray-600 text-sm">
                Search For existing exercises,view them and create your custom exercises
            </p>
       <Dialog>
        <DialogTrigger>
<Button>
    Create Exercise
</Button>
        </DialogTrigger>
        <DialogContent class="bg-white flex flex-col">


<form onSubmit={submitExercise}>



        <DialogHeader>
            <DialogTitle>
                Create Exercise
            </DialogTitle>
            <DialogDescription>
                This will create a new exercise
            </DialogDescription>
        </DialogHeader>
        <TextFieldRoot class="flex flex-col">

            <TextFieldLabel>
                Name
            </TextFieldLabel>

     
        <TextField required value={newExercise.name} onChange={(e)=>setNewExercise('name',e.currentTarget.value)}>

        </TextField>

        <TextFieldLabel>
              Equipment
            </TextFieldLabel>
            <select required value={newExercise.equipment} onChange={(e)=>setNewExercise('equipment',e.currentTarget.value)}>
                <For each={equipment}>
                    {(item)=><option>
                        {item}
                        </option>}
                </For>
                
            </select>

            <TextFieldLabel>
                Type
                
            </TextFieldLabel>

            <select value={newExercise.type} onChange={(e)=>setNewExercise('type',e.currentTarget.value)}>
                <For each={bodyPart}>
                    {(item)=><option value={item}>
                        {item}
                        </option>}
                </For>
                
            </select>
           


            <TextFieldLabel>
              Instructions
                
            </TextFieldLabel>
         <TextArea required value={newExercise.instructions} onChange={(e)=>setNewExercise('instructions')} class="border">
            </TextArea>


            
    
        </TextFieldRoot>
        <DialogFooter>
            <Button type="button">
                Cancel
            </Button>
            <Button type="submit">
                Submit
            </Button>
        </DialogFooter>
        </form>
        </DialogContent>
       </Dialog>
           
         </div>

         

         
            
         

            <Show when={myExercises()}>
            <div class="grid grid-cols-1 md:grid-cols-2 w-full h-[80vh]   justify-start gap-x-3">

                

     
        <ExerciseLibrary showProgramme="No Programme" setEquipment={(item)=>setEquipment(item)} setTypeSelected={(item)=>setTypeSelected(item)} updatingExercise={(item)=>updateExercise(item)} myExercises={myExercises()} typeSelected={typeSelected()} types={bodyPart} setSearchSelected={(item)=>setSearchExercise(item)} searchExercise={searchExercise()} equipmentSelected={equipmentSelected()} equipment={equipment}>

        </ExerciseLibrary>


            <div class="flex flex-col  gap-x-4 gap-y-5 w-full">

                <Show when={myExerciseSelected.name==''}>
                  <div class="bg-white shadow-md  min-h-full max-h-full flex flex-col items-center justify-center  text-black">
                  <img  class="rounded-full border h-16 w-16  object-cover bg-black" src='/src/assets/icons/exerciseSvg.svg'>
                  </img>
                  
                    <label class="block w-full text-center font-bold ">
                     Select  exercise
                    </label>
                    <span class="font-extralight">
                        Start By selecting an exercise from the library.
                    </span>
                   
                    </div>
                </Show>
              
      <Show when={myExerciseSelected.name!=''}>

 
            <AboutExercise targetMuscleGroup={myExerciseSelected.targetMuscleGroup} name={myExerciseSelected.name} equipment={myExerciseSelected.equipment}>

            </AboutExercise>
            <div class="flex flex-col h-full">

   <div class="">

   
            <ExerciseInstructions instruction={myExerciseSelected.instructions}>


            </ExerciseInstructions>
            
            </div>
            
            </div>
            </Show>
            </div>

           

      
         
            
            

   
       
        </div>

    
        </Show>



        </div>

    )
    
}
export default Exercise;