import { jsx as _jsx, jsxs as _jsxs } from "hono/jsx/jsx-runtime";
function SearchBar(props) {
    function handleChange(value) {
        console.log(props.input);
    }
    return (_jsxs("div", { class: "bg-[#2f3134] w-full rounded-lg h-[12] p-4 shadow-lg", children: ["Search Bar", _jsx("input", { value: props.input, onChange: (e) => handleChange(e.target.value), type: "text", placeholder: "search" })] }));
}
export default SearchBar;
