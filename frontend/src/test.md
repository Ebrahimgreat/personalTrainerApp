<h2 class="font-bold text-center">
        # {workoutSignal()+1} {" "}
        {newProgramme.workout[workoutSignal()].name}

</h2>





<table class="w-full">


                            <thead>
                                <tr>
                                   
                                    <th class="px-4 py-2">
                                        Name
                                    </th>

                        
                                <th class="px-4 py-2">
                                   Weight
                                </th>
                                <th class="px-4 py-2">
                                Rep Range
                                </th>
                                </tr>
                            </thead>
                            <tbody>
                                
<For each={newProgramme.workout[workoutSignal()].exercise}>
                    {(item,key)=><tr>
                       

            
                                <td class="px-4 py-2">
                                    <select value={item.name} onChange={editFields(key(),'name')} class="w-16">
                                       <For each={exerciseLibrary()}>
                                        {(item)=><option value={item.id}>
                                            {item.name}
                                            </option>}
                                            </For>


                                    </select>

                                    </td>
                                <td class="px-4 py-2">
                                <input type="number" onChange={editFields(key(),'weight')}   class={` w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`} value={item.weight}/>

                                 </td>
                                 <td class="px-4 py-2">

                        

                                        
                                 <select name="repRange" value={item.repRange} onChange={editFields(key(),'repRange')}>
                                    <For each={options}>
                                        {(key)=><option value={key}>
                                         {key}
                                            </option>}
                                    </For>

                                    
                           

                                 </select>
             
                         
                                 </td>
                                 <td class="px-4 py-2">
                                    <Button onClick={()=>removeExercise(item.id)}>
                                        Remove
                                    </Button>
                                 </td>

                                </tr>}
                                </For>
                   
                        </tbody>
                        </table>
                 
                        
                       
                    
                        </Show>
                        </div>
