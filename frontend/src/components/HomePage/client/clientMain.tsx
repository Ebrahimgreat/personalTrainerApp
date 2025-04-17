import { For } from "solid-js";
import Modal from "../../modal";
import CreateWeight from "../../../createWeight";

type clientProps={
    name:string
    list:any[]


}
function ClientHomePage(props:clientProps){

    return(
        <div class="flex flex-col">
            
          <h1 class="text-center font-bold mb-2">
            Welcome {props.name}
            </h1>
            <div class="grid grid-cols-2  ml-10">



            <div class="bg-white shadow-md outline-none w-[350px] h-[350px]">
                <h2 class="font-bold text-center border-b">
                    Weights
                </h2>
                <Modal buttonText="Add">
                        <CreateWeight/>
                    </Modal>
                <table class="w-full">
                  
                    <thead>
                        <tr>
                            <th class="px-4 py-2">
                                Date
                            </th>
                            <th class="px-4 py-2s">
                                Scale Weight
                            </th>
                        </tr>
                    </thead>
                    <tbody>

            

                    <For each={props.list}>
                        {(item)=>(
                            <For each={item.weight}>
                                {(value)=><tr>
                                    <td class="px-4 py-2 text-center">
                                        {new Date(value.created_at).toLocaleDateString()}
                                    </td>
                                    <td class="px-4 py-2 text-center">
                                    {value.scaleWeight}
                                    </td>
                                    </tr>}
                                    </For>
                        )}
                    </For>
                    
                </tbody>
                </table>

            </div>


            <div class="bg-white shadow-md outline-none w-[350px] h-[350px]">
                <h2 class="font-bold text-center border-b">
                   Workouts
                </h2>
                <table class="w-full">
                    <thead>
                        <tr>
                      <th class="px-4 py-2">

                        Date</th>
                        <th class="px-4 py-2">
                          Name
                        </th>
                        <th>
                            
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                        <For each={props.list}>
                            {(item)=>(
                                <For each={item.workout}>
                                    {(value)=><tr>
                                        <td>
                                            
                                        </td>
                                        </tr>}
                                        </For>

                            )}
                        </For>

                        
                    </tbody>

                </table>

            </div>
            </div>
        </div>

    )

}
export default ClientHomePage;