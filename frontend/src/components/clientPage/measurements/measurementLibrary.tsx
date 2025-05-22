type measurements={
    id:number,
    name:string
}
type props={
    measurements:measurements[]
    setMeasurementId:(item:number)=>void,
    setMeasurementName:(item:string)=>void
}

import { For } from "solid-js"

function MeasurementLibrary(props:props)
{
    function setMeasurements(item:measurements)
{
    props.setMeasurementId(item?.id)
    props.setMeasurementName(item.name)
   
    

}




    return(<div class="h-full overflow-y-auto flex flex-col bg-white shadow-xl">
        <div class="border-b px-6 py-3">
            <h1 class="text-3xl font-semibold text-gray-600">
Measurements
            </h1>
            <div class="flex flex-row justify-around mr-10 ml-10">
                
                
            </div>

            

        </div>
        <ul>

  
        <For each={props.measurements}>
                    {(item)=><li onclick={()=>setMeasurements(item)}class="cursor-pointer px-4 py-2 rounded-lg hover:bg-indigo-100 text-grey-600">
                        {item.name}
                        </li>}
                </For>
                </ul>

    </div>)
}
export default MeasurementLibrary;