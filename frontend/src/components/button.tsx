

interface ButtonProps{
    children:string
    onClick?:()=>void,
    class?:string,
    type?:"button"|"submit"


}
function button({children,onClick,class:className,type="button"}:ButtonProps)


{

   


    return(
        <button type={type} class={`bg-blue-500 hover:bg-blue-700  text-white text-xs font-bold w-32 h-8   rounded ${className}`} onClick={onClick}>
        {children}
        </button>
    );

}
export default button;
