import { TextFieldRoot,TextField } from "../ui/textfield"
import { Show } from "solid-js";
import Button from "../ui/button";
type newClient={
    name:string,
    age:number,
    password:string,
    confirmPassword:string
    
}
type props={
    client:newClient,
    addNewClient:()=>void,
    setClientName:(item:string)=>void,
    setClientAge:(item:number)=>void
    setClientEmail:(item:string)=>void,
    setClientPassword:(item:string)=>void,
    setClientConfirmPassword:(item:string)=>void,
    setDialogOpen:(item:boolean)=>false
   emailMessage:string
  
}


function AddClient(props:props)
{


   
    const handleFormSubmit=(event:Event)=>{
        
        console.log("YES")
        event.preventDefault();

       
        props.addNewClient()
        props.setDialogOpen(false)
    }

    
    



    return(<div>
        <span class="text-gray-600">
            Add a client. Fill in their details below to add them directly. They'll be added to your client's list instantly and treated as 
            if they've joined
        </span>
        <form autocomplete="off" onsubmit={handleFormSubmit}>
            <TextFieldRoot>
                
                <TextField required onchange={(e)=>props.setClientName(e.currentTarget.value)} value={props.client.name} id="name" type="text" placeholder="name"/>
                <TextField required onchange={(e)=>props.setClientAge(Number(e.currentTarget.value))} value={props.client.name} id="age" type="number" placeholder="age"/>

                <TextField required onchange={(e)=>props.setClientEmail(e.currentTarget.value)} value={props.client.name} id="email" type="email" placeholder="email">

                </TextField>
             
                </TextFieldRoot>
               
          <Button type="submit" variant="outline">
         Submit
            </Button>

            
        </form>

     
      <p>  {props.emailMessage}
        </p>



    </div>)

}
 export default AddClient;