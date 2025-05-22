import { For,createResource,Show,createSignal} from "solid-js";
import { createStore } from "solid-js/store";
import Table from "./components/table";
import Modal from "./components/modal";
import Button from "./components/button";
import { programmeDetails,setProgrammeDetails,updateProgrammeDetails } from "./components/programmeDetails";
import { useNavigate } from "@solidjs/router";
import { useSearchParams } from "@solidjs/router";
import ClientProgramme from "./components/clientNewProgramme";
import { useAuth } from "clerk-solidjs";
function Programme()

{

    const {getToken}=useAuth();
    const[searchParams,setSearchParams]=useSearchParams();
    const navigate=useNavigate();
    const[exercise,setExercise]=createSignal('')

    const options:string[]=['1-3','3-6','6-9','9-12','12-15','15+']
    const getExercises=async()=>{
        const response=await fetch(`http://localhost:3001/api/exercise?name=${exercise()}`,{
            method:'GET'
        })
        return response.json();
    }


    const lists:string[]=['name','Clients Enrolled','']
    const fetchData=async()=>{

        const token=await getToken();
        
        const response=await fetch('http://localhost:3001/api/programme',{
            method:"GET",
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        return response.json();
    }

    function addExercise()
    {
        setNewProgramme('exercise',((current)=>[
            ...current,{
                name:'Bench Press',
                repRange:''
            }
            

        ]))

    }





   


 const[myProgrammes]=createResource(fetchData)

 const[exercises]=createResource(exercise,getExercises)
 const [newProgramme,setNewProgramme]=createStore<programme>({
    name:'',
    description:'',
    exercise:[]

 })


 const [searchClientSignal,setSearchClientSignal]=createSignal('Ebrahim')
 const searchClient=async()=>{
    const data=await fetch(`http://localhost:3001/api/programme/client?name=${searchClientSignal()}`,{
        method:'GET'
    })
    return data.json();

 }
 const[client]=createResource(searchClientSignal,searchClient)


 const  viewProgramme=(id:number)=>{
    
    navigate(`/programme/view?id=${id}`)


 }



const updateExerciseName=(value:string,key:number)=>{
    console.log(value)

    setNewProgramme('exercise',key,(current)=>({
        ...current,
        name:value
    }))
    console.log(newProgramme)
}
const updateRepRange=(key:number)=>(event:Event)=>{
    const inputElement=event.currentTarget as HTMLInputElement;
  
    setNewProgramme('exercise',key,(current)=>({
        ...current,
        repRange:inputElement.value

}))
console.log(newProgramme.exercise)
}



     return(
    
    <div>



<h1 class="text-3xl font-semi-bold text-gray-900 ">
               Programmes
                </h1>
                <span class="font-extralight">
                 Organize Your Programmes
                </span>
        
        <div class="flex flex-row justify-between">


        <Button class="btn" onClick={()=>navigate('/programme/create')}>
            New Programme
        </Button>
       
        
        <input type="text" class="shadow-appearance-none border border-gray-300 rounded-xl focus:ouline-none focus:ring-2 py-2 px-3 mb-2" placeholder="search Programme">
        </input>
</div>
   

       <For each={programmeDetails.exercise}>
        {(item)=><p>
            {item.name}</p>}

       </For>
     <Show when={myProgrammes()}>
        

        <For each={myProgrammes()}>
            {(item)=><div onclick={()=>viewProgramme(item.id)} class="bg-white shadow-md mb-10 rounded-xl p-4 hover:shadow-lg transition cursor-pointer">
                <h1 class="font-bold text-2xl">
               {item.name}
               </h1>
               <p class="text-gray-800 text-sm">
                {item.description}
               </p>
                <For each={item.programmeWorkout}>
                    {(workout)=><span class="block text-sm text-center">
                        {workout.name}</span>}
                </For>
                </div>}
        </For>
       



        
       
     </Show>
    </div>
)

}
export default Programme;