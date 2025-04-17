import { createContext,useContext,createSignal,onMount } from "solid-js";
import { useAuth } from "clerk-solidjs";

const[role,setRole]=createSignal('clients')
 const RoleContext=createContext({
    role,setRole
 })

export function RoleContextProvider(props){
   
 
 

    return(
    <RoleContext.Provider value={{role,setRole}}>
        {props.children}
        

        </RoleContext.Provider>
    )
   
 

    
}

export function useRoleContext(){
    return useContext(RoleContext)
}