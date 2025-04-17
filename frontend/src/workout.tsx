import { createResource,Show,For, createSignal,createEffect } from "solid-js";
import Button from "./components/button";
import { useNavigate } from "@solidjs/router";
import Table from "./components/table";
import { createStore } from "solid-js/store";
import { useSearchParams } from "@solidjs/router";
import Modal from "./components/modal";
import { useAuth } from "clerk-solidjs";


type newWorkout={
  exercise:[
  
    name:string,
    reps:number,
    weight:number,
   
  
  ]
}


function Workout()
{
  const{getToken}=useAuth();

  
  
  const[searchParams,setSearchParams]=useSearchParams();
  const[newWorkout,setNewWorkout]=createStore<newWorkout>({
    exercise:[]
    
  })
  

    const columns:string[]=['name','date','programme','view']
    const keys=[{name:'name'},{name:'created_at',format:'date'}]

    
    const view:{name:string,value:(item:object)=>void}[]=[
      {name:'view',value:(item)=>{
        setSearchParams({date:item.created_at})
       navigate(`/workout/show?date=${item.created_at}`)
      }}
    ]
    const actions:{name:string,value:(item:object)=>void}[]=[
      {name:'delete',value:(item)=>{
        if(item!=null)
        {
          console.log(item)
          deleteItem(item)
        }
      }}

    ]


    const fetchData=async()=>{
      const token=await getToken();
      console.log(token)
        const data=await fetch('http://localhost:3001/api/workout',{
            method:"GET",
            headers:{
              'Authorization': `Bearer ${token}`
            }
        })
        return data.json();

    }
   

    const deleteItem=async(item:object)=>{
      try{
        console.log(item)
        const message=confirm('Are You sure you want to delete this?')
        if (message===true){
        const data=await fetch('http://localhost:3001/api/workout/remove',{
          method:'POST',
          body:JSON.stringify({
            item:item

          })
        })
      }
    }
   
    catch(error){
      console.log(error)
    }
  }
    

    const[myWorkout]=createResource(fetchData);

    const[exerciseSignal,setExerciseSignal]=createSignal('')

    const fetchExercises=async()=>{
        const data=await fetch(`http://localhost:3001/api/exercise?name=${exerciseSignal()}`,{
        method:'GET'
      })
      return data.json();
    }

    const[exercises]=createResource(exerciseSignal,fetchExercises)


    const navigate=useNavigate();


    const getStats=async()=>{
      const data=await fetch(`http://localhost:3001/api/workout/stats?id=${exerciseSelected()}`,{
          method:"GET"
      })
      return data.json();
  }
  const[exerciseSelected,setExerciseSelected]=createSignal('')
  const[myStats]=createResource(exerciseSelected,getStats)
  

  function updateFields()
  {
    console.log(newWorkout.exercise)

    setNewWorkout('exercise',(current)=>[
      ...current,{
        name:'Hello',
        reps:0,
        weight:0
      }
    ])
 
    
    

   }
   
    


 
    return(
        <div class="flex flex-col">
         
         <div class="flex items-center justify-center mb-3">

       
          <Button class="w-32" onClick={()=>navigate('/createWorkout')}>
            Add Workout

          </Button>
          </div>
         


<table class="w-full text-gray-600">
  <thead class="border px-4 py-2 gap-x-3 border-gray-300">
    <tr class="px-4 py-2">
      <th class="px-4 py-2">
      Date
      </th>
      <th class="px-4 py=2">
   Programme
      </th>
     
    </tr>
  </thead>
  <tbody>
    <For each={myWorkout()}>
      {(item)=><tr>
        <td class="px-4 py-2 text-center">
          {new Date(item.created_at).toLocaleDateString()}
          </td>
          <td class="px-4 py-2 text-center" >
            
      
          </td>
          </tr>}
    </For>
    
    
    

       
       
          
          
      
      
    </tbody>
    </table>
    </div>

)}
export default Workout;