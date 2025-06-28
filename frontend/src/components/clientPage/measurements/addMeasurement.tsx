import { createSignal, For, Show } from "solid-js"
type Measurements={
    id:number
    name:string,
    value:number
}
type props={
    measurements:Measurements[],
    measurementDate:string,
    updateMeasurement:(key:number,item:number)=>void,
    submitMeasurement:()=>void,
    updateDate:(item:string)=>void,
    setCloseDialog:(item:boolean)=>void

}
import Button from "../../ui/button"
import { TextField, TextFieldRoot } from "../../ui/textfield"




function AddMeasurement(props:props)
{


const submitMeasurement=()=>{
    props.submitMeasurement();
    props.setCloseDialog(false)
}
    return(
        
        <div class="flex flex-col">
            <label>
                Date 
            </label>
            <input value={props.measurementDate} onChange={(e)=>props.updateDate(e.currentTarget.value)} type="date" class="border">
            </input>
            <div class="grid grid-cols-2 gap-x-3 mb-2">

        
            <Show when={props.measurements}>
                <For each={props.measurements}>
              
                     {(item,key)=><div class="flex flex-col">
                        <label class="text-gray-600">{item.name}
                         
                            </label>
                            <TextFieldRoot>

                    
                            <TextField value={item.value} type="number" onChange={(e)=>props.updateMeasurement(key(),Number(e.currentTarget.value))}  class="border shadow-md focus:outline-none ">
                            </TextField>
                            </TextFieldRoot>
                            </div>}
                </For>

            </Show>
            </div>
           <Button onClick={()=>submitMeasurement()} variant="default">
            Submit
           </Button>


        </div>
    )

}
export default AddMeasurement;