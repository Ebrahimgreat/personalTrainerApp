import { jsx as _jsx, jsxs as _jsxs } from "hono/jsx/jsx-runtime";
import { cn } from "../libs/cn";
import { DropdownMenu as DropdownMenuPrimitive } from "@kobalte/core/dropdown-menu";
import { mergeProps, splitProps } from "solid-js";
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
export const DropdownMenuGroup = DropdownMenuPrimitive.Group;
export const DropdownMenuSub = DropdownMenuPrimitive.Sub;
export const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;
export const DropdownMenu = (props) => {
    const merge = mergeProps({
        gutter: 4,
        flip: false,
    }, props);
    return _jsx(DropdownMenuPrimitive, { ...merge });
};
export const DropdownMenuContent = (props) => {
    const [local, rest] = splitProps(props, [
        "class",
    ]);
    return (_jsx(DropdownMenuPrimitive.Portal, { children: _jsx(DropdownMenuPrimitive.Content, { class: cn("min-w-8rem z-50 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md transition-shadow focus-visible:outline-none focus-visible:ring-[1.5px] focus-visible:ring-ring data-[expanded]:animate-in data-[closed]:animate-out data-[closed]:fade-out-0 data-[expanded]:fade-in-0 data-[closed]:zoom-out-95 data-[expanded]:zoom-in-95", local.class), ...rest }) }));
};
export const DropdownMenuItem = (props) => {
    const [local, rest] = splitProps(props, [
        "class",
        "inset",
    ]);
    return (_jsx(DropdownMenuPrimitive.Item, { class: cn("relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", local.inset && "pl-8", local.class), ...rest }));
};
export const DropdownMenuGroupLabel = (props) => {
    const [local, rest] = splitProps(props, [
        "class",
    ]);
    return (_jsx(DropdownMenuPrimitive.GroupLabel, { as: "div", class: cn("px-2 py-1.5 text-sm font-semibold", local.class), ...rest }));
};
export const DropdownMenuItemLabel = (props) => {
    const [local, rest] = splitProps(props, [
        "class",
    ]);
    return (_jsx(DropdownMenuPrimitive.ItemLabel, { as: "div", class: cn("px-2 py-1.5 text-sm font-semibold", local.class), ...rest }));
};
export const DropdownMenuSeparator = (props) => {
    const [local, rest] = splitProps(props, [
        "class",
    ]);
    return (_jsx(DropdownMenuPrimitive.Separator, { class: cn("-mx-1 my-1 h-px bg-muted", local.class), ...rest }));
};
export const DropdownMenuShortcut = (props) => {
    const [local, rest] = splitProps(props, ["class"]);
    return (_jsx("span", { class: cn("ml-auto text-xs tracking-widest opacity-60", local.class), ...rest }));
};
export const DropdownMenuSubTrigger = (props) => {
    const [local, rest] = splitProps(props, [
        "class",
        "children",
    ]);
    return (_jsxs(DropdownMenuPrimitive.SubTrigger, { class: cn("flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[expanded]:bg-accent", local.class), ...rest, children: [local.children, _jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "1em", height: "1em", viewBox: "0 0 24 24", class: "ml-auto h-4 w-4", children: [_jsx("path", { fill: "none", stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "m9 6l6 6l-6 6" }), _jsx("title", { children: "Arrow" })] })] }));
};
export const DropdownMenuSubContent = (props) => {
    const [local, rest] = splitProps(props, [
        "class",
    ]);
    return (_jsx(DropdownMenuPrimitive.Portal, { children: _jsx(DropdownMenuPrimitive.SubContent, { class: cn("min-w-8rem z-50 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[expanded]:animate-in data-[closed]:animate-out data-[closed]:fade-out-0 data-[expanded]:fade-in-0 data-[closed]:zoom-out-95 data-[expanded]:zoom-in-95", local.class), ...rest }) }));
};
export const DropdownMenuCheckboxItem = (props) => {
    const [local, rest] = splitProps(props, [
        "class",
        "children",
    ]);
    return (_jsxs(DropdownMenuPrimitive.CheckboxItem, { class: cn("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", local.class), ...rest, children: [_jsx(DropdownMenuPrimitive.ItemIndicator, { class: "absolute left-2 inline-flex h-4 w-4 items-center justify-center", children: _jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", class: "h-4 w-4", children: [_jsx("path", { fill: "none", stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "m5 12l5 5L20 7" }), _jsx("title", { children: "Checkbox" })] }) }), props.children] }));
};
export const DropdownMenuRadioItem = (props) => {
    const [local, rest] = splitProps(props, [
        "class",
        "children",
    ]);
    return (_jsxs(DropdownMenuPrimitive.RadioItem, { class: cn("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", local.class), ...rest, children: [_jsx(DropdownMenuPrimitive.ItemIndicator, { class: "absolute left-2 inline-flex h-4 w-4 items-center justify-center", children: _jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", class: "h-2 w-2", children: [_jsxs("g", { fill: "none", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", children: [_jsx("path", { d: "M0 0h24v24H0z" }), _jsx("path", { fill: "currentColor", d: "M7 3.34a10 10 0 1 1-4.995 8.984L2 12l.005-.324A10 10 0 0 1 7 3.34" })] }), _jsx("title", { children: "Radio" })] }) }), props.children] }));
};
