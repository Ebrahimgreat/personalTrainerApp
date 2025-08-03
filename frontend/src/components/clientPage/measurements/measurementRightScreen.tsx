

import { Show,For, createSignal } from "solid-js"
import { AlertDialogTrigger,AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter } from "../../ui/alert-dialog"
import Button from "../../ui/button"
import Card, { CardTitle,CardHeader,CardDescription } from "../../ui/card"
import {Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../../ui/dialog"




type Measurement={
    measurement_id:number,
   name:string
   measurement:MeasurementArray[]
}
type MeasurementArray={
    created_at:string,
    id:number,
    value:number
}

type props={
    measurement:Measurement,
    updateMeasurement:(key:number,fieldName:string,value:string,id:number)=>void,
    deleteMeasurement:(item:number)=>void

    
    

}




function MeasurementScreen(props:props)
{
  
    return(<div class="bg-white shadow-xl">
     <h1 class="text-center font-bold text-2xl text-gray-800 mb-6">
        {props.measurement.name}
        </h1>

        <Show when={props.measurement.measurement.length==0}>
           <h2 class="text-center text-gray-600">
           No measurements can be found
           </h2>
        </Show>
        

       
        <Show when={props.measurement?.measurement.length>0}>
            <For each={props.measurement.measurement}>
                {(item,key)=><div class="flex flex-row justify-between items-center bg-gray-100 p-4">

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
                                <input onChange={(e)=>props.updateMeasurement(key(),'created_at',e.currentTarget.value,item.id)} value={new Date(item.created_at).toLocaleDateString()} type="date">
                                </input>
                                <label>
                                   Value
                                </label>
                                <input onChange={(e)=>props.updateMeasurement(key(),'value',e.currentTarget.value,item.id)} value={item.value}  type="number" class="border">
                                </input>

                               
                            </div>
                        </div>
                        <DialogFooter>
                           
                            <Button onClick={()=>props.deleteMeasurement(item.id)}>
                                Delete
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
                  

                   </div>}
            </For>
        </Show>
    </div>)

}
export default MeasurementScreen;