import { jsx as _jsx, jsxs as _jsxs } from "hono/jsx/jsx-runtime";
import { For } from "solid-js";
function EditExercises(props) {
    const options = ['1-3', '3-6', '6-9', '10-12', '12-15', '15+'];
    return (_jsxs("div", { class: "bg-white", children: [_jsxs("table", { class: "w-full table-fixed text-gray-900", children: [_jsx("thead", { class: "bg-gray-200", children: _jsxs("tr", { children: [_jsx("th", { class: " border text-sm font-light border-gray-300", children: "name" }), _jsx("th", { class: "border px-4 py-2 text-sm font-light border-gray-300", children: "rep Range" }), _jsx("th", { class: "border text-xs px-4 py-2 font-light border-gray-300", children: "weight" }), _jsx("th", { class: "border text-xs px-4 py-2 font-light border-gray-300", children: "Sets" }), _jsx("th", { class: " border px-4 py-2 text-xs font-light borde border-gray-300", children: "Remove" })] }) }), _jsx("tbody", { children: _jsx(For, { each: props.items, children: (item, key) => _jsxs("tr", { onclick: () => {
                                    if (props.selectedIndex == key()) {
                                        props.setSelectedIndex(-1);
                                    }
                                    else {
                                        props.setSelectedIndex(key());
                                    }
                                }, class: props.selectedIndex == key() ? 'bg-blue-300' : 'cursor-pointer hover:bg-amber-50', children: [_jsx("td", { class: "px-4 py-2 text-xs", children: item.name }), _jsx("td", { class: "px-4 py-2 text-xs", children: _jsx("select", { class: "w-18 h-8 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500", name: "repRange", value: item.repRange, onChange: props.onRepRangeChange(key()), children: _jsx(For, { each: options, children: (key) => _jsx("option", { value: key, children: key }) }) }) }), _jsx("td", { class: "px-4 py-2 text-xs", children: _jsx("input", { type: "number", onChange: props.onWeightChange(key()), class: ` w-18 h-8 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`, value: item.weight }) }), _jsx("td", { class: "px-4 py-2", children: _jsx("input", { type: "number", onChange: props.onSetChange(key()), class: ` w-18 h-8 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500` }) }), _jsx("td", { class: "px-4 py-2 text-xs", children: _jsx("button", { onclick: () => props.onRemove(item.id), class: "bg-blue-500 w-8 h-8 rounded-full text-white shadow-md", children: "X" }) })] }) }) })] }), props.children] }));
}
export default EditExercises;
