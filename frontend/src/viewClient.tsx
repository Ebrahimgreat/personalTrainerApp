import { useLocation } from "@solidjs/router";
import { createResource,Show ,For} from "solid-js";
import Card from "./components/card";
type ViewProps={
    name:string,

}
function ViewClient(
   
    {name}:ViewProps
    

  
)


{
    const location=useLocation();
    const id=location.search.slice(4)

    const getClientDetails=async()=>{
        try{
           const data= await fetch(`http://localhost:3001/api/clients/getClient?id=${id}`,{

                method:'GET',
                
                })
                return data.json();
    
        }
        catch(error)
        {
            console.log(error)
        }
        
    }
    const [myClient]=createResource(getClientDetails)



  
    
    return(
        <div class="flex flex-col">
            <div class="flex items-center justify-center">


            
            <div class="w-[350px]   h-[350px]  mb-5">
                

                  <Show when={myClient()}>
                   <Card header={`${myClient()[0].name}`}/>
                  </Show>
               
            </div>
            </div>

     
        <div class="flex flex-row justify-between">
         

           <div class="bg-white shadow-md w-[350px] h-[350px]">
            <h2 class="font-bold text-center">
                Body Weight
                <Show when={myClient()}>
                   
                  <label class="block font-bold">
                  No items
                  </label>
                    
                </Show>
                <Show when={myClient()}>
                    <table class="w-full">
                        <thead>
                            <tr >

                          
                            <th>
                                Date
                            </th>
                            <th>
                                Scale Weight
                            </th>
                            </tr>
                        </thead>
                 
                    
                    <tbody>

                   
                  <For each={myClient()}>
                    {(item)=>(
                        <For each={item.weight}>
                            {(value)=><tr>
                                <td>
                                   {new Date(value.created_at).toLocaleDateString()}
                                </td>
                                <td>
                                  {value.scaleWeight}
                                  </td>

                                </tr>}
                                </For>

                    )}
                  </For>
                  </tbody>
                  </table>
                </Show>

            </h2>
            

            </div>
            <div class="bg-white shadow-md w-[350px]">
               <h2 class="font-bold text-center border-b">
                Volume
               </h2>
            </div>
        </div>
        </div>
    )

}
export default ViewClient;