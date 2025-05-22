import { For } from "solid-js"
type props={
    items:string[]
    selectedTab:string
    handleTabChange:(item:string)=>void

}
function TabBar(props:props)
{
    return(<div class="flex flex-row gap-4 p-2  justify-between">

      
        <For each={props.items}>
            {(item)=><p onclick={()=>props.handleTabChange(item)} class={`text-gray-600 ${item===props.selectedTab? 'border-b border-blue-500' : 'cursor-pointer'}`}>
                {item}
                </p>}
        </For>

    </div>)

}
export default TabBar;