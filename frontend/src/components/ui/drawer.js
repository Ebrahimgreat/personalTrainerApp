import { jsx as _jsx, jsxs as _jsxs } from "hono/jsx/jsx-runtime";
import { cn } from "./libs/cn";
import DrawerPrimitive from "@corvu/drawer";
import { splitProps } from "solid-js";
export const Drawer = DrawerPrimitive;
export const DrawerTrigger = DrawerPrimitive.Trigger;
export const DrawerClose = DrawerPrimitive.Close;
export const DrawerContent = (props) => {
    const [local, rest] = splitProps(props, [
        "class",
        "children",
    ]);
    const ctx = DrawerPrimitive.useContext();
    return (_jsxs(DrawerPrimitive.Portal, { children: [_jsx(DrawerPrimitive.Overlay, { class: "fixed inset-0 z-50 data-[transitioning]:transition-colors data-[transitioning]:duration-200", style: {
                    "background-color": `hsl(var(--background) / ${0.8 * ctx.openPercentage()})`,
                } }), _jsxs(DrawerPrimitive.Content, { class: cn("fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-xl border bg-background after:absolute after:inset-x-0 after:top-full after:h-[50%] after:bg-inherit data-[transitioning]:transition-transform data-[transitioning]:duration-200 md:select-none", local.class), ...rest, children: [_jsx("div", { class: "mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" }), local.children] })] }));
};
export const DrawerHeader = (props) => {
    const [local, rest] = splitProps(props, ["class"]);
    return (_jsx("div", { class: cn("grid gap-1.5 p-4 text-center sm:text-left", local.class), ...rest }));
};
export const DrawerFooter = (props) => {
    const [local, rest] = splitProps(props, ["class"]);
    return (_jsx("div", { class: cn("mt-auto flex flex-col gap-2 p-4", local.class), ...rest }));
};
export const DrawerLabel = (props) => {
    const [local, rest] = splitProps(props, ["class"]);
    return (_jsx(DrawerPrimitive.Label, { class: cn("text-lg font-semibold leading-none tracking-tight", local.class), ...rest }));
};
export const DrawerDescription = (props) => {
    const [local, rest] = splitProps(props, ["class"]);
    return (_jsx(DrawerPrimitive.Description, { class: cn("text-sm text-muted-foreground", local.class), ...rest }));
};
