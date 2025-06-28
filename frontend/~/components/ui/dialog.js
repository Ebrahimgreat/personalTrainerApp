import { jsx as _jsx, jsxs as _jsxs } from "hono/jsx/jsx-runtime";
import { splitProps } from "solid-js";
import * as DialogPrimitive from "@kobalte/core/dialog";
import { cn } from "~/lib/utils";
const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = (props) => {
    const [, rest] = splitProps(props, ["children"]);
    return (_jsx(DialogPrimitive.Portal, { ...rest, children: _jsx("div", { class: "fixed inset-0 z-50 flex items-start justify-center sm:items-center", children: props.children }) }));
};
const DialogOverlay = (props) => {
    const [, rest] = splitProps(props, ["class"]);
    return (_jsx(DialogPrimitive.Overlay, { class: cn("fixed inset-0 z-50 bg-background/80 data-[expanded]:animate-in data-[closed]:animate-out data-[closed]:fade-out-0 data-[expanded]:fade-in-0", props.class), ...rest }));
};
const DialogContent = (props) => {
    const [, rest] = splitProps(props, ["class", "children"]);
    return (_jsxs(DialogPortal, { children: [_jsx(DialogOverlay, {}), _jsxs(DialogPrimitive.Content, { class: cn("fixed left-1/2 top-1/2 z-50 grid max-h-screen w-full max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 overflow-y-auto border bg-background p-6 shadow-lg duration-200 data-[expanded]:animate-in data-[closed]:animate-out data-[closed]:fade-out-0 data-[expanded]:fade-in-0 data-[closed]:zoom-out-95 data-[expanded]:zoom-in-95 data-[closed]:slide-out-to-left-1/2 data-[closed]:slide-out-to-top-[48%] data-[expanded]:slide-in-from-left-1/2 data-[expanded]:slide-in-from-top-[48%] sm:rounded-lg", props.class), ...rest, children: [props.children, _jsxs(DialogPrimitive.CloseButton, { class: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[expanded]:bg-accent data-[expanded]:text-muted-foreground", children: [_jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round", class: "size-4", children: [_jsx("path", { d: "M18 6l-12 12" }), _jsx("path", { d: "M6 6l12 12" })] }), _jsx("span", { class: "sr-only", children: "Close" })] })] })] }));
};
const DialogHeader = (props) => {
    const [, rest] = splitProps(props, ["class"]);
    return (_jsx("div", { class: cn("flex flex-col space-y-1.5 text-center sm:text-left", props.class), ...rest }));
};
const DialogFooter = (props) => {
    const [, rest] = splitProps(props, ["class"]);
    return (_jsx("div", { class: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", props.class), ...rest }));
};
const DialogTitle = (props) => {
    const [, rest] = splitProps(props, ["class"]);
    return (_jsx(DialogPrimitive.Title, { class: cn("text-lg font-semibold leading-none tracking-tight", props.class), ...rest }));
};
const DialogDescription = (props) => {
    const [, rest] = splitProps(props, ["class"]);
    return (_jsx(DialogPrimitive.Description, { class: cn("text-sm text-muted-foreground", props.class), ...rest }));
};
export { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription };
