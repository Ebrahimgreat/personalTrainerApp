import { jsx as _jsx } from "hono/jsx/jsx-runtime";
import { splitProps } from "solid-js";
import * as ButtonPrimitive from "@kobalte/core/button";
import { cva } from "class-variance-authority";
import { cn } from "~/lib/utils";
const buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
    variants: {
        variant: {
            default: "bg-primary text-primary-foreground hover:bg-primary/90",
            destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
            outline: "border border-input hover:bg-accent hover:text-accent-foreground",
            secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
            ghost: "hover:bg-accent hover:text-accent-foreground",
            link: "text-primary underline-offset-4 hover:underline"
        },
        size: {
            default: "h-10 px-4 py-2",
            sm: "h-9 px-3 text-xs",
            lg: "h-11 px-8",
            icon: "size-10"
        }
    },
    defaultVariants: {
        variant: "default",
        size: "default"
    }
});
const Button = (props) => {
    const [local, others] = splitProps(props, ["variant", "size", "class"]);
    return (_jsx(ButtonPrimitive.Root, { class: cn(buttonVariants({ variant: local.variant, size: local.size }), local.class), ...others }));
};
export { Button, buttonVariants };
