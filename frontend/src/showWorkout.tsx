import { createResource, createSignal ,For,createEffect} from "solid-js";
import { useNavigate } from "@solidjs/router";

import Button from "./components/button";
import { useLocation } from "@solidjs/router";


import { onMount } from 'solid-js'
import { Chart, Title, Tooltip, Legend, Colors } from 'chart.js'
import { Line } from 'solid-chartjs'
import { useSearchParams } from "@solidjs/router";
import { createStore } from "solid-js/store";
import Workout from "./workout";
import { setExercise } from "./components/CreateExerciseForm";
type workoutFields={

    workoutLength:number,
    editWorkout:[{
        tempId:number,
        id:number,
        exercise_id:number,
        workout_id:number,
        name:string,
        reps:number,
        set:number,
        weight:number,
        rir:number
  
    }]

}
type exercises={
    exercise_id:number,
    name:string
}



function ShowWorkout()
{
    




const[count,setCount]=createSignal(0)
const location=useLocation();
    const navigate=useNavigate();




    const[workoutDate,setWorkoutDate]=createSignal(location.search.slice(6))



    let exercises:exercises=[];
    const fetchExercises=async()=>{
        try{
            const data=await fetch('http://localhost:3001/api/exercise/all',{
                method:'GET'
            })
           return data.json()
           
          
        }
        catch(error)
        {
            console.log(error)
        }
    }



    


    const[workoutEditStore,setWorkoutEditStore]=createStore<workoutFields>({
        count:0,
        editWorkout:[]

    })
    const[myExercise]=createResource(fetchExercises);
   

    const fetchData=async()=>{
        const data=await fetch(`http://localhost:3001/api/workout/show?date=${workoutDate()}`,{
            method:'GET'
        })
        return data.json();
    }
    const getStats=async()=>{
        const data=await fetch(`http://localhost:3001/api/workout/stats?id=${showStats()}`,{
            method:"GET"
        })
        return data.json();
    }
    const[myWorkout]=createResource(workoutDate,fetchData);
    const[showStats,setShowStats]=createSignal(0)
    const[myStats]=createResource(showStats,getStats)
    const[edit,setEdit]=createSignal(false)




    function deleteItem(id:number){
      setWorkoutEditStore('editWorkout',(current)=>current.filter((item)=>item.tempId!=id));
    }
    function addExercise()
   {
    console.log(workoutEditStore.editWorkout);
    setWorkoutEditStore('editWorkout',(current)=>[
        ...current,{
            tempId:workoutEditStore.editWorkout.length,
            id:0,
            name:myExercise()[0].name,
            reps:0,
            set:0,
            weight:0,
            rir:0,
            exercise_id:myExercise()[0].id,
            workout_id:myWorkout().id,

           

        }

    ])
    
   }
    
    
    
    function updateFields()
    {
      
        for(let i=0; i<myWorkout().workoutDetail.length; i++)
        {
          
            setWorkoutEditStore('editWorkout',(current)=>[
                ...current,
            {
                tempId:workoutEditStore.editWorkout.length,
                id:myWorkout().workoutDetail[i].id,
                    name:myWorkout().workoutDetail[i].exercise.name,
                    reps:myWorkout().workoutDetail[i].reps,
                    set:myWorkout().workoutDetail[i].set,
                    weight:myWorkout().workoutDetail[i].weight,
                    rir: myWorkout().workoutDetail[i].rir,
                    workout_id:myWorkout().workoutDetail[i].workout_id,
                    exercise_id:myWorkout().workoutDetail[i].exercise_id,

                    
            }
            ])
            
        }
        console.log('function has execgtuerd')
        console.log(workoutEditStore.editWorkout)
      
        

    }
    

    const editFields=(fieldName:string,key:number)=>(event:Event)=>{
       const inputElement=event.currentTarget as HTMLInputElement;


       if(fieldName==='name'){
        console.log(myExercise())
        const exercise_id=myExercise().find((item)=>item.name==inputElement.value);
     



      setWorkoutEditStore('editWorkout',key,(current)=>({
        ...current,
        
     
           name:inputElement.value,
           exercise_id:exercise_id.id
        }

      ))
      
      console.log(workoutEditStore)
    }
    else{
        setWorkoutEditStore('editWorkout',key,(current)=>({
            ...current,
            
         
                [fieldName]:Number(inputElement.value)
            }
    
          ))
          console.log(workoutEditStore)

    }

    }

    async function updateInformation()
    {
        console.log(workoutEditStore.editWorkout);
      
        const data=await fetch(`http://localhost:3001/api/workout/update?id=${myWorkout().id}`,{
            method:"POST",
           body:JSON.stringify({
            item:workoutEditStore.editWorkout

           })
        })
     
      

    }

    createEffect(()=>{
        console.log(workoutEditStore);
    })

    createEffect(()=>{
        console.log(edit())
    })

   createEffect(()=>{
  if(myWorkout.loading)
  {
    return;
  }
  if(count()==0)
  {

  
    if( myWorkout() &&  myWorkout().workoutDetail.length>0)
    {
        updateFields()
        fetchExercises()
        setCount(1);
    }
}
   })
    
  
    return(
        <div>


{edit()}

              
            <Show when={myWorkout()}>
                
        
   
                
              <input type="date"   class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
 onChange={(e)=>setWorkoutDate(e.currentTarget.value)} value={workoutDate()}/>
            
            <h1 class="font-bold text-4xl text-center">
              {myWorkout().name}
              </h1>

              <Button onClick={updateFields}>
               Modify Workout
              </Button>
             
      
      <div class="bg-[#2f3134] border w-full text-white shadow-lg mt-4 max-h-[300px] min-h-[300px] overflow-y-scroll px-3 ">

<div class="text-center">


    
      </div>
      
        <For each={myWorkout().workoutDetail}>
            {(item,index)=>(
                <div class="flex flex-row justify-evenly mt-3 shadow-md my-2">
                   <p>
                      # {index()+1}
                    
                   </p>
                    <p class="w-16 font-bold text-lg">
                      
                        {item.exercise.name}
                    </p>
                    <p class="w-16 text-gray-300">
                        Set: {item.set}
                    </p>
                    
                  <p class="w-16 text-gray-300"> Reps:   {item.reps}
                </p>
                <p class="w-16 text-gray-300">
                    Weight: {item.weight}
                </p>
                <p class="w-16 text-gray-300">
                    RIR: {item.rir}
                </p>
                <Button class="w-24 h-8" onClick={()=>setShowStats(item.exercise_id)}>
                    Progression
                </Button>
                
                
                
            

                </div>
            )}
            </For>
           
            </div>

            <Show when={myStats()!=0}>

            <div class="bg-[#2f3134] border w-full text-white shadow-lg mt-4 max-h-[200px] min-h-[200px] overflow-y-scroll px-3">

< Button onClick={()=>setShowStats(0)}>
Hide
</Button>
              
                    

                    <For each={myStats()}>
                        {(item,key)=>(
                            <p class="text-center font-bold">
                           {key()==0? `Progression For ${item.exercise.name}` :''}
                          
                         
                            </p>

                        )}
                    </For>
                <For each={myStats()}>

                    {(item)=><div class="flex flex-row  justify-between p-3"> 
                        Date : {new Date(item.workout.created_at).toLocaleDateString()}
                   <p>
                    Set: {item.set}
                    </p>
                   <p>
                  Reps:{item.reps}
                  </p>
                   <p>
               weight:{item.weight}
               </p>
                        </div>}
                </For>
             

            </div>
            </Show>
            </Show>


<Button onClick={()=>setEdit(prev=>!prev)}>
 Edit
    
 
</Button>

<Show when={edit()}>
    

<div class="bg-[#2f3134] border w-full text-white shadow-lg mt-4 max-h-[200px] min-h-[200px] overflow-y-scroll px-3">

            <table>
 <thead class="bg-pink-500 text-white">
        <tr>
            <th class="px-4 py-2 border border-gray-300">
                Name
            </th>
            <th class="px-4 py-2 border border-gray-300">
                Reps
            </th>
            <th class="px-4 py-2 border border-gray-300">
                Weight
            </th>
            <th class="px-4 py-2 border border-gray-300">
             Set
            </th>
            <th class="px-4 py-2 border border-gray-300">
                Rir
            </th>
            <th class="px-4 py-2 border border-gray-300">
                Remove
            </th>

        </tr>
    </thead>



<For each={workoutEditStore.editWorkout}>


    
    {(item,key)=>(
       <tr>
        <td class="px-4 py-2">
            <select value={item.name}  onChange={editFields('name',key())}>
                <For each={myExercise()}>
                    {(value)=>
                    <option>
                        {value.name}</option>}
                </For>
            </select>
          
        </td>
       
        <td class="px-4 py-2">
           <input type="number" class="border border-gray-300 rounded-lg px-4 py-2 " value={item.reps} onChange={editFields('reps',key())}>
        </input>
        </td>
        <td class="px-4 py-2">

    
        <input type="number" class="border border-gray-300 rounded-lg px-4 py-2 " value={item.weight} onChange={editFields('weight',key())}>
        </input>
        </td>
        <td class="px-4 py-2">

 
        <input type="number" class="border border-gray-300 rounded-lg px-4 py-2 " value={item.set} onChange={editFields('set',key())}>
        </input>
        </td>
        <td class="px-4 py-2 ">
            <input type="number" class="border border-gray-300 rounded-lg px-4 py-2" value={item.rir} onChange={editFields('rir',key())}>
            </input>
        </td>
        <td class="px-4 py-2">
            <Button onClick={()=>deleteItem(item.tempId)}>
             Remove
             </Button>
        </td>
        </tr>
    )}
</For>

</table>
</div>

<div class="flex flex-row justify-around">


<Button onClick={()=>addExercise()}>
    Add Exercise
</Button>
<Button onClick={()=>updateInformation()}>
    Update
</Button>
</div>
</Show>


     
        </div>


      
    )
}
export default ShowWorkout;