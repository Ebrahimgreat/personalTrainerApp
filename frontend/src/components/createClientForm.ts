import { createSignal } from "solid-js"
import { createStore } from "solid-js/store"

type FormField={
    name:string
    emailAddress:string,
    password:string,
    confirmPassword:string,
}
const[newClient,setNewClient]=createStore<FormField>({
    name:'',
    emailAddress:'',
    password:'',
    confirmPassword:''
})
const[errorSignal,setErrorSignal]=createSignal('')


async function submitForm()
{
    try{
        const data=await fetch('http://localhost:3001/api/clients/store',{
            method:'POST',
            body:JSON.stringify({
                item:newClient
            })
        })
    }
    catch(error){
        console.log(error)
    }
}

const updateFields=(fieldName:string)=>(event:Event)=>{
    console.log(fieldName)

  
    const inputElement=event.currentTarget as HTMLInputElement;
  
setNewClient(current=>({
    ...current,[fieldName]:String(((inputElement.value)))

}))

if(newClient.password!==newClient.confirmPassword){
    
    setErrorSignal('Passwords Do not match')
}

if(newClient.password==newClient.confirmPassword){

    setErrorSignal('Passwords match!')
}


}
export{newClient,setNewClient,updateFields,errorSignal,setErrorSignal,submitForm}