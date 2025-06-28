import { createStore } from "solid-js/store";
import Button from "./components/button";
import { SignedIn,ClerkLoading,SignInButton, SignIn, ClerkLoaded } from "clerk-solidjs";
import { useSignIn } from "clerk-solidjs";
import { redirect, reload, useNavigate, usePreloadRoute } from "@solidjs/router";
import { useAuth } from "clerk-solidjs";
import { createEffect } from "solid-js";
import { create } from "domain";
type login={
    email:string,
    password:String
}
function LoginPage()
{
    const{isLoaded,isSignedIn}=useAuth();

    
    const preload=usePreloadRoute();

    const navigate=useNavigate();
    const{signIn,setActive}=useSignIn();
    const[signInForm,setSignInForm]=createStore<login>({
        email:'',
        password:''
       

    })
   async  function submitLogin(event:Event)
    {
        event.preventDefault();
        try{
            const data=await signIn()?.create({
                identifier:signInForm.email,
                password:signInForm.password

            })
            if(data?.status==='complete'){
                console.log(data)
                await setActive({session:data.createdSessionId});
             
              
               


            }
            else{
                console.log(data)
            }
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

    createEffect(()=>{
        if(isLoaded() && isSignedIn()){
           
            navigate('/home',{replace:true})
        }
    })
    return(

       
       
    
      <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">

    

        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <h1 class="text-3xl text-center">
                Scope Application
            </h1>
          <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Sign in to your account</h2>
        </div>
      
        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form class="space-y-6" action="#" onSubmit={submitLogin}>
            <div>
              <label for="email" class="block text-sm/6 font-medium text-gray-900">Email address</label>
              <div class="mt-2">
                <input type="email" onChange={(e)=>setSignInForm('email',e.currentTarget.value)} value={signInForm.email} name="email" id="email" autocomplete="email" required class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
              </div>
            </div>
      
            <div>
              <div class="flex items-center justify-between">
                <label for="password" class="block text-sm/6 font-medium text-gray-900">Password</label>
               
              </div>
              <div class="mt-2">
                <input type="password" onChange={(e)=>setSignInForm('password',e.currentTarget.value)} name="password" id="password" autocomplete="current-password" required class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
              </div>
            </div>
      
            <div>
              <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
            </div>
          </form>
      
          <p class="mt-10 text-center text-sm/6 text-gray-500">
           Dont have account?
            <a href="/signup" class="font-semibold text-indigo-600 hover:text-indigo-500">
                Dont have account? Signup here
            </a>
          </p>
        </div>
      </div>
      


    )

}
export default LoginPage;