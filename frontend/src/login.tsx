import { createStore } from "solid-js/store";
import Button from "./components/button";
import { SignedIn,ClerkLoading,SignInButton, SignIn } from "clerk-solidjs";
function loginPage()
{
    const[signInForm,setSignInForm]=createStore({
        email:'',
        password:''
       

    })
   async  function submitLogin(event:Event)
    {
        event.preventDefault();
        try{
            const data=await fetch('http://localhost:3001/api/login',{
                method:"POST",
                body:JSON.stringify({signInForm})
            })
        }
        catch(error){
            console.log(error)
        }
    }



const updateFormFields=(formField:string)=>(event:Event)=>{

   const inputElement=event.currentTarget as HTMLInputElement;
   console.log(inputElement.value)
   setSignInForm(prev=>({
    ...prev,[formField]:inputElement.value
   
   }))

}
    
    return(
        <div class="flex flex-col items-center justify-center min-h-screen">
            <SignIn fallbackRedirectUrl={'/home'}>
            </SignIn>
            
            
        </div>
    )

}
export default loginPage;