import { createStore } from "solid-js/store";
type FormField={
    created_at:string,
    protein:number,
    calories:number,
    fat:number,
    carbs:number
};
const[nutrient,setNutrition]=createStore<FormField>({
    created_at:'2024-03-02',
    protein:100,
    fat:0,
    calories:0,
    carbs:0
})

const updateNutrientField=(fieldName:string)=>(event:Event)=>{
    const inputElement=event.currentTarget as HTMLInputElement;
    setNutrition(prev=>({
        ...prev,[fieldName]:Number((inputElement.value))
    }));

}




async function submitForm(form:FormField)
{
    try{
      
        const data=await fetch('http://localhost:3001/api/nutrition/store',{
            method:'POST',
            body:JSON.stringify({
                created_at:nutrient.created_at,
                calories:nutrient.calories,
                fat:nutrient.fat,
                carbs:nutrient.carbs,
                protein:nutrient.protein,
                user_id:1

            })

        })
     
    }
    catch(error){
        console.log(error)
    }
  

}



async function removeNutrient(item:object){
    try{
        alert('hello')
        const data=await fetch('http://localhost:3001/api/nutrition/remove',{
            method:'POST',
            body:JSON.stringify({
                id:item.id,
                user_id:1

            })
        })
    }
    catch(error){
        console.log(error)
    }

}
export {nutrient,setNutrition,removeNutrient,submitForm,updateNutrientField};