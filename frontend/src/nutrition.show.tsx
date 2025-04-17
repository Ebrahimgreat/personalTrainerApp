import { query, useSearchParams } from "@solidjs/router";
import { createSignal,createResource,Show,For, createEffect } from "solid-js";
import { useLocation } from "@solidjs/router";
import { useNavigate } from "@solidjs/router";
import Button from "./components/button";
import { createStore } from "solid-js/store";






type TotalMacros={
    totalCalories:number,
    totalProtein:number,
    totalCarbs:number,
}




function nutritionShow()
{
    const location=useLocation();
    const[myFoods,setMyFoods]=createSignal(location.search.slice(6));
    const[myNutritionStore,setNutritionStore]=createStore<TotalMacros>({
        totalCalories:0,
        totalProtein:0,
        totalCarbs:0

    })

    const fetchData=async()=>{
        try{
            const data=await fetch(`http://localhost:3001/api/nutrition/show?date=${myFoods()}`)
            return data.json();
        }
        catch(error)
        {
            console.log(error)
        }
    }
const[myCurrentFoods]=createResource(myFoods,fetchData)


createEffect(()=>{
    console.log("Hello",myFoods())
})
createEffect(()=>{
   
    if(myCurrentFoods())
    {
   const totalCalories=myCurrentFoods().reduce((sum,item)=>sum+item.calories,0)
   const totalProtein=myCurrentFoods().reduce((item,sum)=>item+sum.protein,0)
   const totalCarbs=myCurrentFoods().reduce((item,sum)=>item+sum.carbs,0)

   setNutritionStore("totalCalories",totalCalories)
   setNutritionStore("totalProtein",totalProtein)
   setNutritionStore("totalCarbs",totalCarbs)
    }

})



    const navigate=useNavigate();

    createEffect(()=>{
        console.log(myFoods())
    })
    
    return(
        
        <div>
          <h1 class="font-bold text-3xl text">
            {myFoods()}
            </h1>
            <div class="bg-[#2f3134] border w-full text-white shadow-lg mt-4 max-h-[300px] min-h-[300px] overflow-y-scroll px-3 ">
            <div class="flex flex-row justify-around">
                <p class="font-bold underline">
                    Total Calories {myNutritionStore.totalCalories}
                </p>
                <p class="font-bold underline">
                    Total Protein {myNutritionStore.totalProtein}
                </p>
                <p class="font-bold underline">
                    Total Protein {myNutritionStore.totalCarbs}
                </p>
            </div>

        
          
         <Show when={myCurrentFoods.length>=0}>
          
          <For each={myCurrentFoods()}>
            {(item)=>(
                <div class="flex flex-row justify-evenly mt-3 shadow-md my-2">
                  
                    <p>
                  <b>
                    Calories 
                    </b>: {item.calories}
                  </p>

                  <p><b>
                 Protein 
                 </b>: {item.protein}
                    </p>
                    <p> <b>
                     Fat
                     </b> : {item.fat}
                    </p> 

                 
                    <p> <b> Carbs
                        </b> : {item.carbs}
                    
                    </p>


                </div>
            )}
        
            </For>



         </Show>
         </div>
         <Button onClick={()=>navigate('/nutrition/search')}>
            Search
         </Button>
         
        </div>

    )
}
export default nutritionShow;