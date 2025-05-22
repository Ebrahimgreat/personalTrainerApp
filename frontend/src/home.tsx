import { createEffect, createMemo, createResource, onCleanup } from "solid-js";
import { createSignal,Switch, Match, Show ,For} from "solid-js";
import { createStore } from "solid-js/store";
import { useNavigate } from "@solidjs/router";
import { useAuth } from "clerk-solidjs";
import { UserProfile,OrganizationProfile } from "clerk-solidjs";
import { useUser } from "clerk-solidjs";

import { ToastProvider, useToast,Toast,Toaster } from "solid-notifications";
import ClientMain from "./components/HomePage/client/clientMain";
import Button from "./components/button";
import LatestActivities from "./components/HomePage/client/creater/latestActivities";

function home()
{


    const{getToken}=useAuth();

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
    const navigate=useNavigate();



    



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
                
        
        
       
            <div class="flex flex-items-center justify-center">
                <div class="bg-white shadow-md outline-none h-[100px] w-[350px]">
                    <p class="font-bold text-sm text-center">
                        Total Clients
                
                 
                        <Show when={myValue.loading}>
                            <p>
                                Loading...
                            </p>
                        </Show>
                     <Show when={myValue()}>

         
                        <For each={myValue()}>
                            {(item)=><p>
                     <span class="font-extrabold">
                      {item.children.length}
                      </span>
                                </p>}
                        </For>
                        </Show>
                        </p>

              </div>


            </div>
            <div class="flex flex-row justify-between">

  
            <div class="bg-white shadow-md outline-none w-[350px] h-[350px]">
            <p class="border-b font-bold border-gray-300 text-center mb-1s">
                Clients
            </p>
            <ul class="list-decimal list-inside">
                <For each={myValue()}>
                    {(item)=>(
                        <For each={item.children}>
                            {(value)=>

                            <li class="text-sm text-gray-700 text-center">
                                {value.name}
                                </li>}
                                </For>

                    )}
                </For>
            </ul>
            
            
            </div>


       

</div>






            </div>


          
          
       
    )
}
export default home;