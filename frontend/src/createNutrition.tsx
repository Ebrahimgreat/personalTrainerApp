
import Button from "./components/button";
import{customFood,setCustomFood,submitCustomFoodForm, updateFormFields} from "./customFoodForm";
function createNutrition()
{

    function handleSubmit(event:Event)
    {
        event.preventDefault();
        submitCustomFoodForm();

    }
    return(

        <div class="w-full max--xs flex items-center justify-center">
           <form onClick={handleSubmit} class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            
            
            
            <label class="block text-gray-700 text-sm font-black">
                Food Name
            </label>
            <input value={customFood.foodName} onChange={updateFormFields('foodName')} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700">
            </input>

            <label class="block text-gray-700 text-sm font-bold mb-2">
            Default Calories

            </label>
            <input value={customFood.defaultCalories} onchange={updateFormFields('defaultCalories')} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700">
            </input>
            <label class="block text-gray-700 text-sm font-bold mb-2">
            Default Protein

            </label>
            <input value={customFood.defaultProtein} onChange={updateFormFields('defaultProtein')} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700">
            </input>
            <label class="block text-gray-700 text-sm font-bold mb-2">
            Default Carbs

            </label>
            <input value={customFood.defaultCarbs} onChange={updateFormFields('defaultCarbs')} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700">
            </input>

            <label class="block text-gray-700 text-sm font-bold mb-2">
            Default Serving

            </label>
            <input value={customFood.defaultServing} onChange={updateFormFields('defaultServing')} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700">
            </input>
            <label class="block text-gray-700 text-sm font-bold mb-2">
            Default Fat

            </label>
            <input value={customFood.defaultFat} onChange={updateFormFields('defaultFat')} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700">
            </input>
            <div class="flex items-center justify-center">

            
            <Button>
                Submit
            </Button>
</div>

           </form>
        </div>
    )
   
}
export default createNutrition;