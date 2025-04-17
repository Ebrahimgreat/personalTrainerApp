import { Location, useLocation } from "@solidjs/router";
import { createResource,Show,For } from "solid-js";
import { createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import Button from "./components/button";
import Modal from "./components/modal";
import { exercise } from "./components/CreateExerciseForm";
import CreateNewProgramme from "./components/programmeComponent/createNewProgramme";

type programmeDetailsType={
    name:''
   workout:[];

}
function ViewProgramme(){
    const location=useLocation()
    const[id,setId]=createSignal(location.search.slice(4))
    const getProgramme=async()=>{
        const data=await fetch(`http://localhost:3001/api/programme/details?id=${id()}`,{
            method:'GET'
        })
        return data.json();
    }
   

    
    const[programmeDetails]=createResource(getProgramme)
    const[edit,setEdit]=createSignal(false)
    const[workoutSelected,setWorkoutSelected]=createSignal('')
    const[myDetails,setMyDetails]=createStore<programmeDetailsType>({
        name:'',
        workout:[]
        

    })
    

    const addExercise=async(text:string)=>{
        console.log(myDetails.name)
       if(myDetails.name===text){
        return;
       }
      setMyDetails('name',text)
      setMyDetails('workout',[])
      

     const filteredArray=programmeDetails().flatMap((item)=>item.programmeWorkout.filter((value)=>value.name===text).flatMap((value1)=>value1.programmeDetails))
 

     for(let i=0; i<filteredArray.length; i++)
 {
    console.log(filteredArray[i])
    setMyDetails('workout',(current)=>[
        ...current,{
            repRange:filteredArray[i].repRange,
            exercise:filteredArray[i].exercise.name,
            sets:filteredArray[i].sets

        }
    ])
  
 }


 }

    
 const updateProgramme=(fieldName:string,key:number)=>(event:Event)=>{
    const inputElement=event.currentTarget as HTMLInputElement;
    console.log(inputElement.value)
    setMyDetails('workout',key,(current)=>({
        ...current,
            [fieldName]:inputElement.value

        
    }))
    console.log(myDetails.workout)

 
    

    }


    return(
        <div class="grid grid-cols-3 gap-x-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            
     


            <div class="bg-white shadow-md min-h-[500px] max-h-[500px]">
            <div class="flex items-center justify-center">
                
                </div>
              <h1 class="text-center font-bold border-b">
           <Show when={programmeDetails()}>
            {programmeDetails()[0].name}
           </Show>
                </h1>
               
                

                <Show when={programmeDetails()}>
                  
          <ul class="">
                 <For each={programmeDetails()}>

                    {(item)=>
                    <For each={(item.programmeWorkout)}>
                        {(value)=><li class="font-bold text-center mb-4">
                            
                                <span onClick={()=>addExercise(value.name)} class={`cursor-pointer px-2 ${myDetails.name===value.name?'bg-blue-500 text-white': 'hover:bg-gray-200'}`}>
                                    {value.name}
                                    </span>
                           
                   </li>

}
                        </For>
                           
}
                        </For>
                  
                     </ul>
                    
                </Show>
     

              
                </div>
                <Show when={programmeDetails()}>
                
                <CreateNewProgramme description={programmeDetails()[0].description} headingText="View Programme" name={programmeDetails()[0].name}/>
                </Show>
               

                <div class="bg-white shadow-md ">
                  
                <h1 class="text-center font-bold border-b">
         Exercise for {myDetails.name}
                </h1>
                <table class="w-full">
                    <thead>
                        <tr>
                           <th class="px-4 py-2">
                             Exercise
                             </th>
                             <th class="px-4 py-2">
                             Rep Range
                             </th>
                             <th class="px-4 py-2">
                                Sets
                             </th>
                        </tr>
                    </thead>
                    <tbody>

        
       
                <For each={myDetails.workout}>
                    {(item,key)=><tr>
                        <td class="px-4 py-2">
                        <input disabled={!edit()} class={`${!edit()?'cursor-not-allowed': ''} w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`} value={item.exercise}
                        >

</input>
                        </td>
                        <td class="px-4 py-2">
                        <input type="text" disabled={!edit()} onchange={updateProgramme('repRange',key())} class={`${!edit()?'cursor-not-allowed': ''} w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`} value={item.repRange}
                        />
                    
                        </td>
                        <td class="px-4 py-2">
                        <input disabled={!edit()} class={`${!edit()?'cursor-not-allowed': ''} w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`} value={item.sets}
                        />
                        </td>
                        </tr>
                        }
                        </For>
                        </tbody>
                        </table>
                   
                   <Show when={myDetails.workout.length>0}>
                    <Button onClick={()=>setEdit(true)}>
                        Edit
                    </Button>
                   </Show>
                   <div class="flex flex-row justify-between mt-5">

                  
                   <Show when={edit()}>
                    <Button onClick={()=>setEdit(false)}>
                        Cancel
                    </Button>
                    <Button onClick={()=>alert('Programme Updated')}>
                        Update
                    </Button>
                   </Show>
                   </div>
             

        

        </div>


        </div>

    )

}
export default ViewProgramme;