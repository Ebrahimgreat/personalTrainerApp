import { createStore } from "solid-js/store"

type food={
    defaultCalories:number,
    defaultFat:number,
    defaultCarbs:number,
    defaultProtein:number,
    defaultServing:number,
    foodName:string,
}

const[customFood,setCustomFood]=createStore<food>({
    foodName:'Cheese',
    defaultCalories:120,
    defaultProtein:100,
    defaultCarbs:100,
    defaultFat:100,
    defaultServing:100,

})

const updateFormFields=(fieldName:string)=>(event:Event)=>{
   
    const inputElement=event.currentTarget as HTMLInputElement;
    console.log(inputElement.value);
    setCustomFood(prev=>({
        ...prev,[fieldName]:((inputElement.value))
    }));
 
     }
async function submitCustomFoodForm()
{
    try{
        const data=await fetch('http://localhost:3001/api/customFoods/store',{
            method:'POST',
            body:JSON.stringify({
                foodName:customFood.foodName,
                defaultCalories:customFood.defaultCalories,
                defaultCarbs:customFood.defaultCarbs,
                defaultProtein:customFood.defaultProtein,
                defaultFat:customFood.defaultFat,
                defaultServing:customFood.defaultServing,


            })

      
        })
    }
    catch(error)
    {
        console.log(error)
    }
 
    
}
export{customFood,setCustomFood,submitCustomFoodForm,updateFormFields}