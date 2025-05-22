

import { For,Show } from "solid-js";

type bodyWeight={
    weight:string
}
type bodyWeights={
    weights:bodyWeight[];
}

function BodyWeight(props:bodyWeights)
{
    return(
        <div class="flex flex-col">
          <h1 class="font-bold text-2xl">
            History
          </h1>
            <For each={props.weights}>
                {(item)=><div class="bg-white  px-2 py-2 mb-2 rounded-lg flex flex-row justify-around">

                  
                    <p class="text-lg font-medium text-gray-800">
                      {item.scaleWeight} KG
                      </p>
                      <p class="text-sm text-gray-500">
                        {new Date( item.created_at).toLocaleDateString()}

                      </p>
                    </div>}
                
            </For>
         
        </div>
    )
    
}
export default BodyWeight;