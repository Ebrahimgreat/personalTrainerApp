import { createResource, For,Show } from "solid-js";
import { SignUp, useAuth } from "clerk-solidjs";
import Button from "./components/button";
import Modal from "./components/modal";
import { createStore } from "solid-js/store";
import { useNavigate } from "@solidjs/router";
import {programmeDetails, updateProgrammeDetails} from "./components/programmeDetails"
import ViewClient from "./viewClient";
import { useSearchParams } from "@solidjs/router";
import Card from "./components/card";
import HomeClient from "./components/clients/client/homeClient";
import { RoleContextProvider } from "./components/RoleContext";
import { useRoleContext } from "./components/RoleContext";
import ClientCreater from "./components/clients/Creater/creater";
function Clients()
{
    const role=useRoleContext();
    
    
    const[searchParams,setSearchParams]=useSearchParams();
    const navigate=useNavigate();
    
    const getClients=async()=>{
        const {getToken}=useAuth();
    const token=await getToken();
        const response=await fetch('http://localhost:3001/api/clients',{
            method:'GET',
            headers:{
                'Authorization':`Bearer ${token}`
            }
        })
        return response.json();
    }


  
    const[myClients]=createResource(getClients);

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

  
            
           
       
         <Show when={myClients.loading}>
                Loading.....
                </Show>

<Show when={role.role()==='admin'}>


          <ClientCreater onClientName={(index)=>showClient(index)} myClients={myClients()}>
                
                </ClientCreater>
                </Show>
                <Show when={role.role()==='client'}>
                     <HomeClient onClientName={(index)=>showClient(index)} myClients={myClients()}>
                
                </HomeClient>
                    
                </Show>
                </div>
         
            
  

    )

}
export default Clients;