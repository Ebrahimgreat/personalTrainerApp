import { jsx as _jsx, jsxs as _jsxs } from "hono/jsx/jsx-runtime";
import { Show } from "solid-js";
function AboutExercise(props) {
    return (_jsx("div", { class: "bg-white shadow-xl", children: _jsxs(Show, { when: props.name != '', children: [_jsx("h1", { class: "text-center font-bold ", children: props.name }), _jsx("h2", { class: "font-semibold ml-10", children: "About" }), _jsxs("p", { children: [_jsx("span", { class: " ml-10", children: "Equipment:" }), " ", _jsx("span", { class: "font-light", children: props.equipment })] }), _jsx("p", { children: _jsxs("span", { class: " ml-10", children: ["Target Muscle Group ", _jsx("span", { class: "font-extralight", children: props.targetMuscleGroup })] }) })] }) }));
}
export default AboutExercise;
