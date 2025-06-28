import { jsx as _jsx, jsxs as _jsxs } from "hono/jsx/jsx-runtime";
import { cn } from "./libs/cn";
import { Dialog as DialogPrimitive } from "@kobalte/core/dialog";
import { splitProps } from "solid-js";
export const Dialog = DialogPrimitive;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogContent = (props) => {
    const [local, rest] = splitProps(props, [
        "class",
        "children",
    ]);
    return (_jsxs(DialogPrimitive.Portal, { children: [_jsx(DialogPrimitive.Overlay, { class: cn("fixed inset-0 z-50 bg-background/80 data-[expanded]:animate-in data-[closed]:animate-out data-[closed]:fade-out-0 data-[expanded]:fade-in-0"), ...rest }), _jsxs(DialogPrimitive.Content, { class: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg data-[closed]:duration-200 data-[expanded]:duration-200 data-[expanded]:animate-in data-[closed]:animate-out data-[closed]:fade-out-0 data-[expanded]:fade-in-0 data-[closed]:zoom-out-95 data-[expanded]:zoom-in-95 data-[closed]:slide-out-to-left-1/2 data-[closed]:slide-out-to-top-[48%] data-[expanded]:slide-in-from-left-1/2 data-[expanded]:slide-in-from-top-[48%] sm:rounded-lg md:w-full", local.class), ...rest, children: [local.children, _jsx(DialogPrimitive.CloseButton, { class: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-[opacity,box-shadow] hover:opacity-100 focus:outline-none focus:ring-[1.5px] focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none", children: _jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", class: "h-4 w-4", children: [_jsx("path", { fill: "none", stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M18 6L6 18M6 6l12 12" }), _jsx("title", { children: "Close" })] }) })] })] }));
};
export const DialogTitle = (props) => {
    const [local, rest] = splitProps(props, ["class"]);
    return (_jsx(DialogPrimitive.Title, { class: cn("text-lg font-semibold text-foreground", local.class), ...rest }));
};
export const DialogDescription = (props) => {
    const [local, rest] = splitProps(props, ["class"]);
    return (_jsx(DialogPrimitive.Description, { class: cn("text-sm text-muted-foreground", local.class), ...rest }));
};
export const DialogHeader = (props) => {
    const [local, rest] = splitProps(props, ["class"]);
    return (_jsx("div", { class: cn("flex flex-col space-y-2 text-center sm:text-left", local.class), ...rest }));
};
export const DialogFooter = (props) => {
    const [local, rest] = splitProps(props, ["class"]);
    return (_jsx("div", { class: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", local.class), ...rest }));
};
export default Dialog;
