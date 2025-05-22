type inputProps={

    value:string|number
}

function InputField(props:inputProps)
{
    return(
        <input value={props.value} class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-blue-500 ">

        </input>
    )
}
export default InputField