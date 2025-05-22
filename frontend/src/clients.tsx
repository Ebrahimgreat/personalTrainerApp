import { createResource, createSignal, For,Show } from "solid-js";
import { SignUp, useAuth } from "clerk-solidjs";
import Button from "./components/button";
import Modal from "./components/modal";
import { createStore } from "solid-js/store";
import { useNavigate } from "@solidjs/router";
import {programmeDetails, updateProgrammeDetails} from "./components/programmeDetails"
import ViewClient from "./viewClient";
import { useSearchParams } from "@solidjs/router";
import ClientCreater from "./components/clientPage/Manager/homePage/managerClientHome";
import { createSign } from "crypto";
function Clients()
{
    
    
    
    const[searchParams,setSearchParams]=useSearchParams();
    const[search,setSearch]=createSignal('')
    const navigate=useNavigate();
    
    const getClients=async()=>{
        const {getToken}=useAuth();
    const token=await getToken();
        const response=await fetch(`http://localhost:3001/api/clients?name=${search()}`,{
            method:'GET',
            headers:{
                'Authorization':`Bearer ${token}`
            }
        })
        return response.json();
    }


  
    const[myClients]=createResource(search,getClients);

    const fetchProgrammes=async()=>{
        const reponse=await fetch('http://localhost:3001/api/programme');
        return reponse.json();
    }

const showClient=(id:number)=>{
    setSearchParams({id:id})
    navigate(`/clients/view?id=${id}`)


}
    const viewProgramme=async(id:number)=>{
      
    }
    

    const[programme,setProgramme]=createResource(fetchProgrammes)
    const columns:string[]=['Client','Assigned Programme']
    return(


        <div class="flex  flex-col">

  
<h1 class="text-3xl font-semi-bold text-gray-900 ">
                Clients 
                </h1>
                <span class="font-extralight">
                    Manage Your Clients
                </span>
        
         
           
       
         <Show when={myClients.loading}>
                Loading.....
                </Show>



          <ClientCreater searchClient={search()} setSearchString={(item)=>setSearch(item)} onClientName={(index)=>showClient(index)} myClients={myClients()}>
                
                </ClientCreater>

                    
             
                </div>
         
            
  

    )

}
export default Clients;