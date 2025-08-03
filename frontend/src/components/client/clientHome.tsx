
import { Button } from "../ui/button";
import { Show,For, createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
import AddClient from "../client/addClient";
import Modal from "../modal";
import { Dialog,DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Pagination,PaginationEllipsis } from "../ui/ui/pagination";
import { AlertDialog, AlertDialogAction, AlertDialogClose, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";


type ClientProps={
    myClients:any[],
    incrementPage:()=>void,
    decrementPage:()=>void

}

const columns:string[]=['Action',  'Client']
const[dialogOpen,setDialogOpen]=createSignal(false)

function ClientHome(props:ClientProps)
{
    const navigate=useNavigate()
    return(
        <div class="flex  flex-col">
            
           
         <div class="flex flex-row justify-between">





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
                        
                                  <tr class="hover:bg-gray-500 cursor-pointer">

                                    <td class="px-4 py-2 text-center ">
                                      <AlertDialog>
                                        <AlertDialogTrigger>
                                            <Button>
                                                Delete
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent class="bg-white">

                           
                                        <AlertDialogHeader>
                                        <AlertDialogTitle>

                              
                                                Delete Client
                                                </AlertDialogTitle>
                                  
                                            <AlertDialogDescription>

                                                This action will delete the client including all of their associated data.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                             
                                        <AlertDialogClose>
                                            Cancel

                                        </AlertDialogClose>
                                        <AlertDialogAction onclick={()=>props.deleteClient(item.id)}>
                                            Continue

                                        </AlertDialogAction>
                                        </AlertDialogContent>

                                        </AlertDialog>
                                    </td>
                                  
                                    

                                    <td class="px-4 py-2 text-center"  onClick={()=>props.onClientName(item.id)} >
                                        {item.name}

                                    </td>
                                   
                       
                                
                                </tr>

               

                   )}
                   </For>
                   </tbody>
                   

           
                
                </table>
               
            
            </div>
          
          <div class="flex flex-row justify-between">
            <Button onclick={()=>props.decrementPage()}>
                Previous

            </Button>
            <Button onclick={()=>props.incrementPage()}>
                Next

            </Button>
          </div>
           

            
        </div>
    )

}
export default ClientHome;