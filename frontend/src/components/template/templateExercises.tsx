

import { For, Show } from "solid-js"
type Details={
    id:number,
    repRange:string,
    sets:string,
    exercise:Exercise

}
type Exercise={
    id:number
    name:string,
    type:string,
    equipment:string
    
}
const repRange=["1-3","3-6","6-9","9-12","12-15","15+"]

type props={
    detail:Details[],
    onDelete:(item:object)=>void,
   onChange:(key:number,field:string,value:number)=>void,
}
import Card, { CardContent, CardHeader, CardTitle } from "../ui/card"

import { TextField,TextFieldLabel,TextFieldRoot } from "../ui/textfield"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/ui/dropdown-menu"
import Button from "../ui/button"

import {AlertDialog, AlertDialogContent, AlertDialogTrigger } from "../ui/alert-dialog"
import { Select, SelectTrigger, SelectValue } from "../ui/ui/select"

function TemplateExercises(props:props)
{
    return<Card>
    <CardHeader>
        <CardTitle>
            Exercises
            
        </CardTitle>

    </CardHeader>
    <CardContent class="h-[400px] overflow-y-auto">
        <Show when={props.detail.length>0}>


        <For each={props.detail}>
            {(item,key)=>(
                <div class="text-black shadow-md p-8 grid grid-cols-3">
                 
        <AlertDialog>
            <AlertDialogTrigger>
            <Button onClick={()=>props.onDelete(item)}>
               Delete
            </Button>
           
            </AlertDialogTrigger>
            </AlertDialog>
                 <TextFieldRoot>
                    <div class="flex flex-col">
                    {item.exercise.name}
                    </div>
                    <div class="flex flex-col">

                    <TextFieldLabel>
                       Sets
                    </TextFieldLabel>
                    <TextField onChange={(e)=>props.onChange(key(),"sets",Number(e.currentTarget.value))}  value={item.sets} type="number">
                        
                    </TextField>
                    </div>
                    <div class="flex flex-col">

               <select onChange={(e)=>props.onChange(key(),"repRange",e.currentTarget.value)} value={item.repRange}>
                <For each={repRange}>
                    {(item)=><option>
                        {item}</option>}
                </For>
               </select>
                    </div>

                   
                    </TextFieldRoot>
                    
                </div>
            )}
        </For>
        </Show>
        <Show when={props.detail.length==0}>
           No exercises
        </Show>
        
    </CardContent>
       

    </Card>
}
export default TemplateExercises;