import { A } from "@solidjs/router"
import { UserButton } from "clerk-solidjs"


function Layout1(props)
{
  

  
  return(
    <>
  <header>

    




<nav class="flex items-center justify-between flex-wrap bg-teal-500 p-6">
  <div class="flex items-center flex-shrink-0 text-white mr-6">
    <svg class="fill-current h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z"/></svg>
    <span class="font-semibold text-xl tracking-tight">Scope  Fitness</span>
  </div>

  <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
    <div class="text-sm lg:flex-grow">
      <A href="/home" class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
       Home 
      </A>
      <A href="/clients" class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
       clients
      </A>
      <A href='/programme' class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
      Programs
      </A>
      <A href='/exercise' class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4" >
      Exercise
      </A>
     
      <A href="/weights" class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
        weights
      </A>
      <A href="/workout" class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
     Workout
      </A>
      <A href="/chat" class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
      Chat</A>
      <UserButton class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">

      </UserButton>
    </div>
  
  </div>
</nav>

</header>




  <main class="mt-10 ml-10 mr-10">
    {props.children}
  </main>

  </>
  )

}
export default Layout1