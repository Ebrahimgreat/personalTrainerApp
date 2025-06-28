import { jsx as _jsx } from "hono/jsx/jsx-runtime";
import { cn } from "./libs/cn";
import { Tabs as TabsPrimitive } from "@kobalte/core/tabs";
import { cva } from "class-variance-authority";
import { splitProps } from "solid-js";
export const Tabs = (props) => {
    const [local, rest] = splitProps(props, ["class"]);
    return (_jsx(TabsPrimitive, { class: cn("w-full data-[orientation=vertical]:flex", local.class), ...rest }));
};
export const TabsList = (props) => {
    const [local, rest] = splitProps(props, ["class"]);
    return (_jsx(TabsPrimitive.List, { class: cn("relative flex w-full rounded-lg bg-muted p-1 text-muted-foreground data-[orientation=vertical]:flex-col data-[orientation=horizontal]:items-center data-[orientation=vertical]:items-stretch", local.class), ...rest }));
};
export const TabsContent = (props) => {
    const [local, rest] = splitProps(props, ["class"]);
    return (_jsx(TabsPrimitive.Content, { class: cn("transition-shadow duration-200 focus-visible:outline-none focus-visible:ring-[1.5px] focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background data-[orientation=horizontal]:mt-2 data-[orientation=vertical]:ml-2", local.class), ...rest }));
};
export const TabsTrigger = (props) => {
    const [local, rest] = splitProps(props, ["class"]);
    return (_jsx(TabsPrimitive.Trigger, { class: cn(" cursor-pointer peer relative z-10 inline-flex h-7 w-full items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium outline-none transition-colors disabled:pointer-events-none disabled:opacity-50 data-[selected]:text-foreground", local.class), ...rest }));
};
const tabsIndicatorVariants = cva("absolute transition-all duration-200 outline-none", {
    variants: {
        variant: {
            block: "data-[orientation=horizontal]:bottom-1 data-[orientation=horizontal]:left-0 data-[orientation=vertical]:right-1 data-[orientation=vertical]:top-0 data-[orientation=horizontal]:h-[calc(100%-0.5rem)] data-[orientation=vertical]:w-[calc(100%-0.5rem)] bg-background shadow rounded-md peer-focus-visible:ring-[1.5px] peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background peer-focus-visible:outline-none",
            underline: "data-[orientation=horizontal]:-bottom-[1px] data-[orientation=horizontal]:left-0 data-[orientation=vertical]:-right-[1px] data-[orientation=vertical]:top-0 data-[orientation=horizontal]:h-[2px] data-[orientation=vertical]:w-[2px] bg-primary",
        },
    },
    defaultVariants: {
        variant: "block",
    },
});
export const TabsIndicator = (props) => {
    const [local, rest] = splitProps(props, [
        "class",
        "variant",
    ]);
    return (_jsx(TabsPrimitive.Indicator, { class: cn(tabsIndicatorVariants({ variant: local.variant }), local.class), ...rest }));
};
export default Tabs;
