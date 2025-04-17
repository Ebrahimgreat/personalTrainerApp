import { createResource, createSignal,Show } from "solid-js";


function globalSearch()
{
    
    const [myFoodSearch,setFoodSearch]=createSignal('')
    const fetchData=async()=>{
        const data=await fetch(`http://localhost:3001/api/search?query=${myFoodSearch()}`)
        return data.json();

    }
    const[myFoods]=createResource(myFoodSearch,fetchData)
    return(
        <div>
            Hello

            <input onInput={(e)=>setFoodSearch(e.currentTarget.value)} value={myFoodSearch()} class="border" type="text">
            </input>

            
<Show when={myFoods()}>
    Hi
    <For each={myFoods()}>
        {(item)=><div>
            <p>
                {item.foodName}
            </p>
            <p>

             {item.nutrientName}
             </p>
             <p>{item.value}</p>

           
            

            </div>
            }
    </For>
</Show>
        </div>

    )

}
export default globalSearch;