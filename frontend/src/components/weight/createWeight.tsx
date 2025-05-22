import{weights,setWeights,submitForm,updateWeightField} from "../../weightForm";
import Button from "../button";
import { useAuth } from "clerk-solidjs";

type props={
  clientName:string
  date:string,
  scaleWeight:number,
  updateScaleWeight:(item:string)=>void,
  updateDate:(item:string)=>void,
}

function CreateWeight(props:props)
{

  const{getToken}=useAuth();



async function handleSubmit(event:Event)
{
  event.preventDefault();

  const token=await getToken();
 
   
    submitForm(token)
    
}


    return(

        <div class="h-full w-full">
            
            <div class="w-full max--xs shadow-md text-black flex items-center justify-center">
              
      
                
            <form class=" rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>

          <div class="mb-4">

 <select value={props.clientName}>
<option>
  {props.clientName}
</option>
 </select>
          <label class="block text-sm font-bold mb-2">
           Scale Weight
          </label>
          <input value={props.scaleWeight} onChange={updateWeightField('scaleWeight')} class="shadow appearance-none border border-gray-300 rounded-lg w-full py-2 px-3 text-gray-300">
          </input>
          </div>
          <div class="mb-4">

          
          <label class="block  text-sm font-bold mb-2">
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