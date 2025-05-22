
import Button from "../../../button";
import { Show,For } from "solid-js";
import { useNavigate } from "@solidjs/router";
import InviteClient from "../../inviteClient";
import Modal from "../../../modal";
type ClientProps={
    myClients:any[],
    onClientName:(item:number)=>void
    searchClient:string,
    setSearchString:(item:string)=>void

}

const columns:string[]=['Client','Programme']

function ClientCreater(props:ClientProps)
{
    const navigate=useNavigate()
    return(
        <div class="flex  flex-col">
            
           
         <div class="flex flex-row justify-between">

<Modal buttonText="Invite Client" title="Invite">


     <InviteClient/>
     </Modal>
         <input value={props.searchClient} onChange={(e)=>props.setSearchString(e.currentTarget.value)}  class="shadow appearance-none border border-gray-300 rounded-xl focus:outline-none focus:ring-2 py-2 px-3 mb-2 " type="text" placeholder="search Client"/>

         </div>
            <div class="bg-white w-full">
              
            
             
           

              <table class="w-full text-gray-600">
                <thead class="bg-gray-200">
                    <tr>

                 
                
                        <For each={columns}>
                            {(item)=>
                            <th class="px-4 py-2 border font-light border-gray-300">
                                {item}
                                </th>}
                        </For>
                        
                    </tr>

                </thead>
         <tbody>
                   <For each={props.myClients}>
                    {(item)=>(
                        
                                  <tr class="hover:bg-gray-500 cursor-pointer" onClick={()=>props.onClientName(item.id)}>
                                    

                                    <td class="px-4 py-2 text-center" >
                                        {item.name}

                                    </td>
                                    <td class="px-4 py-2 text-center">
                                       <For each={item.userProgramme}>
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
                   </tbody>
                   

           
                
                </table>
          
            </div>
            
        </div>
    )

}
export default ClientCreater;