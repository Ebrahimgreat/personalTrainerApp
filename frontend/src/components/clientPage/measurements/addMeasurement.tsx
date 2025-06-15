import { For, Show } from "solid-js"
type Measurements={
    id:number
    name:string,
    value:number
}
type props={
    measurements:Measurements[],
    updateMeasurement:(key:number,item:number)=>void;

}
import Button from "../../ui/button"
import { TextField, TextFieldRoot } from "../../ui/textfield"
function AddMeasurement(props:props)
{



    return(
        
        <div class="flex flex-col">
            <label>
                Date 
            </label>
            <input type="date" class="border">
            </input>
            <div class="grid grid-cols-2 gap-x-3 mb-2">

        
            <Show when={props.measurements}>
                <For each={props.measurements}>
              
                     {(item,key)=><div class="flex flex-col">
                        <label class="text-gray-600">{item.name}
                         
                            </label>
                            <TextFieldRoot>

                    
                            <TextField type="number" onChange={(e)=>props.updateMeasurement(key(),Number(e.currentTarget.value))}  class="border shadow-md focus:outline-none ">
                            </TextField>
                            </TextFieldRoot>
                            </div>}
                </For>

            </Show>
            </div>
           <Button  class="bg-gray-500" variant="default">
            Submit
           </Button>


        </div>
    )

}
export default AddMeasurement;