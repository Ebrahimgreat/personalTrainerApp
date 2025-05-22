
type clientProps={
    name:string,
    email:string,
    notes:string,
    age:number,
    dob:string,
    height:number
}

function Settings(props:clientProps)
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


            <input disabled value={props.name?props.name:''} class={`disabled: cursor-not-allowed w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-blut-500`} type="text">
            </input>
            </div>

            <div class="mb-2">
     
            <label class="text-gray-600">
                Email

            </label>
       

            <input disabled value={props.email?props.email:''} class={`disabled:cursor-not-allowed w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-blut-500`} type="text">

            </input>
            </div>
            <div class="mb-2">

   
            <label class="text-gray-600">
              Notes

            </label>
            <input value={props.notes? props.notes:''} class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-blut-500" type="text">

          

</input>
</div>
<div class="mb-2">


<label class="text-gray-600">
             Age

            </label>


            <input value={props.age? props.age:18} class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-blut-500" type="number">
            
            </input>
            </div>
            <div class="mb-2">

      

            <label class="text-gray-600">
             Date Of Birth

            </label>

            <input value={props.dob? props.dob:''} class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-blut-500" type="text">
            
</input>
<label class="text-gray-600">
    Height
</label>

<input value={props.height? props.height:''} class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-blut-500" type="text">
            
            </input>


</div>
        </div>
    )
}
export default Settings;