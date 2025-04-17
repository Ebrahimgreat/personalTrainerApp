import Button from "./components/button";
import { newClient,setNewClient,updateFields,errorSignal,submitForm } from "./components/createClientForm";






function CreateClient()
{

    function handleSubmit(event:Event){
        event.preventDefault();
        submitForm()

    }


    return(
        <div class="flex items-center flex-col">
            <div class="bg-white shadow-md">
                <form onSubmit={handleSubmit}>

              
               <label class="block">
                Name

               </label>
               <input type="text" value={newClient.name} onChange={updateFields('name')} class="border"/>
               <label class="block">
              email Address

               </label>
               <input type="text" value={newClient.emailAddress} onChange={updateFields('emailAddress')} class="border"/>
               <label class="block">
Password
               </label>
               <input type="password" value={newClient.password} onInput={updateFields('password')} class="border">
               </input>
               <label class="block">
                Confirm Password

               </label>
              

            
               <input type="password" value={newClient.confirmPassword} onInput={updateFields('confirmPassword')} class="border"/>
               {errorSignal()}

               
               <Button class="block">
                Submit
               </Button>
               </form>

            </div>

          
            
        </div>
    )
}
export default CreateClient;