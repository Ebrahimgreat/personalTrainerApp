import { jsx as _jsx } from "hono/jsx/jsx-runtime";
import { For } from "solid-js";
function TabBar(props) {
    return (_jsx("div", { class: "flex flex-row gap-4 p-2  justify-between", children: _jsx(For, { each: props.items, children: (item) => _jsx("p", { onclick: () => props.handleTabChange(item), class: `text-gray-600 ${item === props.selectedTab ? 'border-b border-blue-500' : 'cursor-pointer'}`, children: item }) }) }));
}
export default TabBar;
