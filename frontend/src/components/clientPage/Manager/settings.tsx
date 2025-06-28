
type props={
    name:string,
    notes:string,
    age:number,
    onChange:(fieldName:string,value:string)=>void
}

function Settings(props:props)
{
    return(
   
        <div class="bg-white shadow-md rounded-lg p-8 flex flex-col w-full    h-full">
            <h2 class="text-xl font-semibold text-gray-700 mb-6">
                Client Information
            </h2>
            <div class="mb-2">

       
          <label class="text-gray-600">
            Name

            </label>
            </div>

<div class="mb-2">


            <input onChange={(e)=>props.onChange('name',e.currentTarget.value)} value={props.name?props.name:''} class={`w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-blut-500`} type="text">
            </input>
            </div>

          
     

            <div class="mb-2">

   
            <label class="text-gray-600">
              Notes

            </label>
            <input onChange={(e)=>props.onChange('notes',e.currentTarget.value)} value={props.notes? props.notes:''} class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-blut-500" type="text">

          

</input>
</div>
<div class="mb-2">


<label class="text-gray-600">
             Age

            </label>


            <input onChange={(e)=>props.onChange('age',e.currentTarget.value)} value={props.age? props.age:18} class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-blut-500" type="number">
            
            </input>
            </div>
           
        </div>
    )
}
export default Settings;