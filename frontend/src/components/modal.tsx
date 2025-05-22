import { createSignal } from "solid-js";
import { JSX,Show } from "solid-js";
interface ModalProps{
    buttonText:string,
    children:JSX.Element,
    onClick?:()=>void,
    title:string


}

function Modal({buttonText,children,title}:ModalProps){
    let buttonRef:any=undefined;

    const openHandler=()=>{
        setIsOpen(true)

    }
    const[isOpen,setIsOpen]=createSignal(false)
    const[circleMaxSize,setCircleMaxSize]=createSignal<number>(0);
    const[positionButton,setPositionButton]=createSignal<{x:number; y:number}>({x:0,y:0});
    return <div>
        <button ref={buttonRef} class={`border px-4 py-1 rounded-lg text-sm text-white shadow font-semibold bg-black transtion-all duration-500 ${isOpen}? opacity-0: delay-500 opacity-60`} on:click={openHandler}>
            {buttonText}

        </button>
      
        
<div
 class={`fixed inset-0  overflow-hidden flex items-center justify-center transition-all${isOpen()? "w-full": "w-0 h-0 delay-500"}`}>
    <div class={` text-black rounded-lg p-4  overflow-y-auto max-w-xl bg-white shadow-md ${isOpen()?  "min-w-screen h-full translate-y-0 ": "translate-y-[100vh]"}`}>
       

       <div class="flex flex-row justify-between border-b">


       <h1 class="font-bold">
  {title}
  </h1>
  <button onClick={()=>setIsOpen(false)} class="border px-4 py-1 rounded-lg text-sm text-white bg-black">

        X
       </button>
       </div>
        {children}
    </div>


    
</div>

       
    </div>

}
export default Modal;