


import { useSignUp } from "clerk-solidjs"
import { createSignal } from "solid-js"
import { createStore } from "solid-js/store"
type User={
  name:string,
  email:string,
  password:string,
  confirmPassword:string
}
const[user,setStore]=createStore<User>({
  name:"",
  email:'',
  password:"",
  confirmPassword:""
})
export default function Signup() {
  const{signUp}=useSignUp();
 


  const submitForm=async(event:Event)=>{
    event.preventDefault();
    const data=await signUp()?.create({
      emailAddress:user.email,
      password:user.password
    })
    await signUp()?.prepareEmailAddressVerification({strategy:"email_code"})
  

  }
    return (
      <>
       
        <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              alt="Your Company"
              src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
              class="mx-auto h-10 w-auto"
            />
            <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
             Create an Account
            </h2>
          </div>
  
          <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onsubmit={submitForm} class="space-y-6">
              <div>

                <label class="block text sm-6  font-medium text-gray-900">
                  Name

                </label>
                <div class="mt-2">
                  
                </div>

                <label  class="block text-sm/6 font-medium text-gray-900">
                  Email address
                </label>
                <div class="mt-2">
                  <input value={user.email}
                    id="email"
                    name="email"
                    type="email"
                    required
           
                    class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
  
              <div>
                <div class="flex items-center justify-between">
                  <label class="block text-sm/6 font-medium text-gray-900">
                    Password
                  </label>
                  <div class="text-sm">
                  
                  </div>
                </div>
                <div class="mt-2">
                  <input value={user.password}
                    id="password"
                    name="password"
                    type="password"
                    required
                    class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>


              <div>
                <div class="flex items-center justify-between">
                  <label class="block text-sm/6 font-medium text-gray-900">
                    Confirrm Password
                  </label>
                  
                </div>
                <div class="mt-2">
                  <input value={user.confirmPassword}
                    id="password"
                    name="password"
                    type="password"
                    required
                    class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>





  
              <div>
                <button
                  type="submit"
                  class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>
  
            <p class="mt-10 text-center text-sm/6 text-gray-500">
             Already Have an account?
              <a href="/" class="font-semibold text-indigo-600 hover:text-indigo-500">
               Login
              </a>
            </p>
          </div>
        </div>
      </>
    )
  }
  