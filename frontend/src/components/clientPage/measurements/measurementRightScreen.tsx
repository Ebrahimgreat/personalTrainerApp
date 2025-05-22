
import { Show,For } from "solid-js"
type Measurement={
    id:number,
    created_at:string,
    value:number
}

type props={
    name:string,
    measurement:Measurement[]
    
    

}


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


       
        <Show when={props.measurement}>
            <For each={props.measurement}>
                {(item)=><div class="flex flex-row justify-between items-center bg-gray-100 p-4">
                    <p class="text-sm text-gray-500">
                        {new Date(item.created_at).toLocaleDateString()}
                    </p>
                   <p class="text-lg font-semibold text-gray-700">
                   {item.value} KG
                   </p>
                   </div>}
            </For>
        </Show>
    </div>)

}
export default MeasurementScreen;