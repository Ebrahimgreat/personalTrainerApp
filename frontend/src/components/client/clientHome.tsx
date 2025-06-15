
import { Button } from "../ui/button";
import { Show,For, createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
import AddClient from "../client/addClient";
import Modal from "../modal";
import { Dialog,DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { setNewClient } from "../createClientForm";
import { createSign } from "crypto";


type newClient={
    name:string,
    email:string,
    password:string,
    confirmPassword:string
}
type ClientProps={
    myClients:any[],
    onClientName:(item:number)=>void
    searchClient:string,
    setSearchString:(item:string)=>void,
    newClient:newClient,
    addNewClient:()=>void,
    emailMessage:string
    setClientName:(item:string)=>void,
   setClientAge:(item:number)=>void,
   setClientEmail:(item:string)=>void,
 


}

const columns:string[]=['Client','Programme']
const[dialogOpen,setDialogOpen]=createSignal(false)

function ClientHome(props:ClientProps)
{
    const navigate=useNavigate()
    return(
        <div class="flex  flex-col">
            
           
         <div class="flex flex-row justify-between">


<Dialog onOpenChange={setDialogOpen} open={dialogOpen()} >


<DialogTrigger>
    <Button variant="outline">
      Add Client
    </Button>

</DialogTrigger>
<DialogContent class="bg-white">
    <DialogHeader>
        <DialogTitle>
            Add Client
        </DialogTitle>
    </DialogHeader>



     <AddClient setDialogOpen={(item)=>setDialogOpen(false)} setClientEmail={props.setClientEmail}  emailMessage={props.emailMessage} setClientName={props.setClientName} setClientAge={(item)=>props.setClientAge(item)}  addNewClient={props.addNewClient} client={props.newClient}  />
</DialogContent>
     </Dialog>
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
export default ClientHome;