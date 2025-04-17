import { createSignal,createResource,Show, createEffect } from "solid-js";
import { createStore } from "solid-js/store";
import { setNutrition } from "./nutritionForm";
import Button from "./components/button";
import{customFood,setCustomFood,submitCustomFoodForm,updateFormFields} from "./customFoodForm";


type foodItems={
    defaultCalories:number,
    defaultFat:number,
    defaultCarbs:number,
    defaultProtein:number,
    defaultServing:number,
    protein:number,
    calories:number,
    carbs:number,
    quantity:number,
    foodName:string,
    fat:number

}

type macros={
    foodCount:number,
    food:[{
    defaultCalories:number,
    defaultFat:number,
    defaultCarbs:number,
    defaultProtein:number,
    defaultQuantity:number,
    protein:number,
    calories:number,
    carbs:number,
    quantity:number,
    foodName:string,
    fat:number
    }]

}

type totalMacros={
    totalCalories:number,
    totalProtein:number,
    totalCarbs:number,
}

const [total,setTotal]=createStore<totalMacros>({
    totalCalories:0,
    totalCarbs:0,
    totalProtein:0,

})




function SearchNutrition(){

    

    async function handleCreateCustomFood(event:Event)
    {
        event.preventDefault();
       submitCustomFoodForm();


    }
    


    const [foodName,setFoodName]=createSignal('')


    const[created_at,setCreatedAt]=createSignal('')

       
    const fetchData=async()=>
        {
            const response=await fetch(`http://localhost:3001/api/customFoods?foodName=${foodName()}`,{
                method:'GET'
            })
           
            return response.json();
    
    
        }
    

    const [myFoodStore,nutrientSelected]=createStore<macros>({
        foodCount:0,
        food:[]

    })
   

   


    function removeItem()
    {
        console.log("i Have been removed")
    }

function addNutrient(item:foodItems)
{
    console.log(item);
    nutrientSelected("food",(currentItem)=>[
        ...currentItem,
        {
          
            defaultCalories:item.defaultCalories,
            defaultCarbs:item.defaultCarbs,
            defaultQuantity:item.defaultServing,
            defaultFat:item.defaultFat,
            defaultProtein:item.defaultProtein,
            calories:item.defaultCalories,
            carbs:item.defaultCarbs,
            protein:item.defaultProtein,
            fat:item.defaultFat,
            foodName:item.foodName,
            quantity:item.defaultServing
            }

    ])
}

createEffect(()=>{
   nutrientSelected('foodCount',myFoodStore.food.length)
   console.log(myFoodStore.foodCount)
   const totalCalories=myFoodStore.food.reduce((sum,value)=>sum+value.calories,0)
setTotal("totalCalories",totalCalories);
})

function updateNutrient(item:number,quantity:number)
{
    console.log(quantity)
    console.log(item)
       
nutrientSelected("food",item,"calories",(calories)=>(myFoodStore.food[item].defaultCalories*quantity)/(myFoodStore.food[item].defaultQuantity)),
nutrientSelected("food",item,"carbs",(carbs)=>(myFoodStore.food[item].defaultCarbs*quantity)/(myFoodStore.food[item].defaultQuantity)),
nutrientSelected("food",item,"fat",(fat)=>(myFoodStore.food[item].defaultFat*quantity)/(myFoodStore.food[item].defaultQuantity)),
nutrientSelected("food",item,"protein",(protein)=>(myFoodStore.food[item].defaultProtein*quantity)/(myFoodStore.food[item].defaultQuantity))

}



    async function submitForm()
    {
       console.log(myFoodStore.created_at)
        try{
            const data=await fetch('http://localhost:3001/api/nutrition/store',{
                method:'POST',
                body:JSON.stringify({
                    item:myFoodStore.food.map((value)=>{
                        return{calories:value.calories,protein:value.protein,carbs:value.carbs,fat:value.fat,created_at:created_at(),user_id:1}
                    }),
                    user_id:1,
                 
                    

                })
            })
        }
        catch(error)
        {
            console.log(error)
        }
    }

  



    const[myFoods]=createResource(foodName,fetchData)
    return(
        <div class=" flex flex-col h-screen space-y-6">


<div class="grid grid-cols-3 gap-x-6">


<input class=" w-32 border px-4 py-2 rounded-full focus:ouline-none " type="date" value={created_at()} onChange={(e)=>setCreatedAt(e.currentTarget.value)}>
</input>
<input class="w-32 border px-4 py-2 rounded-full focus:outline-none" type="text" value={foodName()} onInput={(e)=>setFoodName(e.target.value)}  placeholder="search">
</input>
<Button class="w-32" onClick={submitForm}>
    Submit
</Button>



</div>

<h2 class="text-lg font-semibold">
            Your Food Items
            </h2>

          <div class="grid font-bold border grid-cols-4">
            <p>
                Total Calories {total.totalCalories}
                </p>
            <p>
            Total Carbs {total.totalCarbs}
            </p>
           <p>
        Total Fat</p>
           <p>
        Total Protein {total.totalProtein}
        </p>
          </div>




    
        <Show when={myFoods()}>


           

        
           {myFoods().length==0? 'No items' : ""}

   
        <div class=" bg-[#2f3134] border w-full  text-white shadow-lg mt-4 max-h-[300px] min-h-[300px] overflow-y-scroll px-3">
      
     


   
       
       <For each={myFoods()}>
        {(item,value)=>(
          
          <div class="grid grid-cols-6 cursor-pointer gap-x-3 p-3 border-b border-gray-600">
             
      
             <Button class="w-20 h-12"  onClick={()=>addNutrient(item)}>
                Select
                </Button>

            
              <p class="w-20" >
              {(item.foodName)}
              </p>

            <p class="w-20">   Calories: {item.defaultCalories}</p>
              <p class="w-20">  Fat {JSON.stringify(item.defaultFat)}</p>
              <p>  Carbs {JSON.stringify(item.defaultCarbs)}
               </p>
               <p class="w-20">  Quantity {JSON.stringify(item.defaultServing)}g
               </p>
               </div>

       
        )}

        </For>
</div>

        


            <div class=" bg-[#2f3134] border text-white shadow-lg mt-4 max-h-[200px] min-h-[200px] overflow-y-scroll px-3">


        <For each={myFoodStore.food}>
            {(item,key)=>(
                
                <div class="grid grid-cols-6 gap-x-6 p-3 border-b border-gray-600">
                 
<p>

    {item.foodName}
</p>
       <p>     
   Quantity  <input type="number" class="text-center" value={item.quantity} onChange={(e)=>updateNutrient(key(),Number(e.currentTarget.value))} class="border w-16 rounded">
    </input>
    </p>
              <p class="w-20"> Calories {item.calories}
                </p>
              <p class="w-20"> Protein {item.protein}
                </p>
              <p class="w-20"> Fat {item.fat}
                </p>
              <p class="w-20"> Carbs {item.carbs}</p>
            </div>)}
        </For>

     
        </div>
      
    
        
         



        </Show>

        </div>


    )

}
export default SearchNutrition;