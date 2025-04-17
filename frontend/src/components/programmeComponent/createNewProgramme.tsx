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

      
            <h1 class="text-center font-bold text-3xl mb-4">
             {props.headingText}
            </h1>

            <label class="block mb-2">
                Name
             </label>
            <input value={props.name} onChange={(e)=>props.onNameChange(e.currentTarget.value)}  class="w-full px-4 py-2 mb-4  border rounded-lg focus:outline-none focus:ring-2 pink-500" placeholder="5 Day Split">

            </input>
            


            <label class="block mb-2">
                Description
            </label>
            <textarea value={props.description} onChange={(e)=>props.onNameChange(e.currentTarget.value)} class="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 pink-500" placeholder=" Description"/>
                {props.children}
                </form>

        </div>
        
    )

}
export default CreateNewProgramme;