import { For } from "solid-js";
import Button from "../button";

type editProps={

    children?:any,
    items:any,
    exerciseLibrary:[],
    onRepRangeChange:(index:number)=>(e:Event)=>void,
    onNameChange:(index:number)=>(e:Event)=>void,
    onWeightChange:(index:number)=>(e:Event)=>void,  
    onRemove:(index:number)=>void;
      name:string,
   



}


function EditExercises(props:editProps)
{
    const options:string[]=['1-3','3-6','6-9','10-12','12-15','15+']


    
    return(
        <div class="bg-white shadow-md">
            <h2 class="font-bold text-center">
                {props.name}

            </h2>
          
            <table class="w-full">
                
                    <thead>
                        <tr>
                        <th class="px-4 py-2">
                            name

                        </th>
                        <th class="px-4 py-2">
                           rep Range

                        </th>
                        <th class="px-4 py-2">
                          weight

                        </th>
                        </tr>
                    </thead>
           
                <tbody>
                    <For each={props.items}>
                        {(item,key)=><tr>


                            <td class="px-4 py-2">
                                    <select value={item.name}  class="w-16">
                                       <For each={props.exerciseLibrary}>
                                        {(value)=><option value={item.id}>
                                            {value.name}
                                            </option>}
                                            </For>


                                    </select>

                                    </td>
                                <td class="px-4 py-2">
                                <input type="number" onChange={props.onWeightChange(key())}  class={` w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`} value={item.weight}/>

                                 </td>
                                 <td class="px-4 py-2">

                        

                                        
                                 <select name="repRange" value={item.repRange} onChange={props.onRepRangeChange(key())}  >
                                    <For each={options}>
                                        {(key)=><option value={key}>
                                         {key}
                                            </option>}
                                    </For>

                                    
                           

                                 </select>
             
                         
                                 </td>
                                 <td class="px-4 py-2">
                                   <Button onClick={()=>props.onRemove(key())}>

                                   </Button>
                                 </td>

                                </tr>}
                                </For>
                   
                        </tbody>
                        </table>

                   {props.children}
            

            
        </div>
    )

}
export default EditExercises;
