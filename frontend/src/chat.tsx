import { onMount,createSignal,Show,For, createEffect } from "solid-js"
import { useAuth } from "clerk-solidjs"
import { createResource } from "solid-js";
import { createStore } from "solid-js/store";
import { useRoleContext } from "./components/RoleContext";
import Button from "./components/button";
import CreaterChat from "./components/clients/chat/creater";


type MessageType={
    message:[
        id:number,
        message:string
    ]

}
    


function Chat(){
    const role=useRoleContext();

    const {getToken}=useAuth();

    const[initialMessageFetch,setInitalMessage]=createSignal(false)



const[lastMessage,setLastMessage]=createSignal(Date.now())
  const [newRecievedMessage,setNewRecievedMessage]=createSignal('')
    

    const fetchCurrentUser=async()=>{
        const token=await getToken();
     const data=await fetch('http://localhost:3001/api/me',{
        method:"GET",
        headers:{
            'Authorization':`Bearer ${token}`
        }
     })
     return data.json()
       
    }


    const[authUser]=createResource(fetchCurrentUser)
   
   
    const[user,setUser]=createStore({
        name:'',
        id:-1,
        roomNumber:-1
   
    })

    const [userId,setUserId]=createSignal(-1)

    const userSelected=async(item:any)=>{
        
    setUserId(item.id)
    setUser('name',item.name),
    setUser('roomNumber',1)
    console.log(user.id)


    }

    const getMessages=async()=>{

        const token=await getToken();
      
        const data=await fetch(`http://localhost:3001/api/messages?id=${userId()}`,{
            method:'GET',
            headers:{
                'Authorization':`Bearer ${token}`
            }
           
        })
        return data.json();

    }
    const fetchRoomMembers=async()=>{
  
        const token=await getToken();
        const data=await fetch('http://localhost:3001/api/roomMembers',{
            method:'GET',
            headers:{
                'Authorization':`Bearer ${token}`
            }
        })
        return data.json();

        

    }
   

   const [messageStore,setMessageStore]=createStore<MessageType>({
    message:[]

   })
    const [roomMembers]=createResource(fetchRoomMembers)
    const[messages,{refetch}]=createResource(userId,getMessages)

    const [newMessage,setNewMessage]=createSignal('')
    


//Web Socket is opened up here
   const socket=new WebSocket('ws://localhost:3001/ws')
    


socket.addEventListener('message',event=>{
    const data=JSON.parse(event.data);
    console.log(data)
    if(!data|| !data.sender || !data.message){
        console.log("MEssgae undefined")
        return;

    }

    

  setMessageStore('message',(current)=>[
    ...current,{
        id:data.sender,
        message:data.message

    }
  ])
})
console.log(messageStore.message)


const[startTimer,setTimer]=createSignal(false)
let timer:number=0;





createEffect(()=>{
    console.log(lastMessage())
})


createEffect(()=>{
    if(newMessage()!=''){
        socket.send(JSON.stringify({
            message:newMessage(),
            sender:authUser().id,
            reciever:userId(),
            type:'message'
        }))
    }

})




    createEffect(()=>{
       if(role.role()!=null){
     
    



        socket.onopen=(event)=>{
    console.log('Web Socket has been opned in the client side')
           

        } 
 

      
        if(userId()!==-1){


                console.log(messages().length)
               
            for(let i=0; i<messages().length; i++)
                {
                  
                    setMessageStore('message',(current)=>[
                        ...current,{
                            id:messages()[i].id,
                            message:messages()[i].content,
                         
                            
    
                        }
                    ])
                }
            
            
           
         

        
            socket.send(JSON.stringify({

                reciever:userId(),
                roomNumber:1,
                sender:authUser().id
            }

            ))

            setInitalMessage(true)
            setTimer(true)

    
           
       
        }}
    })



createEffect(()=>{
    console.log("The value is ",startTimer())
    if(startTimer()){
        setInterval(()=>{
           const currentTime= Date.now();
           const difference=currentTime-lastMessage();
           if(difference>60000)
           {
            socket.send(JSON.stringify({
                type:'left',
                sender:authUser().id

            }))
           }

           

        },1000)
    }
   
 })
 


    const newMessageEntered=(event:Event)=>{
console.log(authUser().id)
       
        event.preventDefault();
  
 
      setMessageStore('message',(current)=>[
        ...current,{
            id:authUser().id,
            message:newMessage()

        }
      ])
      setNewMessage('')
    }

   

       
       return(

        
        
        
        

        <div class="flex flex-col">




    
           
       <Show when={role.role()==='admin'}>
                <CreaterChat setNewMessage={(item)=>setNewMessage(item)} setForm={(event)=>newMessageEntered(event)} newMessage={newMessage()} newRecievedMessage={newRecievedMessage()} messages={messageStore.message} userId={userId()} user={user}   onUserClicked={(item)=>userSelected(item)} items={roomMembers()}>
                    </CreaterChat>
            </Show>




            <Show when={role.role()==='client'}>


          

        

   <div class="flex h-screen w-full max-w-screen-2xl m-auto overflow-hidden">
<aside class="w-full lg:w-1/4 bg-whiterounded-lg mr-5 shadow-md">
<div class="h-full flex flex-col">
    <div class="flex p-10 ">
        <div class="mb-4 text-3xl font-semi-bold text-gray-900">
            Chat
        </div>
        </div>

        
        <div class="flex-1 overflow-y-scroll scrollbar space-y-2">
            <div class="w-full space-y-10">
               
           
                <Show when={roomMembers()}>
                   
                   <ul class="">

              
              
                   <For each={roomMembers()}>
                       {(item)=><li onclick={()=>userSelected(item.room.user)} class="cursor-pointer px-4 py-2 rounded-lg hover:bg-indigo-100 text-black">
                           {item.room.user.name}
                           </li>}
                   </For>
                   </ul>

               </Show>

                </div>
            </div>
        </div>
     



</aside>


        

            

              
            <section class="relative max-h h-full bg-white rounded-lg w-full flex flex-col dark:bg-900 lg:flex">

        
        <div class="flex-1 overflow-y-scroll p-5 scrollbar-thumb dark:scrollbar-thumb-color-dark scrollbar-width space-y-5">

          <Show when={messageStore.message.length==0}>
            Select a Conversation
          </Show>

            <div class="w-full py-3 shadow-md text-black font-extrabold  text-center">
               {user.name}
            </div>

            
                <For each={messageStore.message}>
                    
                    {(item)=>
                
                    <div class={`flex ${item.id===userId()? 'justify-start': 'justify-end'}`}>
                       <div class={`p-4 rounded-lg max-w-xl ${item.id===userId()? 'bg-indigo-800 text-white rounded-l-lg': 'bg-gray-100 text-black rouned-r-lg'}`}>
      



                    <span class="text-sm">
                        {item.id===userId() ?`${user.name}: ${item.message}` : `You :${item.message}` }

                    </span>
                    
                       
                       </div>

                    


                  
                        </div>}
                        
                </For>

            
           

       </div>
        <Show when={messages()}>
        



  <form onSubmit={newMessageEntered}>


                <input value={newMessage()} onchange={(e)=>setNewMessage(e.currentTarget.value)} placeholder="type a message" type="text" class="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 rounded-full py-3 pr-5"/>
               
               <div class="ml-5">

            
                <button class="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-black" type="submit">
                    Send

                </button>
                </div>
             </form>
        
                </Show>
              


 
      
           </section>
           </div>
 
        
           
         

           </Show>
    
           </div>
       )
   
   }
export default Chat;