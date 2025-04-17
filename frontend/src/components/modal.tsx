import { createSignal } from "solid-js";
import { JSX,Show } from "solid-js";
interface ModalProps{
    buttonText:string,
    children:JSX.Element,
    onClick?:()=>void,

}

function Modal({buttonText,children}:ModalProps){
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
 class={`fixed inset-0  overflow-hidden flex items-center justify-center transition-all${isOpen()? "w-screen h-screen": "w-0 h-0 delay-500"}`}>
    <div class={`bg-black text-white rounded-lg p-4 min-w-[400px] max-w-xl shadow-md ${isOpen()? "translate-y-0 ": "translate-y-[100vh]"}`}>
       <button onClick={()=>setIsOpen(false)} class="border px-4 py-1 rounded-lg text-sm text-white bg-black">

        Close
       </button>
        {children}
    </div>

    
</div>

       
    </div>

}
export default Modal;