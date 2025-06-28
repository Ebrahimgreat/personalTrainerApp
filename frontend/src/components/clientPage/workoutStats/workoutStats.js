import { jsx as _jsx, jsxs as _jsxs } from "hono/jsx/jsx-runtime";
import Button from "../../ui/button";
import { For, Show, createSignal } from "solid-js";
function WorkoutStats(props) {
    function addDays(date, days) {
        const newDate = new Date(date.getTime() + days * 24 * 60 * 60 * 1000);
        return new Date(newDate).toDateString();
    }
    const [startDate, setStartDate] = createSignal(new Date().toDateString());
    const [endDate, setEndDate] = createSignal(addDays(new Date(startDate()), 7));
    return (_jsxs("div", { class: "bg-gray-50 shadow-lg rounded-2xl p-6 max-w-md mx-auto", children: [_jsxs("div", { class: "flex row justify-between", children: [_jsx(Button, { variant: "outline", onclick: () => props.backButtonPressed(), children: "Back" }), _jsx(Button, { variant: "outline", onclick: () => props.NextButtonPressed(), children: "Next" })] }), _jsxs("h1", { class: "font-bold text-center", children: ["Weekly Stats", _jsxs("span", { class: "text-gray-900", children: [props.startDate, "---", props.endDate] })] }), _jsx(Show, { when: props?.stats.length > 0, fallback: _jsx("p", { class: "text-center text-gray-500", children: "No Workout Found" }), children: _jsx(For, { each: props.stats, children: (item) => _jsxs("div", { class: "flex flex-row justify-between  px-3 py-3 gap-x-4", children: [_jsx("span", { class: "font-bold" }), " ", item?.equipmentName ?? "", _jsx("p", { children: _jsxs("span", { children: ["Set:", _jsx("span", { class: "font-bold", children: item.stats?.totalSets ?? 0 })] }) }), _jsxs("span", { children: ["Volume:", item.stats?.totalVolume ?? 0] })] }) }) })] }));
}
export default WorkoutStats;
