
interface searchProps<T>{
    input:string

}



function SearchBar<T>(props:searchProps<T>)
{

    function handleChange(value)
{
    console.log(props.input)

}
    

    return(
        <div class="bg-[#2f3134] w-full rounded-lg h-[12] p-4 shadow-lg">
            Search Bar
            <input value={props.input} onChange={(e)=>handleChange(e.target.value)} type="text" placeholder="search"/>



        </div>

    );

}
export default SearchBar;
