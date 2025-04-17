import{weights,setWeights,submitForm,updateWeightField} from "./weightForm";
import Button from "./components/button";
import { useAuth } from "clerk-solidjs";

function CreateWeight()
{

  const{getToken}=useAuth();



async function handleSubmit(event:Event)
{
  event.preventDefault();

  const token=await getToken();
 
   
    submitForm(token)
    
}


    return(

        <div>
            
            <div class="w-full max--xs flex items-center justify-center">
              
      
                
            <form class=" rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>

          <div class="mb-4">

 
          <label class="block text-gray-300 text-sm font-bold mb-2">
           Scale Weight
          </label>
          <input value={weights.scaleWeight} onChange={updateWeightField('scaleWeight')} class="shadow appearance-none border border-gray-300 rounded-lg w-full py-2 px-3 text-gray-300">
          </input>
          </div>
          <div class="mb-4">

          
          <label class="block text-gray-300 0 text-sm font-bold mb-2">
            Date
          </label>
          <input type="date" value={weights.created_at} onChange={updateWeightField('created_at')} class="shadow appearance-none border border-gray-300 rounded-lg   w-full py-2 px-3 text-gray-300">
          </input>
          </div>

<div class="flex items-center justify-center">


          <Button>
            Create Weight

          </Button>
          </div>

</form>
</div>
</div>


    

    );

}
export default CreateWeight;