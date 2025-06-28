import { jsx as _jsx, jsxs as _jsxs } from "hono/jsx/jsx-runtime";
import { For } from "solid-js";
function MeasurementLibrary(props) {
    function setMeasurements(item) {
        props.setMeasurementId(item?.id);
        props.setMeasurementName(item.name);
    }
    return (_jsxs("div", { class: "h-full overflow-y-auto flex flex-col bg-white shadow-xl", children: [_jsxs("div", { class: "border-b px-6 py-3", children: [_jsx("h1", { class: "text-3xl font-semibold text-gray-600", children: "Measurements" }), _jsx("div", { class: "flex flex-row justify-around mr-10 ml-10" })] }), _jsx("ul", { children: _jsx(For, { each: props.measurements, children: (item) => _jsx("li", { onclick: () => setMeasurements(item), class: "cursor-pointer px-4 py-2 rounded-lg hover:bg-indigo-100 text-grey-600", children: item.name }) }) })] }));
}
export default MeasurementLibrary;
