import { jsx as _jsx, jsxs as _jsxs } from "hono/jsx/jsx-runtime";
import { TextField, TextFieldLabel, TextFieldRoot } from "../ui/textfield";
function TemplateDescription(props) {
    return (_jsx("div", { children: _jsxs(TextFieldRoot, { class: "w-full px-4 py-2", children: [_jsx(TextFieldLabel, { children: "Template Name" }), _jsx(TextField, { onChange: (e) => props.onChange(e.currentTarget.value), value: props.templateName, type: "text" })] }) }));
}
export default TemplateDescription;
