
import Button from "../../button";
import { Show,For, onMount } from "solid-js";
import { useNavigate } from "@solidjs/router";
type ClientProps={
    myClients:any[],
    onClientName:(item:number)=>void

}

const columns:string[]=['Client','Assigned Programme']

function ClientHomePage(props:ClientProps)
{
  
    const navigate=useNavigate()
    return(
        <div class="flex  flex-col">
            
           
         <div class="flex flex-row justify-between">

     
            <input class="shadow appearance-none border border-gray-300 rounded-xl focus:outline-none focus:ring-2 py-2 px-3 mb-2 " type="text" placeholder="search Client"/>
        
         </div>
            <div class="bg-white w-full">
              
            
             
           

              <table class="w-full text-gray-600">
                <thead class="">
                    <tr class="bg-transparent hover:bg-gray-500" onClick={()=>props.onClientName(item.id)}>

                        <For each={columns}>
                            {(item)=>
                            <th class="px-4 py-2 border border-gray-300">
                                {item}
                                </th>}
                        </For>
                        
                    </tr>

                </thead>
         <tbody>
                   <For each={props.myClients}>
                    {(item)=>(
                          <For each={item.children}>
                            {(child)=>(
                                  <tr class="">

                                    <td class="px-4 py-2 text-center underline cursor-pointer" onClick={()=>props.onClientName(item.id)}>
                                        {child.name}

                                    </td>
                                    <td class="px-4 py-2 text-center">
                                       <For each={child.userProgramme}>
                                        {(value)=>
                                        <span onclick={()=>navigate('/')}>
                                            {value.programme.name}

                                        </span>
                                        }
                                        </For>

                                    </td>
                                    <td>
                               
                                    
                                    </td>
                                
                                </tr>
                            )}
                        </For>

                   )}
                   </For>
                   </tbody>
                   

           
                
                </table>
          
            </div>
            
        </div>
    )

}
export default ClientHomePage;