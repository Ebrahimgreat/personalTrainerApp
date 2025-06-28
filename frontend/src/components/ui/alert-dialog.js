import { jsx as _jsx, jsxs as _jsxs } from "hono/jsx/jsx-runtime";
import { cn } from "./libs/cn";
import { AlertDialog as AlertDialogPrimitive } from "@kobalte/core/alert-dialog";
import { splitProps } from "solid-js";
import { buttonVariants } from "./button";
export const AlertDialog = AlertDialogPrimitive;
export const AlertDialogTrigger = AlertDialogPrimitive.Trigger;
export const AlertDialogContent = (props) => {
    const [local, rest] = splitProps(props, [
        "class",
        "children",
    ]);
    return (_jsxs(AlertDialogPrimitive.Portal, { children: [_jsx(AlertDialogPrimitive.Overlay, { class: cn("fixed inset-0 z-50 bg-background/80 data-[expanded]:animate-in data-[closed]:animate-out data-[closed]:fade-out-0 data-[expanded]:fade-in-0") }), _jsx(AlertDialogPrimitive.Content, { class: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg data-[closed]:duration-200 data-[expanded]:duration-200 data-[expanded]:animate-in data-[closed]:animate-out data-[closed]:fade-out-0 data-[expanded]:fade-in-0 data-[closed]:zoom-out-95 data-[expanded]:zoom-in-95 data-[closed]:slide-out-to-left-1/2 data-[closed]:slide-out-to-top-[48%] data-[expanded]:slide-in-from-left-1/2 data-[expanded]:slide-in-from-top-[48%] sm:rounded-lg md:w-full", local.class), ...rest, children: local.children })] }));
};
export const AlertDialogHeader = (props) => {
    const [local, rest] = splitProps(props, ["class"]);
    return (_jsx("div", { class: cn("flex flex-col space-y-2 text-center sm:text-left", local.class), ...rest }));
};
export const AlertDialogFooter = (props) => {
    const [local, rest] = splitProps(props, ["class"]);
    return (_jsx("div", { class: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", local.class), ...rest }));
};
export const AlertDialogTitle = (props) => {
    const [local, rest] = splitProps(props, ["class"]);
    return (_jsx(AlertDialogPrimitive.Title, { class: cn("text-lg font-semibold", local.class), ...rest }));
};
export const AlertDialogDescription = (props) => {
    const [local, rest] = splitProps(props, [
        "class",
    ]);
    return (_jsx(AlertDialogPrimitive.Description, { class: cn("text-sm text-muted-foreground", local.class), ...rest }));
};
export const AlertDialogClose = (props) => {
    const [local, rest] = splitProps(props, ["class"]);
    return (_jsx(AlertDialogPrimitive.CloseButton, { class: cn(buttonVariants({
            variant: "outline",
        }), "mt-2 md:mt-0", local.class), ...rest }));
};
export const AlertDialogAction = (props) => {
    const [local, rest] = splitProps(props, ["class"]);
    return (_jsx(AlertDialogPrimitive.CloseButton, { class: cn(buttonVariants(), local.class), ...rest }));
};
