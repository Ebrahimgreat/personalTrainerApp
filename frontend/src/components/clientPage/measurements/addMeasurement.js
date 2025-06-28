import { jsx as _jsx, jsxs as _jsxs } from "hono/jsx/jsx-runtime";
import { For, Show } from "solid-js";
import Button from "../../ui/button";
import { TextField, TextFieldRoot } from "../../ui/textfield";
function AddMeasurement(props) {
    const submitMeasurement = () => {
        props.submitMeasurement();
        props.setCloseDialog(false);
    };
    return (_jsxs("div", { class: "flex flex-col", children: [_jsx("label", { children: "Date" }), _jsx("input", { value: props.measurementDate, onChange: (e) => props.updateDate(e.currentTarget.value), type: "date", class: "border" }), _jsx("div", { class: "grid grid-cols-2 gap-x-3 mb-2", children: _jsx(Show, { when: props.measurements, children: _jsx(For, { each: props.measurements, children: (item, key) => _jsxs("div", { class: "flex flex-col", children: [_jsx("label", { class: "text-gray-600", children: item.name }), _jsx(TextFieldRoot, { children: _jsx(TextField, { value: item.value, type: "number", onChange: (e) => props.updateMeasurement(key(), Number(e.currentTarget.value)), class: "border shadow-md focus:outline-none " }) })] }) }) }) }), _jsx(Button, { onClick: () => submitMeasurement(), variant: "default", children: "Submit" })] }));
}
export default AddMeasurement;
