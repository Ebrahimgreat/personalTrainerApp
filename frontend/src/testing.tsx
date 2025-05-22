
import { useUser,SignedIn } from "clerk-solidjs";
import { createEffect, createSignal, onMount, Show } from "solid-js";
import TotalWorkouts from "./components/programmeComponent/totalWorkouts";



function Testing()
{
    const[messages,setMessage]=createSignal([])


const fetchData=async()=>{
    const socket= new WebSocket('ws://localhost:3001/ws')
  
    socket.addEventListener('open',(ws)=>{
       socket.send("Fuck you")
       socket.send('Hi')
    })
    socket.onmessage=(ev)=>{
        console.log(ev)
    }
    socket.CONNECTING
    socket.onerror=(error)=>{
        console.log('error',error.target)
    }
    console.log('I am running')


}
onMount(()=>{
    fetchData()
})

   
    
    
    return(
        <div>
         
         
        </div>
        
    )

}
export default Testing;