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
    selectedIndex:number,
    setSelectedIndex:(index:number)=>void,
      name:string,
   



}


function EditExercises(props:editProps)
{
    const options:string[]=['1-3','3-6','6-9','10-12','12-15','15+']


    
    return(
        <div class="bg-white">
      
          


          
            <table class="w-full table-fixed text-gray-900">
                
                    <thead class="bg-gray-200">
                        <tr>
                           
                        <th class=" border text-sm font-light border-gray-300">
                            name

                        </th>
                        <th  class="border px-4 py-2 text-sm font-light border-gray-300">
                           rep Range

                        </th>
                        <th class="border text-xs px-4 py-2 font-light border-gray-300">
                          weight

                        </th>
                        <th class=" border px-4 py-2 text-xs font-light borde border-gray-300">
                            Remove

                        </th>
                        </tr>
                    </thead>
           
                <tbody>
                    <For each={props.items}>
                        {(item,key)=><tr onclick={()=>{
                            if(props.selectedIndex==key()){
                                props.setSelectedIndex(-1)
                            }
                            else{
                                props.setSelectedIndex(key())
                            }

                        }} class={ props.selectedIndex==key()?'bg-blue-300': 'cursor-pointer hover:bg-amber-50'}>
                           


                            <td class="px-4 py-2 text-xs">
                            {item.name}

                                    </td>
                                <td class="px-4 py-2 text-xs">
                                    
                                <input type="number" onChange={props.onWeightChange(key())}  class={` w-18 h-8 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`} value={item.weight}/>

                                 </td>
                                 <td class="px-4 py-2 text-xs">
                        

                                        
                                 <select class="w-18 h-8 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" name="repRange" value={item.repRange} onChange={props.onRepRangeChange(key())}  >
                                    <For each={options}>
                                        {(key)=><option value={key}>
                                         {key}
                                            </option>}
                                    </For>

                                    
                           

                                 </select>
                                 
             
                         
                                 </td>
                                 <td class="px-4 py-2 text-xs">
                                  <button onclick={()=>props.onRemove(key())} class="bg-blue-500 w-8 h-8 rounded-full text-white shadow-md">
                                    X
                                  </button>
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
