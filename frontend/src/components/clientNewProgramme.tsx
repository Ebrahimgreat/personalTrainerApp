import { Accessor, For, Signal,Show} from "solid-js";
import Button from "./button";
type ClientProps={
    name:[];
    searchSignal:Signal<string>

}
function ClientProgramme(props,results)

{
   
    return(
       <div>
    <input class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" value={props.value} onInput={e=>props.onUpdate(e.target.value)}>

    </input>
    
    <table class="w-full">
        <thead>
            <tr class="px-4 py-2">
               <th>
             Client
             </th>
             <th class="px-4 py-2">
                Assign
             </th>
            </tr>
        </thead>


<tbody>

<Show when={props.results==0}>
    No items
</Show>
<Show when={props.results!=0}>


    <For each={props.results}>
        {(item)=><tr>
            <td class="px-4 py-2">
              
               {item.name}</td>
               <td class="px-4 py-2">
                <Button>
                    Assign
                </Button>
               </td>
            </tr>}
    </For>
    </Show>
    </tbody>

        
    </table>
    </div>
    )

}
export default ClientProgramme;