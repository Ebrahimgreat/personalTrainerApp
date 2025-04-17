import logo from './logo.svg';
import styles from './App.module.css';
import{createResource, createSignal, onMount} from "solid-js"
import{Router,Route,A} from '@solidjs/router';
import Home from './home';
import Weight from './weight';
import nutrition from './nutrition';
import createWeight from './createWeight'
import SearchNutrition from "./searchNutrition";
import nutritionShow from './nutrition.show';
import globalSearch from './globalSearch';
import createNutrition from './createNutrition';
import Testing from './testing';
import Workout from './workout';
import CreateWorkout from './createWorkout';
import ShowWorkout from './showWorkout';
import loginPage from './login';
import {ClerkProvider,UserButton,useAuth,ClerkLoaded} from 'clerk-solidjs';
import Register from './register';
import { exercise } from './components/CreateExerciseForm';
import exerciseLibrary from './exerciseLibrary';
import Clients from './clients';
import Programme from './programme';
import CreateProgramme from './createProgramme';
import CreateClient from './createClient';
import ViewClient from './viewClient';
import ViewProgramme from './viewProgramme';
import { RoleContextProvider } from './components/RoleContext';
import { useRoleContext } from './components/RoleContext';
import layout from './layout';
import Layout1 from './components/Layout';
import { ToastProvider, Toaster } from "solid-notifications";


import CheckRoles from './components/CheckRoles';
import Layout2 from './components/Layout2';
function Layout(props)
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



function App() {
 
  const{role}=useRoleContext();

  return(
    

    <ClerkProvider publishableKey='pk_test_aHVnZS1zZWFob3JzZS00NC5jbGVyay5hY2NvdW50cy5kZXYk'>
      <ClerkLoaded>

<RoleContextProvider>

<CheckRoles/>


  

       
        <Router root={role()==='admin'? Layout1 : Layout2}>
    
 

       
          <Route path='/home' component={Home}/>
          <Route path="/exercise" component={exerciseLibrary}/>
          <Route path='/weights' component={Weight}/>
          <Route path='/nutrition' component={nutrition}/>
          <Route path='/weights/create' component={createWeight}/>
          <Route path="/nutrition/search" component={SearchNutrition}/>
          <Route path="/nutrition/show" component={nutritionShow}/>
          <Route path="/nutrition/globalsearch" component={globalSearch}/>
          <Route path="/nutrition/create" component={createNutrition}/>
          <Route path="/testing" component={Testing}/>
          <Route path="/workout" component={Workout} />
          <Route path="/createWorkout" component={CreateWorkout}/>
          <Route path="/workout/show" component={ShowWorkout}/>
          <Route path="/login" component={loginPage}/>
          <Route path="/register" component={Register}/>
          <Route path="/clients" component={Clients}/>
          <Route path="/clients/create" component={CreateClient}/>
          <Route path="/programme" component={Programme}/>
          <Route path="/programme/create" component={CreateProgramme}/>
          <Route path="/clients/view" component={ViewClient}/>
          <Route path="/programme/view" component={ViewProgramme}/>

          </Router>

          
   
 </RoleContextProvider>
 </ClerkLoaded>
      
        </ClerkProvider>

        


    

   

  );




}
export default App;
