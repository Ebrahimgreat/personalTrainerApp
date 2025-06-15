import { createEffect, createResource, createSignal, For,Show } from "solid-js";
import {useAuth, useSignUp,useEmailLink } from "clerk-solidjs";

import { createStore } from "solid-js/store";
import { useNavigate } from "@solidjs/router";
import {programmeDetails, updateProgrammeDetails} from "./components/programmeDetails"
import ViewClient from "./viewClient";
import { useSearchParams } from "@solidjs/router";
import ClientCreater from "./components/client/clientHome";



type newClient={
    name:string,
  age:number,
  email:string,

}


function Clients()
{
    const {getToken}=useAuth();
    const{signUp}=useSignUp()

    
    const[emailTaken,setEmailTaken]=createSignal('');
    const[passwordValidation,setPasswordValidation]=createSignal(0);
    
    const[newClient,setNewClient]=createStore<newClient>({
        name:'',
       email:'',
       age:18
    

    })
    

    const verifyEmail=async()=>{
        try{
            const token=await getToken();
            const data=await fetch('http://localhost:3001/api/email-check',{
                method:'POST',
                body:JSON.stringify({
                    email:newClient.email
                })
            })
            const result=await data.json();
            if(result==='User Exists'){
                console.log("YES SIR")
               setEmailTaken('Email Already Taken')

            }
            else{
                setEmailTaken('')
            }
        }
        catch(error){
            console.log(error)
        }
    }

    const addNewClient=async()=>{
        console.log('yes')
      try{

        verifyEmail();
        if(emailTaken()==='Email Already Taken')
        {
            console.log("YES SIR")
            return;
        }

        const token=await getToken();
        const data=await fetch('http://localhost:3001/api/client/store',{
            method:"POST",
            headers:{
                'Authorization':`Bearer ${token}`
                
            },
            body:JSON.stringify({
                name:newClient.name,
                age:newClient.age,
                email:newClient.email,
                password:newClient.password,
                confirmPassword:newClient.confirmPassword
             
            })
        })
        refetch();
      }
      catch(error){
        console.log(error)
      }
    }




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


  
    const[myClients,{refetch}]=createResource(search,getClients);

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
    
    createEffect(()=>{
        console.log("Password",newClient.confirmPassword)
    })

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



          <ClientCreater setClientEmail={(item)=>setNewClient('email',item)}    emailMessage={emailTaken()} setClientName={(item)=>setNewClient('name',item)} setClientAge={(item)=>setNewClient('age',item)}       addNewClient={addNewClient} newClient={newClient} searchClient={search()} setSearchString={(item)=>setSearch(item)} onClientName={(index)=>showClient(index)} myClients={myClients()}>
                
                </ClientCreater>

                    
             
                </div>
         
            
  

    )

}
export default Clients;