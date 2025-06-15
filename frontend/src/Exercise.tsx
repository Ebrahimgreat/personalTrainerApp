import { createEffect, createResource, createSignal, For,Show } from "solid-js";
import Button from "./components/button";
import { createStore } from "solid-js/store";
import { useNavigate } from "@solidjs/router";
import AboutExercise from "./components/exercise/about";
import ExerciseInstructions from "./components/exercise/instructions";
import { create } from "domain";
import ExerciseLibrary from "./components/exercise/exerciseLibrary";
type myexercise={
    name:string,
    type:string,
    instructions:string
    equipment:string,
    targetMuscleGroup:string

}
const equipment:string[]=['Barbell','Dumbell','KettleBells','Body Weight','Cable','Machine']
const bodyPart:string[]=['Chest','Quads','Hamstrings','Rear Delts','Tricpes']
const[typeSelected,setTypeSelected]=createSignal('Type')
const[searchExercise,setSearchExercise]=createSignal('')
const [equipmentSelected,setEquipment]=createSignal('Equipment')
function Exercise()
{
    const navigate=useNavigate();
    
    const filters=['Chest','Triceps','Bicep','Quads','Hamstrings'];
   
    const fetchData=async()=>{
        const response=await fetch(`http://localhost:3001/api/exercise/all?exerciseName=${searchExercise()}&type=${typeSelected()}&equipment=${equipmentSelected()}`,{
            method:'GET'
        })
        return response.json();
    }
  



    const[myExercises,setMyExercises]=createResource(()=>[searchExercise(),typeSelected(),equipmentSelected()],
    ([search,type,equipment])=>fetchData());
    const [myExerciseSelected,setMyExerciseSelected]=createStore<myexercise>({
        name:'',
        type:'',
        instructions:'',
        equipment:'',
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

<h1 class="text-3xl font-semi-bold text-gray-900 ">
                Exercises
        
         
            </h1>
            <p class="text-gray-600 text-sm">
                Search For existing exercises,view them and create your custom exercises
            </p>
           
         

         

         
            
         

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