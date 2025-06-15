import { createEffect, createMemo, createResource, onCleanup } from "solid-js";
import { createSignal,Switch, Match, Show ,For} from "solid-js";
import { createStore } from "solid-js/store";
import { useNavigate } from "@solidjs/router";
import { SignedOut, useAuth } from "clerk-solidjs";
import { UserProfile,OrganizationProfile } from "clerk-solidjs";

import Button from "./components/button";
import { Card, CardDescription, CardHeader, CardTitle } from "./components/ui/card";
import { useSearchParams } from "@solidjs/router";


function home()
{

    const[searchParams,setSearchParams]=useSearchParams();
   
   


    const{getToken}=useAuth();
    const{isSignedIn}=useAuth();

    async function removeWeight(item:object)
    {
        try{
            const {getToken}=useAuth();
            const token=await getToken();
            console.log(token)
            const data=await fetch('http://localhost:3001/api/weight/remove',{
                headers:{
                    'Authorization': `Bearer ${token}`
                },
                credentials:'include',
                method:'POST',
                body:JSON.stringify({
                    id:item.id

                })
            })
        }
        catch(error)
        {
            console.log(error)
        }




    }



createEffect(()=>{
    
    console.log(isSignedIn)
})

    const navigate=useNavigate();


   const navigateToClient=(id:number)=>{
    navigate(`/clients/view?=id${id}`)

   }
    



    const[count,setCount]=createSignal<number>(0);
    const increment=()=>setCount((item)=>item+1)
   


const[nutrientPage,setNutrientPage]=createSignal<number>(1);
    const [information,setInformation]=createSignal<number>(1);


    const[message,setMessage]=createSignal('')

    const clients=async()=>{
        const response=await fetch('http://localhost:3001/api/dashboard',{
            method:'GET',
        })
        return response.json();

        
    }



const fetchData=async()=>{



    
const token=await getToken()


    const response=await fetch(`http://localhost:3001/api/dashboard`,{
        method:'GET',
        headers:{
            'Authorization': `Bearer ${token}`
        }
        
    
    });
   


    
    return response.json();

}
    const [myValue]=createResource(fetchData);


 
    return(
        
      
        
      
        <div class="flex flex-col">



  
                <Show when={myValue()}>

                   <h1 class=" font-bold">
           Welcome {myValue()[0].name}
             </h1>
             <span class="font-extralight">
                Get an overview of your Clients Progress
             </span>
                </Show>


                
<div class="flex items-center justify-center">


                <Card class="bg-gray-100 border-gray-300 h-[100px] w-[350px] mb-10">
                  <CardHeader class="p-4 space-y-2">

  
                    <CardTitle class="text-lg text-center">
                        Total Clients

                    </CardTitle>
                    <CardDescription>
                        <Show when={myValue()}>
                            <For each={myValue()}>
                                {(item)=><p class="text-center">
                                    {item.children.length}</p>}
                            </For>
                        </Show>
                    </CardDescription>
                    </CardHeader>
                </Card>
        </div>
        
       
          

          <Card class="shadow-md w-full border-gray-300 h-[350px] overflow-auto">
            <CardHeader>
                <CardTitle class="text-lg text-center">
Total Clients
                </CardTitle>
                <ul class="list-decimal">

    
                <CardDescription>
                    <Show when={myValue()}>
                        <For each={myValue()}>
                            {(item)=>(
                                <For each={item.children}>
                                    {(child)=>(
                                        <li onclick={()=>navigateToClient(child.id)} class="text-sm hover:bg-gray-200 cursor-pointer text-gray-700 text-center">
                                            {child.name}

                                        </li>

                                    )}
                                    </For>
                                    
                                
                            )}
                           
                        </For>
                    </Show>
                </CardDescription>
                </ul>

            </CardHeader>
          </Card>
         

       








            </div>


          
          
       
    )
}
export default home;