import { For,createResource,Show,createSignal} from "solid-js";

import Button from "./components/ui/button";
import { programmeDetails,setProgrammeDetails,updateProgrammeDetails } from "./components/programmeDetails";
import { useNavigate } from "@solidjs/router";
import { useSearchParams } from "@solidjs/router";
import { useAuth } from "clerk-solidjs";
import { Badge } from "./components/ui/ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogClose, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTrigger } from "./components/ui/alert-dialog";
import { createEffect } from "solid-js";
import { useQuery } from "@tanstack/solid-query";
import { useQueryClient } from "@tanstack/solid-query";

function Programme()

{
    const queryClient=useQueryClient();


    const {getToken,isSignedIn}=useAuth();

    const[addNewProgrammeIndicator,setAddingNewIndicator]=createSignal(false)
    const[deletingNewProgrammeIndicator,setDeletingNewProgrammeIndicator]=createSignal(false)
    const[searchParams,setSearchParams]=useSearchParams();
    
    const navigate=useNavigate();
    const[exercise,setExercise]=createSignal('')

    const fetchData=async()=>{

        const token=await getToken();
        
        const response=await fetch(`${import.meta.env.VITE_API_URL}/api/programme?page=${page()}`,{
            method:"GET",
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        return response.json();
    }


    const storeProgramme=async()=>{
        
        const token=await getToken();
        try{
        const response=await fetch(`${import.meta.env.VITE_API_URL}/api/programme/store`,{
            method:"POST",
            headers:{
                'Authorization':`Bearer ${token}`
            }
        })
        const data=await response.json();
        setAddingNewIndicator(true)
        await new Promise((resolve)=>setTimeout(resolve,800));
        setAddingNewIndicator(false)
       navigate(`/programme/view?id=${data[0].id}`)
    }
    catch(error){
        console.log(error)
    }
}

const deleteProgramme=async(item:number)=>{
 
    const token=await getToken();
   const data=await fetch(`${import.meta.env.VITE_API_URL}/api/programme/delete`,{
    method:'POST',
    headers:{
        'Authorization':`Bearer ${token}`
    },
    body:JSON.stringify({
        id:Number(item)
    })
   })
   setDeletingNewProgrammeIndicator(true)
   await new Promise((resolve)=>setTimeout(resolve,800));

setDeletingNewProgrammeIndicator(false)
   
queryClient.invalidateQueries({"queryKey":["programme"]})

}



   


 

 
 const[page,setPage]=createSignal<number>(1)

 const myProgrammes=useQuery(()=>({
    queryKey:['programme',page()],
    queryFn:fetchData
 }))
 const incrementPage=async()=>{
    if(page()==myProgrammes.data.totalPages){
        return;
    }
    
    const item=page()+1
    setPage(item)
 }
 const decrementPage=async()=>{
    if(page()==1){
        return;
    }
    const item=page()-1;
    setPage(item)
 }

 const  viewProgramme=(id:number)=>{
    
    navigate(`/programme/view?id=${id}`)


 }




   createEffect(()=>{
         if(!isSignedIn()){
        navigate('/')
         }
      
       })


     return(
    
    <div>

      



<h1 class="text-3xl font-semi-bold text-gray-900 ">
               Programmes
          


                </h1>

                <Show
  when={myProgrammes.isLoading}>


    <div class="flex justify-center items-center p-4">
      <svg class="size-6 text-gray-500 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none"
        viewBox="0 0 24 24" stroke="currentColor">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z" />
      </svg>
      <span>Loading</span>
    </div>
    </Show>
    





                <div class="flex flex-row justify-between">
                <span class="font-extralight">
                 Organize Your Programmes
                </span>

                  <Show when={addNewProgrammeIndicator() || deletingNewProgrammeIndicator()}>
                
                    
                            <Badge class="bg-blue-50 text-blue-600 border border-blue-100 animate-pulse">
                {addNewProgrammeIndicator()? "Creating New Programme" :"Deleting Programme"}
                </Badge>
                
                </Show>

                </div>



        
        <div class="flex flex-row justify-between">


        <Button  type="button" onclick={storeProgramme}  variant="outline">
            New Programme
        </Button>
       
       
</div>
   
   <Show when={myProgrammes.data && myProgrammes.data.programme.length==0}>
    No Programmes
   </Show>

     <Show when={myProgrammes.data && myProgrammes.data.programme.length>0}>
        

        <For each={myProgrammes.data.programme}>
            {(item)=><div  class="bg-white shadow-md mb-10 rounded-xl p-4 hover:shadow-lg transition ">
                <h1 class="font-bold text-2xl cursor-pointer" onClick={()=>viewProgramme(item.id)}>
               {item.name}
               </h1>
              
              <div class="flex flex-row justify-between">

            
               <p class="text-gray-800 text-sm">
                {item.description}
               </p>
               <AlertDialog>
                <AlertDialogTrigger>
                    <Button>
                        Delete
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent class="bg-white">
                   <AlertDialogHeader>
                    Delete Programme
                    </AlertDialogHeader>
                    <AlertDialogDescription>
                    This will permanently delete the entire programme, including all associated templates and exercises. This action cannot be undone. Please proceed with caution.                    </AlertDialogDescription>
               <AlertDialogClose>
                Cancel

               </AlertDialogClose>
               <AlertDialogAction onclick={()=>deleteProgramme(item.id)}>
                Continue
               </AlertDialogAction>
               
                </AlertDialogContent>
               </AlertDialog>
               </div>
                <For each={item.programmeWorkout}>
                    {(workout)=><span class="block text-sm text-center">
                        {workout.name}</span>}
                </For>
                </div>}
        </For>
       

    <div class="flex flex-row justify-between">


       <Button onclick={()=>decrementPage()}>
        Previous
       </Button>
       <Button onclick={()=>incrementPage()}>
        Next
       </Button>
</div>
        
       
     </Show>
     
    
    </div>
)

}
export default Programme;