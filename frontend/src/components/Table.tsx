
import { For } from "solid-js";
import Button from "./button";
import { useNavigate } from "@solidjs/router";

interface Action<T>{
    name:string,
    value:(item:T)=>void

}
interface View<T>{
    name:string,
    value:(item:T)=>void

}
interface keyConfig<T>{
    name:string,
    format:string
}


interface TableProps<T>{
    columns:string[];
    data:any[];
    keys:keyConfig<T>[];
    actions:Action<T>[];
    onClick?:()=>void,
    view:View<T>[];
}




function Table<T>(props:TableProps<T>)
{
    const navigate=useNavigate();

    return(
<div class="overflow-x-auto w-full">
     
        <table class="border-gray-300 w-full">
            <thead class="bg-pink-500 text-white">
                <tr>
                    <For each={props.columns}>
                        {(item,index)=><th class="border border-gray-300 px-4 py-2">
                            {item}

                            </th>}
                        
                    </For>
                </tr>
            </thead>
            <tbody>
               <For each={props.data}>
                {(item,key)=>(
                    <tr>
                        <For each={props.keys}>
                            {(value)=>(
                                <td class="border border-gray-300 px-4 py-2">
                                  {value.format==='date' ? new Date(item[value.name]).toLocaleDateString():(item[value.name])}

                                </td>


                            )}

                        </For>
                        <For each={props.actions}>
                            {(action)=>(
                                <td class="border border-gray-300 px-4 py-2">
                                    
                                    <Button onClick={()=>action.value(item)}>
                                       {action.name}
                                       </Button>
                                </td>
                                
                                
                            )

                            }
                        </For>
                        <For each={props.view}>
                            {(v)=>(
                                <td class="px-4 border border-gray-300 py-2">
                                    <Button onClick={()=>v.value(item)}>
                                    
                                    {v.name}
                           
                                    </Button>

                                </td>
                            )}
                            
                        </For>
                     
                    </tr>

                )}
               </For>
               
                  

           

            </tbody>

        </table>
        </div>
        
    )
}
export default Table;