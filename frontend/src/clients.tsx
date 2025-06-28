import { createEffect, createResource, createSignal, For,Show } from "solid-js";
import {useAuth, useSignUp,useEmailLink } from "clerk-solidjs";

import { createStore } from "solid-js/store";
import { useNavigate } from "@solidjs/router";
import {programmeDetails, updateProgrammeDetails} from "./components/programmeDetails"
import ViewClient from "./viewClient";
import { useSearchParams } from "@solidjs/router";
import ClientCreater from "./components/client/clientHome";
import{AppType} from '../../src/index';
import { hc } from "hono/client";
import { mainClientType } from "../../src/routes/clients";
import { AlertDialog } from "@kobalte/core/alert-dialog";
import { AlertDialogTrigger } from "./components/ui/alert-dialog";
import Button from "./components/ui/button";
import Dialog, { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./components/ui/dialog";

import {TextField, TextFieldLabel, TextFieldRoot } from "./components/ui/textfield";

type newClient={
    name:string,
  age:number,
  email:string,

}


function Clients()
{
    const{isSignedIn}=useAuth();
    const {getToken}=useAuth();
    const{signUp}=useSignUp()

    const[emailTaken,setEmailTaken]=createSignal('');

    
    const[newClient,setNewClient]=createStore<newClient>({
        name:'',
       email:'',
       age:18
    

    })
    


    const deleteClient=async(item:number)=>{
        try{
   
            const token=await getToken();
            const data=await fetch('http://localhost:3001/api/clients/delete',{
                method:"POST",
                headers:{
                    'Authorization':`Bearer ${token}`
                },
                body:JSON.stringify({
                    id:Number(item)
                })
            })
            setOpen(false)
            refetch();
        }
        catch(error){
            console.log(error)
        }

    }
   
    const addNewClient=async(event:Event)=>{
        event?.preventDefault();
        console.log('yes')
      try{


        const token=await getToken();
        const data=await fetch('http://localhost:3001/api/client/store',{
            method:"POST",
            headers:{
                'Authorization':`Bearer ${token}`
                
            },
            body:JSON.stringify({
                name:newClient.name,
                age:newClient.age
             
            })
        })
        setOpen(false)
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
    const[open,setOpen]=createSignal(false)

    const fetchProgrammes=async()=>{
        const reponse=await fetch('http://localhost:3001/api/programme');
        return reponse.json();
    }

const showClient=(id:number)=>{
    setSearchParams({id:id})
    navigate(`/clients/view?id=${id}`)


}



 
    const[programme,setProgramme]=createResource(fetchProgrammes)
    const columns:string[]=['Client','Assigned Programme']


    createEffect(()=>{
        if(!isSignedIn()){
       navigate('/')
        }
     
      })
    return(


        

        <div class="flex  flex-col">

<Show when={myClients.loading}>
                Loading.....
                </Show>
           

<h1 class="text-3xl font-semi-bold text-gray-900 ">
                Clients 
                </h1>
                {myClients.error? "Error has occured" :""}
                <span class="font-extralight">
                    Manage Your Clients
                </span>
        
         
           
       


<Dialog open={open()} onOpenChange={setOpen}>
    <DialogTrigger class="mb-10">
        <Button>
            Add Client
        </Button>
    </DialogTrigger>
    <DialogContent class="bg-white">
        <DialogHeader>
            <DialogTitle>
                New Client
            </DialogTitle>
            <DialogDescription>
                This action will create a new client
            </DialogDescription>

           
        </DialogHeader>

        <form onSubmit={addNewClient}>

      
       <TextFieldRoot>



       <TextFieldLabel>
        Name
        </TextFieldLabel>

        <TextField value={newClient.name} onChange={(e)=>setNewClient('name',e.currentTarget.value)} type="text">

        </TextField>


        <TextFieldLabel>
           Age
        </TextFieldLabel>

        <TextField type="number" onChange={(e)=>setNewClient('age',Number(e.currentTarget.value))} value={newClient.age}>
            
        </TextField>
        </TextFieldRoot>
        <DialogFooter class="mt-10">
            <Button onClick={()=>setOpen(false)} class="mr-10">
                Cancel
            </Button>
            <Button type="submit">
                Submit
            </Button>
        </DialogFooter>
        </form>
    </DialogContent>

    </Dialog>

          <ClientCreater deleteClient={(item)=>deleteClient(item)}  setClientAge={(item)=>setNewClient('age',item)}       addNewClient={addNewClient} newClient={newClient} searchClient={search()} setSearchString={(item)=>setSearch(item)} onClientName={(index)=>showClient(index)} myClients={myClients()}>
                
                </ClientCreater>

                    
             
                </div>
         
            
  

    )

}
export default Clients;