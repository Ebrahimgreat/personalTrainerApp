type createProgramme={
    name:string
    description:string,
    onNameChange:(value:string)=>void,
    onDescriptionChange:(value:string)=>void,
    onSubmit:(e:Event)=>void,
    children?:any;
    headingText:string,

    

    
}

function CreateNewProgramme(props:createProgramme)
{

    return(
        <div class=" bg-white shadow-md">
            <form onSubmit={props.onSubmit}>

      
      {props.name}

            <label class="block text-sm font-medium text-gray-700 mb-1">
               Programme Title
             </label>
            <input value={props.name} onChange={(e)=>props.onNameChange(e.currentTarget.value)}  class="w-full px-4 py-2 mb-4  border rounded-lg focus:outline-none focus:ring-2 pink-500" placeholder="5 Day Split">

            </input>
            


            <label class="block text-sm font-medium text-gray-700 mb-1">
                Programme Description
            </label>
            <textarea value={props.description} onChange={(e)=>props.onNameChange(e.currentTarget.value)} class="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 pink-500" placeholder=" Description"/>
                {props.children}
                </form>

        </div>
        
    )

}
export default CreateNewProgramme;