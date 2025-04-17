1
import { createResource,For,Show,createEffect,createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import Button from "./components/button";
type newProgrmme={
    name:string,
    description:string,
    totalWorkouts:number,
    workout:
        {name:string,
            id:number,
    exercise:
        {
            id:number,
            repRange:string,
        name:string,
        weight:number
        }[]
}[]

}



const options:string[]=['1-3','3-6','6-9','10-12','12-15','15+']

const[save,setSave]=createSignal(false)
const getExercises=async()=>{
    const data=await fetch('http://localhost:3001/api/exercise/all')
    return data.json();
}



import CreateExercise from "./components/createExercise";
import { create } from "domain";
import { updateFields } from "./components/createClientForm";
import TotalWorkouts from "./components/programmeComponent/totalWorkouts";
import CreateNewProgramme from "./components/programmeComponent/createNewProgramme";
import EditExercises from "./components/programmeComponent/editExercises";


function CreateProgramme()
{
    const[totalExercises,setTotalExercises]=createSignal(0)

    const[workoutSignal,setWorkoutSignal]=createSignal(-1)


    const[newProgramme,setNewProgramme]=createStore<newProgrmme>({
        name:'',
       workout:[],
        description:'',
        totalWorkouts:0
        
    })

    const addExercise=()=>{
       
        setNewProgramme('workout',workoutSignal(),'exercise',(current)=>[
            ...current,{
                id:newProgramme.workout[workoutSignal()].exercise.length,
                name:'',
                repRange:'',
                weight:0

            }
        ])
     
      
      
        
    }

    const removeitem=(key:number)=>{
        setNewProgramme('exercise',(current)=>current.filter((item)=>item.id!=key))
     
    }


    const removeWorkout=(index:number)=>{
        setWorkoutSignal(-1)
        setNewProgramme('workout',(current)=>current.filter((item)=>item.id!=index))


    }
    


    
    const addWorkoutInProgramme=async()=>{
        
       
        setNewProgramme('workout',(current)=>[
            ...current,{
                name:'Upper Body',
                id:newProgramme.workout.length,
                exercise:[
                    {
                        id:0,
                        name:'',
                        repRange:'1-3',
                        weight:0
                    }

                ],
                
            }
        ])
        setWorkoutSignal(newProgramme.workout.length-1);
        
        setSave(false)
        console.log(newProgramme.workout)
       
      





    }


    const editFields=(key:number,fieldName:string)=>(event:Event)=>{
        console.log(fieldName)
     

        if(fieldName==='repRange')
            {
                console.log(fieldName)
                const selectElement=event.currentTarget as HTMLSelectElement;
                console.log(selectElement.value)
                setNewProgramme('workout',workoutSignal(),'exercise',key,((current)=>({
                    ...current,
                    [fieldName]:String(selectElement.value)
    
                })))
            }
else{
        const inputElement=event.currentTarget as HTMLInputElement;
        console.log(inputElement.value)
       
        setNewProgramme('workout',workoutSignal() ,'exercise',key,((current)=>({
            ...current,
            [fieldName]:String(inputElement.value)
        })))
       

    }
}


    const  submitForm=async (event:Event)=>
        {
            event.preventDefault();
          
            console.log(newProgramme);
            try{
                const data=await fetch('http://localhost:3001/api/programme/store',{
                    method:'POST',
                    body:JSON.stringify({
                        name:newProgramme.name,
                        description:newProgramme.description,
                        exercises:newProgramme.exercise

                    })
                })
            }
            catch(error){
                console.log
            }
        
        }
        
   

        const removeExercise=(key:number)=>{
       
            console.log(key)
            setNewProgramme('workout',workoutSignal(),'exercise',(current)=>current.filter((item)=>item.id!=key))

        }
        

        const saveExercise=()=>{
            setSave(true)
            setWorkoutSignal(-1)
            console.log(newProgramme.workout)
        }
createEffect(()=>{
    console.log(workoutSignal())
})




    const[exerciseLibrary]=createResource(getExercises)
    return(
        
        <div class="grid grid-cols-3 gap-x-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <TotalWorkouts removeItem={(index)=>removeWorkout(index)} setWorkoutSignal={(index)=>setWorkoutSignal(index)}  items={newProgramme.workout} onClick={(index)=>setWorkoutSignal(index)}>

            </TotalWorkouts>
            
   <CreateNewProgramme headingText="Create Programme" onDescriptionChange={(e)=>setNewProgramme('description',e)} name={newProgramme.name} onNameChange={(e)=>setNewProgramme('name',e)} description={newProgramme.description} onSubmit={submitForm}>
            
            


<Show when={save()==true || workoutSignal()==-1}  >

<div class="mb-6">


<Button type={'button'} onClick={()=>addWorkoutInProgramme()}>
    Add Workout

</Button>
</div>
</Show>
<Show when={workoutSignal()!=-1 && newProgramme.workout[workoutSignal()]}>


<div class="mb-5">


<input class={` w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`} value={newProgramme.workout[workoutSignal()].name} onchange={(e)=>setNewProgramme('workout',workoutSignal(),'name',e.currentTarget.value)} type="text">
</input>
</div>


</Show>
Workout Signal: {workoutSignal()}

<Show when={workoutSignal()!=-1}>
    <div class="flex flex-row justify-between">


            <Button type="button" class="bg-blue-50" onClick={()=>addExercise()}>
                Add Exercise
            </Button>
            <Button type="button" onClick={()=>saveExercise()}>
                Save
            </Button>
            </div>



        </Show>

<For each={newProgramme.workout}>
    {(item,key)=><div class="flex flex-row justify-between">
      



        </div>}
</For>





<div class="mt-8 px-4 py-4 border-t flex items-center justify-center">
<Show when={save()}>



<Button type="submit">
    Submit
</Button>
</Show>


</div>
</CreateNewProgramme>










<div class="shadow-lg mt-4 overflow-y-scroll px-5 py-3 bg-white min-w-[450px] max-w-[450px]">


<Show when={workoutSignal()!=-1 && newProgramme.workout[workoutSignal()]}>
<EditExercises onRemove={(index)=>removeExercise(index)}  onNameChange={(index)=>editFields(index,'name')}  onRepRangeChange={(index)=>editFields(index,'repRange')}  onWeightChange={(index)=>editFields(index,'weight')}   items={newProgramme.workout[workoutSignal()].exercise} exerciseLibrary={exerciseLibrary()} name={newProgramme.workout[workoutSignal()].name}/>

    </Show>

            </div>
            </div>
            

    )
}
export default CreateProgramme;