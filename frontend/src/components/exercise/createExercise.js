import { jsx as _jsx, jsxs as _jsxs } from "hono/jsx/jsx-runtime";
import { For } from "solid-js";
import Button from "../button";
import { submitForm, exercise, setExercise } from "../CreateExerciseForm";
const exerciseType = ['chest', 'biceps', 'triceps', 'rear delts'];
function CreateExercise() {
    function handleSubmit(event) {
        event.preventDefault();
        submitForm();
    }
    const options = ['Chest', 'arms', 'Bicep', 'Tricep', 'Legs'];
    return (_jsx("div", { children: _jsxs("form", { onSubmit: handleSubmit, class: "  rounded px-8 pt-6 pb-8 mb-4", children: [_jsxs("div", { class: "mb-4", children: [_jsx("label", { class: "block text-gray-700 text-sm font-bold mb-2", children: "Exercise Name" }), _jsx("input", { value: exercise.name, onChange: (e) => setExercise('name', e.currentTarget.value), class: "shadow appearance-none border border-gray-300 w-full rounded-xl focus:outline-none focus:ring-2 py-2 px-3 mb-2 " }), _jsx("label", { class: "block text-gray-700 text-sm font-bold mb-2", children: "Equipment" }), _jsx("select", { class: "w-full shadow appearance-none border border-gray-300 rounded-xl focus:outline-none focus:ring-2 py-2 px-3 mb-2 ", children: _jsx(For, { each: exerciseType, children: (item) => _jsx("option", { children: item }) }) }), _jsx("label", { class: "block text-gray-700 text-sm font-bold mb-2", children: "Type" }), _jsx("select", { value: exercise.type, onchange: (e) => setExercise("type", e.currentTarget.value), class: " w-full shadow appearance-none border border-gray-300 rounded-xl focus:outline-none focus:ring-2 py-2 px-3 mb-2", children: _jsx(For, { each: options, children: (item) => _jsx("option", { children: item }) }) })] }), _jsx("label", { class: "block text-gray-700 text-sm font-bold mb-2", children: "Instructions" }), _jsx("textarea", { class: "w-full shadow appearance-none border border-gray-300 rounded-xl focus:outline-none focus:ring-2 py-2 px-3 mb-2 " }), _jsx(Button, { children: "Submit" })] }) }));
}
export default CreateExercise;
