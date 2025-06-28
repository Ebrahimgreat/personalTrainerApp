import { jsx as _jsx, jsxs as _jsxs } from "hono/jsx/jsx-runtime";
import { For } from "solid-js";
function TotalWorkouts(props) {
    return (_jsxs("div", { class: "bg-white p-4 shadow-md", children: [_jsx("h1", { class: "font-extrabold text-center", children: "Workouts" }), _jsx("ul", { class: " rounded list-decimal divide-y ", children: _jsx(For, { each: props.items, children: (item, key) => (_jsxs("li", { class: `group flex items-center justify-between px-4 py-2 cursor-pointer transition-colors rounded-md ${key() === props.workoutSignal ? ' text-black font-bold shadow-inner' : 'hover:bg-gray-100'}`, onclick: () => props.setWorkoutSignal(key()), children: [_jsx("input", { value: item.name, class: 'w-full px-4 py-2 mb-4  border rounded-lg focus:outline-none focus:ring-2 pink-500" placeholder="5 Day Split', type: "text" }), _jsx("span", { children: _jsx("button", { onClick: () => props.removeItem(key()), children: "X" }) })] })) }) })] }));
}
export default TotalWorkouts;
