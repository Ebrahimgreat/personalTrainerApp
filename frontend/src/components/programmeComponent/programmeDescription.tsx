type createProgramme={
    name:string,
    description:string
    

    
}
type props={
    programme:createProgramme,
    setProgrammeName:(item:string)=>void,
    setProgrammeDescription:(item:string)=>void,
}

function ProgrammeDescription(props:props)
{

    return(
        <div class=" bg-white shadow-md">
            <form>

      
   

            <label class="block text-sm font-medium text-gray-700 mb-1">
               Programme Title
             </label>
            <input value={props.programme.name} onChange={(e)=>props.setProgrammeName(e.currentTarget.value)} class="w-full px-4 py-2 mb-4  border rounded-lg focus:outline-none focus:ring-2 pink-500" placeholder="5 Day Split">

            </input>
            


            <label class="block text-sm font-medium text-gray-700 mb-1">
                Programme Description
            </label>
            <textarea value={props.programme.description} onChange={(e)=>props.setProgrammeDescription(e.currentTarget.value)}  class="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 pink-500" placeholder=" Description"/>
               
                </form>

        </div>
        
    )

}
export default ProgrammeDescription;