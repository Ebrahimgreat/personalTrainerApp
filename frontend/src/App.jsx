
import{Router,Route,A, useNavigate, redirect} from '@solidjs/router';
import Home from './home';
import Weight from './weight';


import Testing from './testing';
import Workout from './workout';
import ShowWorkout from './showWorkout';
import LoginPage from './login';
import {ClerkProvider,UserButton,useAuth,ClerkLoaded,SignedIn, SignedOut, RedirectToSignIn, RedirectToUserProfile, ClerkLoading, SignIn} from 'clerk-solidjs';
import exerciseLibrary from './Exercise';
import Clients from './clients';
import Programme from './programme';
import CreateProgramme from './createProgramme';
import CreateClient from './createClient';
import ViewClient from './viewClient';
import ViewProgramme from './viewProgramme';
import Chat from './chat';
import signup from './signup';
import { template } from "solid-js/web";
import Template from "./template";
import { QueryClientProvider,QueryClient } from "@tanstack/solid-query";



function Layout(props)
{
  

  

  
  

  
  return(
    <>
  <header>



<SignedIn>
 
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
       Clients
      </A>
      <A href='/programme' class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
      Programmes
      </A>
      <A href='/exercise' class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4" >
      Exercise
      </A>
     
     
      <UserButton class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">

      </UserButton>
    </div>
  
  </div>
</nav>
</SignedIn>
<SignedOut>
 
</SignedOut>

</header>




  <main class="mt-10 ml-10 mr-10">
    {props.children}
  </main>

  </>
  )

}





function App() {
  const queryClient=new QueryClient({
    defaultOptions:{
      queries:{
        gcTime:1000*60+6
      }
    }
  })
 


  return(
    

  <QueryClientProvider client={queryClient}>


    <ClerkProvider publishableKey='pk_test_aHVnZS1zZWFob3JzZS00NC5jbGVyay5hY2NvdW50cy5kZXYk'>
    
     
<ClerkLoading>
  <div class="flex items-center justify-center">
    <div class="text-center">
     Loading....


  </div>
  </div>
</ClerkLoading>



  <ClerkLoaded>


        <Router root={Layout}>


      
          <Route path='/home' component={Home}/>
          <Route path="/exercise" component={exerciseLibrary}/>
          <Route path='/weights' component={Weight}/>
        
       
          <Route path="/testing" component={Testing}/>
          <Route path="/workout" component={Workout} />

          <Route path="/workout/show" component={ShowWorkout}/>
          <Route path="/clients" component={Clients}/>
          <Route path="/clients/create" component={CreateClient}/>
          <Route path="/programme" component={Programme}/>
          <Route path="/programme/create" component={CreateProgramme}/>
          <Route path="/clients/view" component={ViewClient}/>
          <Route path="/programme/view" component={ViewProgramme}/>
          <Route path="/chat" component={Chat}/>
          <Route path="/viewTemplate" component={Template}/>
          <Route path="/" component={LoginPage}/>
          <Route path="/signup" component={signup}/>

 </Router>
 </ClerkLoaded>

        </ClerkProvider>
        </QueryClientProvider>

        


    

   

  );




}
export default App;
