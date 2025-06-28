import { jsx as _jsx } from "hono/jsx/jsx-runtime";
import { cn } from "./libs/cn";
import { splitProps } from "solid-js";
export const Card = (props) => {
    const [local, rest] = splitProps(props, ["class"]);
    return (_jsx("div", { class: cn("rounded-xl border bg-card text-card-foreground shadow", local.class), ...rest }));
};
export const CardHeader = (props) => {
    const [local, rest] = splitProps(props, ["class"]);
    return (_jsx("div", { class: cn("flex flex-col space-y-1.5 p-6", local.class), ...rest }));
};
export const CardTitle = (props) => {
    const [local, rest] = splitProps(props, ["class"]);
    return (_jsx("h1", { class: cn("font-semibold leading-none tracking-tight", local.class), ...rest }));
};
export const CardDescription = (props) => {
    const [local, rest] = splitProps(props, ["class"]);
    return (_jsx("h3", { class: cn("text-sm text-muted-foreground", local.class), ...rest }));
};
export const CardContent = (props) => {
    const [local, rest] = splitProps(props, ["class"]);
    return _jsx("div", { class: cn("p-6 pt-0", local.class), ...rest });
};
export const CardFooter = (props) => {
    const [local, rest] = splitProps(props, ["class"]);
    return (_jsx("div", { class: cn("flex items-center p-6 pt-0", local.class), ...rest }));
};
export default Card;
