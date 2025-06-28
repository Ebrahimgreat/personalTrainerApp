import{weights,setWeights,submitForm,updateWeightField} from "../../weightForm";
import Button from "../button";
import { useAuth } from "clerk-solidjs";

type props={
  clientName:string
 weightCreated:string,
  scaleWeight:number,
  updateScaleWeight:(item:number)=>void,
  updateDate:(item:string)=>void,
  addWeight:()=>void
}

function CreateWeight(props:props)
{



  const{getToken}=useAuth();



async function handleSubmit(event:Event)
{


 
  event.preventDefault();
props.addWeight()

  const token=await getToken();
 
  
    
}


    return(

        <div class="h-full w-full">
    
            <div class="">
             
      
                
            <form class=" rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>

          <div class="mb-4">

 <select value={props.clientName}>
<option value={props.clientName}>
  {props.clientName}
</option>
 </select>
          <label class="block text-sm font-bold mb-2">
           Scale Weight
          </label>
          <input value={props.scaleWeight} type="number" onChange={(e)=>props.updateScaleWeight(Number(e.currentTarget.value))}   class="shadow appearance-none border border-gray-300 rounded-lg w-full py-2 px-3 text-black">
          </input>
          </div>
          <div class="mb-4">

          
          <label class="block  text-sm font-bold mb-2">
            Date
          </label>
         
          <input type="date" value={props.weightCreated} onChange={(e)=>props.updateDate(e.currentTarget.value)} class="shadow appearance-none border border-gray-300 rounded-lg   w-full py-2 px-3 text-black">
          </input>
          </div>

<div class="flex items-center justify-center">


          <Button type="submit">
            Create Weight

          </Button>
          </div>

</form>
</div>
</div>


    

    );

}
export default CreateWeight;