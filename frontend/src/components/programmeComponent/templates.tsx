type template={
    id:number,
    name:string
}
type props={
    template:template[],
    onClick:(item:number)=>void,
    templateName:string,
    setTemplateName:(item:string)=>void,
    addNewTemplate:()=>void,
    deleteTemplate:(item:number)=>void,
}

import { createSignal } from "solid-js";
import { For } from "solid-js";
import { Show } from "solid-js";
import {Dialog,DialogContent,DialogHeader,DialogTitle,DialogTrigger} from "../ui/dialog";
import Button from "../ui/button";
const[templateName,setTemplateName]=createSignal('')
import { TextFieldDescription,TextField,TextFieldRoot, TextFieldLabel } from "../ui/textfield";
import { AlertDialog, AlertDialogAction, AlertDialogClose, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { createSign } from "crypto";
import { useAuth } from "clerk-solidjs";



function Templates(props:props)
{
    const{getToken}=useAuth();

    const submitTemplate=async()=>{
        const auth=getToken();

        
    }
    
    return(
      <div class="bg-white shoadow-md">
        <h1 class="font-bold">
            Templates
        </h1>
      <AlertDialog>
        <AlertDialogTrigger>
           <Button variant="default">
            Add Template
            </Button>
        </AlertDialogTrigger>
        <AlertDialogContent class="bg-white">
            <AlertDialogHeader>

       
          <AlertDialogTitle>
            Are You sure You want to add a new template?
            </AlertDialogTitle>
            <AlertDialogDescription>
                This will add a new template. Once it is done you can add exercises in this template
            </AlertDialogDescription>
            </AlertDialogHeader>

            <TextFieldRoot>

<TextFieldLabel>
    Name 
</TextFieldLabel>
        <TextField value={props.templateName} onChange={(e)=>props.setTemplateName(e.currentTarget.value)}>
        
        </TextField>
        </TextFieldRoot>
            <AlertDialogClose>
            Cancel
        </AlertDialogClose>
        <AlertDialogAction onClick={()=>props.addNewTemplate()}>
            Continue
        </AlertDialogAction>

        </AlertDialogContent>
       
        </AlertDialog>
        <ul>

        <Show when={props.template.length>0}>


       <For each={props.template}>
        {(item)=><div class="flex flex-row justify-between">
        <li onClick={()=>props.onClick(item.id)} class="px-4 py-2 mr-1 cursor-pointer mb-5">
            {item.name}
            </li>
            <span>
              <AlertDialog>
                <AlertDialogTrigger>
                    <Button>
                        Delete
                    </Button>
                    <AlertDialogContent class="bg-white">
                    <AlertDialogHeader>
                        Are you sure you want to delete this?
                    </AlertDialogHeader>
                    <AlertDialogDescription>
                        This will delete the given template. All data will be lost
                    </AlertDialogDescription>
                    <AlertDialogClose>
                        Cancel

                    </AlertDialogClose>
                    <AlertDialogAction onclick={()=>props.deleteTemplate(item.id)}>
                        Continue
                    </AlertDialogAction>
                    </AlertDialogContent>
                </AlertDialogTrigger>
                </AlertDialog>
            </span>
            </div>}

       </For>
       </Show>
        
      </ul>
      </div>
    )

}
export default Templates;