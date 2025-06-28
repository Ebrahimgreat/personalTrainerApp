import { jsx as _jsx, jsxs as _jsxs } from "hono/jsx/jsx-runtime";
import { For, Show } from "solid-js";
const repRange = ["1-3", "3-6", "6-9", "9-12", "12-15", "15+"];
import Card, { CardContent, CardHeader, CardTitle } from "../ui/card";
import { TextField, TextFieldLabel, TextFieldRoot } from "../ui/textfield";
import Button from "../ui/button";
import { AlertDialog, AlertDialogTrigger } from "../ui/alert-dialog";
function TemplateExercises(props) {
    return _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Exercises" }) }), _jsxs(CardContent, { class: "h-[400px] overflow-y-auto", children: [_jsx(Show, { when: props.detail.length > 0, children: _jsx(For, { each: props.detail, children: (item, key) => (_jsxs("div", { class: "text-black shadow-md p-8 grid grid-cols-3", children: [_jsx(AlertDialog, { children: _jsx(AlertDialogTrigger, { children: _jsx(Button, { onClick: () => props.onDelete(item), children: "Delete" }) }) }), _jsxs(TextFieldRoot, { children: [_jsx("div", { class: "flex flex-col", children: item.exercise.name }), _jsxs("div", { class: "flex flex-col", children: [_jsx(TextFieldLabel, { children: "Sets" }), _jsx(TextField, { onChange: (e) => props.onChange(key(), "sets", Number(e.currentTarget.value)), value: item.sets, type: "number" })] }), _jsx("div", { class: "flex flex-col", children: _jsx("select", { onChange: (e) => props.onChange(key(), "repRange", e.currentTarget.value), value: item.repRange, children: _jsx(For, { each: repRange, children: (item) => _jsx("option", { children: item }) }) }) })] })] })) }) }), _jsx(Show, { when: props.detail.length == 0, children: "No exercises" })] })] });
}
export default TemplateExercises;
