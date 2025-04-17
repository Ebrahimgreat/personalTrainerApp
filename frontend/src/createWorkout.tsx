import { createResource,For, createSignal,Show, createEffect } from "solid-js";
import { createStore } from "solid-js/store";
import Button from "./components/button";
import { exercise } from "./components/CreateExerciseForm";
import { createSign } from "crypto";
import Modal from "./components/modal";
import Workout from "./workout";
import { useAuth } from "clerk-solidjs";
type workout={
    id:number,
    name:string,
    exercise_id:number,
    set:number,
    reps:number,
    weight:number,
    rir:number
}



function CreateWorkout()
{

   const{getToken}=useAuth();
  
    const fetchProgrammes=async()=>{
        console.log('running')
        const token=await getToken();
        console.log(token)
        const response=await fetch('http://localhost:3001/api/userProgramme',{
            method:'GET',
            headers:{
                'Authorization':`Bearer ${token}`
            }
            
        })
        return response.json();
    }
    const[myProgramsmes,setMyProgrammes]=createResource(fetchProgrammes)
    const fetchData=async()=>{
        const response=await fetch(`http://localhost:3001/api/exercise?name=${searchExercise()}`,{
            method:'GET'
        })
        return response.json();
    }
    const[programme,setProgramme]=createSignal('No Programme')
    const[workoutName,setWorkoutName]=createSignal('')
    const [searchExercise,setSearchExercise]=createSignal('')

    const[confirmationDialog,setConfirmationDialog]=createSignal(false)

    const[dateSelected,setDateSelected]=createSignal(new Date().toDateString())
    const[myExercises]=createResource(searchExercise,fetchData)
  
  
    const[myWorkout,setMyWorkout]=createStore({
        name:'',
    
   totalWorkout:0,
    workout:[] as workout[]

   })


   
    function addExercise(item:workout){
        
        setMyWorkout("workout",(current)=>[
            ...current,{
                id:myWorkout.workout.length,
                exercise_id:item.id,
                name:item.name,
                reps:0,
                set:0,
                weight:0,
                rir:0
            }

        ])
        

        
       
    }

   function deleteItem(id:number){
    console.log(id)
    setMyWorkout('workout',(current)=>current.filter((deleteId)=>deleteId.id!=id))
    
   }

   


   const updateExercise=(fieldName:string,key:number)=>(event:Event)=>{
    
    const inputElement=event.currentTarget as HTMLInputElement;
    
    setMyWorkout("workout",key,(current)=>({
        ...current,
        [fieldName]:Number(inputElement.value)

    }))
   
   


   }
   const resetStore=()=>{
  setMyWorkout('workout',[]
  )
   }

   const handleChange=(value:string)=>{
    if(myWorkout.workout.length>=1)
    {
        if(value!='Both'){
            const message=confirm('Are You sure You want to reset, this will reset the workout data')
            if(message===true){
               resetStore()

            }
        }
      
    }
   setProgramme(value)
    
   
   }
    


   async function submitForm(event:Event)
   {
    event.preventDefault();

    try{

        let programmeId=0;

        if(programme()==='Programme'){
            console.log('Programme')
            programmeId=myProgramsmes()[0].programme.id
        }


      const token=await getToken();
    
    
       const data= await fetch('http://localhost:3001/api/workout/store',{
            method:'POST',
            headers:{
                'Authorization':`Bearer ${token}`
            },
  
            body:JSON.stringify({
                workoutName:workoutName(),
                programme:programmeId,
                created_at:dateSelected(),
                item:myWorkout.workout,


            })

        
        })
    }
    catch(error){
        console.log(error)
    }
  


   }
   createEffect(()=>{
   
   

   
   })
  
    
    createEffect(()=>{
        console.log(myWorkout.workout.at(-1))
        console.log(myWorkout.totalWorkout);
        setMyWorkout('totalWorkout',myWorkout.workout.length)
    })

   
    
    
    return(
        <div class=" grid grid-cols-3 sm:grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-x-5">

            <Show when={confirmationDialog()}>
                <Modal buttonText="hello">
                    hi
                </Modal>
         
            </Show>
           
          
          

        
            <div class="bg-white shadow-md">
                <h1 class="font-bold border-b">
             Exercise Library

                </h1>

                <input
  type="text"
  placeholder="Search for an exercise by name or type..."
  value={searchExercise()}
  onInput={(e) => setSearchExercise(e.currentTarget.value)}
  class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
/>


                <For each={myExercises()}>
                    {(item)=><div class="flex flex-row justify-between mb-4">
                      <h2 class="font-bold">
                       {item.name}
                       </h2>
                       <Button class={`${programme()==='Programme'?'cursor-not-allowed' : ''}`}disabled={programme()==='Programme'} onClick={()=>addExercise(item)}>
                        Add
                       </Button>

                    
                     
                       </div>}

                </For>
                </div>




            <div class="bg-white">

       

       <form onSubmit={submitForm}>


<label class="block">
    Type
</label>
            <select class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-5"  value={programme()} onChange={(e)=>handleChange(e.currentTarget.value)}>
               <Show when={myProgramsmes.length>0}>

      
                <option value={'Programme'}>
                    Programme

                </option>
                </Show>
                <option selected value={'No Programme'}>
                    No Programme
                </option>
                <Show when={myProgramsmes.length>0}>

              
                <option>
                    Both
                    
                </option>
                </Show>
            </select>
                    
<Show when={programme()==='No Programme'}>


            <input type="text" onchange={(e)=>setWorkoutName(e.currentTarget.value)}  value={myWorkout.name} class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-5" placeholder="Enter Name of Workout..">
            </input>
            </Show>
         
         <label class="block">
            Date
         </label>


            <input type="date" onChange={(e)=>setDateSelected(e.currentTarget.value)} value={dateSelected()} class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-10 ">
            </input>

                


                
            



                 
            <div class="  text-black shadow-lg mt-4 max-h-[200px] min-h-[200px] overflow-y-scroll px-3">
               <table>
                <thead>
                    <tr>
                        
           
                    <th class="px-4 py=2">
                        Name
                    </th>
                    <th class="px-4 py-2">
                        Set
                    </th>
                    <th class="px-4 py-2">
                        Reps
                    </th>
                    <th class="px-4 py-2">
                       Weight
                    </th>
                    </tr>
                </thead>

          
            <tbody>

          
               <For each={myWorkout.workout}>
                {(item,value)=><tr>
                    <td class="px-4 py-2" >
                  {item.name} 
                        </td>
                  
                  <td class="px-4 py-2">
                  <input value={item.set}  onChange={updateExercise('set',value())}  class="border w-8 h-8 text-center" type="number"/>

                    
                    </td>
                      
<td class="px-4 py-2">


                      <input value={item.weight} onChange={updateExercise('weight',value())} class="border w-8 h-8 text-center" type="number"/>
                         </td> 
                       <td class="px-4 py-2">

                
                   <input value={item.reps} onChange={updateExercise('reps',value())} class="border w-8 h-8 text-center" type="number"/>
                    </td>
                       
                      
                        <td>

                      
                        <Button class="px-4 py-2" onClick={()=>deleteItem(item.id)}>
                         Remove
                        </Button>
                        </td>


                    </tr>}
               </For>
               </tbody>
               </table>
                
                
            </div>

           





                
           
<Button>
    Submit
</Button>
</form>
</div>

          

<div class="bg-white shadow-md rounded-xl p-4">
    <h1 class="font-bold border-b text-center">
   Current Programme

    </h1>

    <Show when={myProgramsmes.length==0}>
      <h1 class="text-center">
        No items
      </h1>
    </Show>
    <Show when={myProgramsmes()}>
    <For each={myProgramsmes()}>

        
        {(item)=><div class="">
          <h2 class="font-bold">
            
           {item.programme.name}
           </h2>

           <For each={item.programme.programmeDetails}>
            {(value)=><div class="flex flex-row justify-between mb-2">
                <p>
                    {value.exercise.name}
                </p>
                <Button onClick={()=>addExercise(value.exercise)}>
                    Add
                </Button>
                </div>}
           </For>
         
           </div>}
           

    </For>

</Show>
</div>


           
        </div>
    )
}
export default CreateWorkout;