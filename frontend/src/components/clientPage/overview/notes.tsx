
import Button from "../../button";
function Notes()
{
    return(<div class="bg white flex flex-col shadow-md p-3 space-y-4 h-full w-full">
        
        <h1 class="border-b border-gray-500 text-xl">
            Notes
        </h1>
        <textarea placeholder="Add notes about the client" class="shadow-appeareance-none border border-gray-300 rounded-lg w-full py-2 px-3 text-gray-300 "/>
<Button>
    Save
</Button>

    </div>)

}
export default Notes;