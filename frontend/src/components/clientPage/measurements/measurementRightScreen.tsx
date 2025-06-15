

import { Show,For, createSignal } from "solid-js"
import { AlertDialogTrigger,AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter } from "../../ui/alert-dialog"
import Button from "../../ui/button"
import Card, { CardTitle,CardHeader,CardDescription } from "../../ui/card"
import {Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../../ui/dialog"
type Measurement={
    id:number,
    created_at:string,
    value:number,
    trend?:number
}

type props={
    name:string,
    measurement:Measurement[]
    
    

}

const[editMeasurement,setEditMeasurement]=createSignal('')


function MeasurementScreen(props:props)
{
  
    return(<div class="bg-white shadow-xl">
     <h1 class="text-center font-bold text-2xl text-gray-800 mb-6">
        {props?.name ?? ""}
        </h1>
        <Show when={props.measurement.length==0}>
            <p class="text-center text-gray-500">
              No measurements Found
              </p>
        </Show>


       
        <Show when={props.measurement.length}>
            <For each={props.measurement}>
                {(item)=><div class="flex flex-row justify-between items-center bg-gray-100 p-4">

               <Dialog>
                <form>
                    <DialogTrigger>
                        <Button variant="outline">
                            Edit
                        </Button>
                    </DialogTrigger>
                    <DialogContent class="sm:max-w-[425px] bg-white">
                        <DialogHeader>
                            <DialogTitle>
                                Edit Measurement
                            </DialogTitle>
                            <DialogDescription>
                                Make changes
                            </DialogDescription>
                        </DialogHeader>
                        <div class="grid gap-4">
                            <div class="grid gap-3">
                                <label>
                                   Date
                                </label>
                                <input type="date">
                                </input>
                                <label>
                                   Value
                                </label>
                                <input type="number" class="border">
                                </input>

                               
                            </div>
                        </div>
                        <DialogFooter>
                           
                            <Button>
                                Delete
                            </Button>
                            <Button>
                               Edit
                            </Button>
                        </DialogFooter>



                    </DialogContent>
                </form>
               </Dialog>
 
                   
                    <p class="text-sm text-gray-500">
                        {new Date(item.created_at).toLocaleDateString()}
                    </p>
                   <p class="text-lg font-semibold text-gray-700">
                   {item.value}
                   </p>
                  <Show when={item.trend}>

           
                    <span>
                        Trend
                    </span>
         
                   <p class="text-lg font-semibold">
                    {item.trend}
                   </p>
</Show>             

                   </div>}
            </For>
        </Show>
    </div>)

}
export default MeasurementScreen;