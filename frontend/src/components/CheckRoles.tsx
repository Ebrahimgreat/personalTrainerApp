import{useAuth} from 'clerk-solidjs'
import { onMount } from 'solid-js';
import { useRoleContext } from './RoleContext';
function CheckRoles()
{
  const{setRole}=useRoleContext();
   
    onMount(async()=>{
           
              console.log('I am running')
              const {getToken}=useAuth();
              const token=await getToken()
              const data=await fetch('http://localhost:3001/api/roles',{
                method:'GET',
                headers:{
                  'Authorization': `Bearer ${token}`
              },
           
              })
              const value= await data.json();
             setRole(value.role)
          
    })
    return null;
    
}
export default CheckRoles;
