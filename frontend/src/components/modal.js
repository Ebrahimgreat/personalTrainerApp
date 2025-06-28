import { jsx as _jsx, jsxs as _jsxs } from "hono/jsx/jsx-runtime";
import { createSignal } from "solid-js";
function Modal({ buttonText, children, title }) {
    let buttonRef = undefined;
    const openHandler = () => {
        setIsOpen(true);
    };
    const [isOpen, setIsOpen] = createSignal(false);
    const [circleMaxSize, setCircleMaxSize] = createSignal(0);
    const [positionButton, setPositionButton] = createSignal({ x: 0, y: 0 });
    return _jsxs("div", { children: [_jsx("button", { ref: buttonRef, class: `border px-4 py-1 rounded-lg text-sm text-white shadow font-semibold bg-black transtion-all duration-500 ${isOpen}? opacity-0: delay-500 opacity-60`, "on:click": openHandler, children: buttonText }), _jsx("div", { class: `fixed inset-0  overflow-hidden flex items-center justify-center transition-all${isOpen() ? "" : "w-0 h-0 delay-500"}`, children: _jsxs("div", { class: ` text-black rounded-lg p-4  overflow-y-auto max-w-xl bg-white shadow-md ${isOpen() ? " h-full translate-y-0 " : "translate-y-[100vh]"}`, children: [_jsxs("div", { class: "flex flex-row justify-between border-b", children: [_jsx("h1", { class: "font-bold", children: title }), _jsx("button", { onClick: () => setIsOpen(false), class: "border px-4 py-1 rounded-lg text-sm text-white bg-black", children: "X" })] }), children] }) })] });
}
export default Modal;
