import { jsx as _jsx } from "hono/jsx/jsx-runtime";
import { cn } from "./libs/cn";
import { TextField as TextFieldPrimitive } from "@kobalte/core/text-field";
import { cva } from "class-variance-authority";
import { splitProps } from "solid-js";
export const TextFieldRoot = (props) => {
    const [local, rest] = splitProps(props, ["class"]);
    return _jsx(TextFieldPrimitive, { class: cn("space-y-1", local.class), ...rest });
};
export const textfieldLabel = cva("text-sm data-[disabled]:cursor-not-allowed data-[disabled]:opacity-70 font-medium", {
    variants: {
        label: {
            true: "data-[invalid]:text-destructive",
        },
        error: {
            true: "text-destructive text-xs",
        },
        description: {
            true: "font-normal text-muted-foreground",
        },
    },
    defaultVariants: {
        label: true,
    },
});
export const TextFieldLabel = (props) => {
    const [local, rest] = splitProps(props, ["class"]);
    return (_jsx(TextFieldPrimitive.Label, { class: cn(textfieldLabel(), local.class), ...rest }));
};
export const TextFieldErrorMessage = (props) => {
    const [local, rest] = splitProps(props, [
        "class",
    ]);
    return (_jsx(TextFieldPrimitive.ErrorMessage, { class: cn(textfieldLabel({ error: true }), local.class), ...rest }));
};
export const TextFieldDescription = (props) => {
    const [local, rest] = splitProps(props, [
        "class",
    ]);
    return (_jsx(TextFieldPrimitive.Description, { class: cn(textfieldLabel({ description: true, label: false }), local.class), ...rest }));
};
export const TextField = (props) => {
    const [local, rest] = splitProps(props, ["class"]);
    return (_jsx(TextFieldPrimitive.Input, { class: cn("flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-shadow file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-[1.5px] focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50", local.class), ...rest }));
};
export default TextField;
