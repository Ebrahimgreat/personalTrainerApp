import { jsx as _jsx, jsxs as _jsxs } from "hono/jsx/jsx-runtime";
import { For } from "solid-js";
function EditProgrammeWorkout(props) {
    _jsxs("div", { class: "bg-white", children: [_jsx("h1", { class: "text-center font-bold", children: props.programmeName }), _jsx("ul", { children: _jsx(For, { each: props.workouts, children: (item) => _jsx("li", { onClick: () => props.workoutClicked(item.name), children: item }) }) })] });
}
export default EditProgrammeWorkout;
