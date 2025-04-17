
type CardProps={
    header:string
}
function Card(
    {header}:CardProps
    
){
    return(
        <div class="flex flex0col justify-center p-5 rounded-[10%] text-white overflow-hidden border-[1px] border-white/75"
        style={{background:'linear-gradient(to bottom, #51D1F7, #5B7FEF'}}>
            


<div class="flex items-center justify-between z-10">
    <div class="text-2xl font-bold mb-0.5">
       {header}
    </div>
    </div>
        </div>
    )

}
export default Card;