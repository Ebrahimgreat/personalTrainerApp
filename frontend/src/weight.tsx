import { createResource,Show,For,createSignal,createEffect } from "solid-js";
import { createStore } from "solid-js/store";
import Button from "./components/button";
import{weights,setWeights,submitForm,updateWeightField} from "./weightForm";
import { useNavigate } from "@solidjs/router";
import Modal from "./components/modal";
import CreateWeight from "./createWeight";
import { useAuth } from "clerk-solidjs";


function Weight()
{
    const{getToken}=useAuth();
    

     async function hello()
    {
        console.log('hi')
  
       const token=await getToken();
       console.log(token)
    }

    const navigate=useNavigate();
    





    const fields:string[]=['Date','Scale Weight','trendWeight','Action']
    const keys:string[]=['created_at','scaleWeight','trendWeight']

    const fetchData=async(page)=>{
        const{getToken}=useAuth();
        const token=await getToken();
        if(!token){
            return
        }
      
        console.log('fetching data')
        const response=await fetch(`http://localhost:3001/api/weight?page=${page}`,{
            method:'GET',
            headers:{
                'Authorization':`Bearer ${token}`
            }
        })
        return response.json();
    }
    



    async function removeData(item:object)
{
    try{
        const isConfirmed=window.confirm('Are you sre you want to remove this record')
        if(isConfirmed)
        {

        
    
        
   const response=await fetch('http://localhost:3001/api/weight/remove',{
    method:'POST',
    body: JSON.stringify({
       id:item.id

    })
   })
 

    refetch()
}
else {
    return;
}
}
catch(error)
{
    console.log(error)
}
}

async function handleSubmit(event:Event)
{
    const{getToken}=useAuth();
    const token=await getToken();
    console.log("Token",token)
    event.preventDefault();
    submitForm(token)


}
    

    

   
    const[scaleWeight,setScaleWeight]=createSignal<number>(0);
    const[date,setDate]=createSignal<string>('');
    const [page,setPage]=createSignal<number>(1)
  

   


    const [myValue,{refetch}]=createResource(page,fetchData)


    createEffect(()=>{
        console.log('page changin',page());
    })

   
    return(
        
        
        <div>

<div class="flex items-center justify-center">


<Modal buttonText="Add">

  <CreateWeight/>
    
</Modal>



             </div>

        
      

           <Show when={myValue()}>

           
            


         

           <div class="  overflow-y-auto h-[200px] sm-h-[300px] md:h-[400px] lg:h-[500px]">
           <div class="overflow-x-auto w-full">
            <table class="border-gray-300 w-full">
                <thead class="bg-pink-500 text-white">
                    <tr>
                        <th class="border border-gray-300 px-4 py-2">
                         Date
                        </th>
                        <th class="border border-gray-300 px-4 py-2">
                            Scale Weight
                        </th>
                        <th class="border border-gray-300 px-4 py-2">
                            Trend Weight
                        </th>
                        <th class="px-4 py-2">
                            Action
                        </th>
                    </tr>
                </thead>
                

         <tbody>
     
          <For each={myValue()}>
            
            {(item)=><tr>
               
               <td class="border border-gray-300 px-4 py-2">
               {new Date(item.created_at).toLocaleDateString()}
               </td>
                <td class="border border-gray-300 px-4 py-2">{item.scaleWeight}</td>
                <td class="border border-gray-300 px-4 py-2">{item.trendWeight}</td>
                <td class="border border-gray-300 px-4 py-2">
                    <Button  onClick={()=>removeData(item)}>
                     Remove Weight
                     </Button>
                </td>

                </tr>}
              
                </For>
           
                </tbody>
              
                </table>
                </div>
                </div>

                {myValue().length==0?'No weights on this page': `Showing Results of page${page()}`}

           </Show>



  


              <div class="flex flex-row gap-x-3 overflow-x-auto">

              <Button onClick={()=>setPage(1)}>
                    1
                </Button>
                <Button onClick={()=>setPage(2)}>
                    2
                </Button>
                <Button onClick={()=>setPage(3)} >
                    3
                </Button>
                <Button onClick={()=>setPage(4)}>
                    4
                </Button>
              
              </div>
              
        </div>
        

    );

}
export default Weight;
