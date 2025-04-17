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


        
        <Button onClick={()=>navigate('/programme/create')}>
            New Programme
        </Button>



       <For each={programmeDetails.exercise}>
        {(item)=><p>
            {item.name}</p>}

       </For>
     <Show when={myProgrammes()}>
        <table class="w-full text-gray-600">

   <thead class="">
     <tr>
        <For each={lists}>
            {(item)=>
          
            <th class="border px-4 py-2 font-bold border-gray-300">
                {item}

            </th>
      

            }
        </For>
        </tr>
   

        </thead>
        <tbody>
            <For each={myProgrammes()}>
                {(item)=><tr>
                    <td class="px-4 py-2 underline cursor-pointer">
                        <span onclick={()=>viewProgramme(item.id)}>
                        {item.name}
                            </span>
                        </td>
                        <td class="px-4 py-2 text-center">
                            {item.userProgramme.length}
                          
                        </td>
                        <td  class="px-4 py-2 text-center">
                           
                            
                            <Modal buttonText="Add new Client">

                             <ClientProgramme results={client()} value={searchClientSignal()} onUpdate={setSearchClientSignal}/>
                               
                            </Modal>
                        </td>
                        
                       
                       
                          
                       
                        </tr>}
            </For>
        </tbody>
        </table>
        
       
     </Show>
    </div>
)

}
export default Programme;