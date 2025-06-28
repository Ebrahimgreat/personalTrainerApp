import { jsx as _jsx, jsxs as _jsxs } from "hono/jsx/jsx-runtime";
import { createStore } from "solid-js/store";
import { useSignIn } from "clerk-solidjs";
import { useNavigate, usePreloadRoute } from "@solidjs/router";
import { useAuth } from "clerk-solidjs";
import { createEffect } from "solid-js";
function LoginPage() {
    const { isLoaded, isSignedIn } = useAuth();
    const preload = usePreloadRoute();
    const navigate = useNavigate();
    const { signIn, setActive } = useSignIn();
    const [signInForm, setSignInForm] = createStore({
        email: '',
        password: ''
    });
    async function submitLogin(event) {
        event.preventDefault();
        try {
            const data = await signIn()?.create({
                identifier: signInForm.email,
                password: signInForm.password
            });
            if (data?.status === 'complete') {
                console.log(data);
                await setActive({ session: data.createdSessionId });
            }
            else {
                console.log(data);
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    const updateFormFields = (formField) => (event) => {
        const inputElement = event.currentTarget;
        console.log(inputElement.value);
        setSignInForm(prev => ({
            ...prev, [formField]: inputElement.value
        }));
    };
    createEffect(() => {
        if (isLoaded() && isSignedIn()) {
            navigate('/home', { replace: true });
        }
    });
    return (_jsxs("div", { class: "flex min-h-full flex-col justify-center px-6 py-12 lg:px-8", children: [_jsxs("div", { class: "sm:mx-auto sm:w-full sm:max-w-sm", children: [_jsx("h1", { class: "text-3xl text-center", children: "Scope Application" }), _jsx("h2", { class: "mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900", children: "Sign in to your account" })] }), _jsxs("div", { class: "mt-10 sm:mx-auto sm:w-full sm:max-w-sm", children: [_jsxs("form", { class: "space-y-6", action: "#", onSubmit: submitLogin, children: [_jsxs("div", { children: [_jsx("label", { for: "email", class: "block text-sm/6 font-medium text-gray-900", children: "Email address" }), _jsx("div", { class: "mt-2", children: _jsx("input", { type: "email", onChange: (e) => setSignInForm('email', e.currentTarget.value), value: signInForm.email, name: "email", id: "email", autocomplete: "email", required: true, class: "block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" }) })] }), _jsxs("div", { children: [_jsx("div", { class: "flex items-center justify-between", children: _jsx("label", { for: "password", class: "block text-sm/6 font-medium text-gray-900", children: "Password" }) }), _jsx("div", { class: "mt-2", children: _jsx("input", { type: "password", onChange: (e) => setSignInForm('password', e.currentTarget.value), name: "password", id: "password", autocomplete: "current-password", required: true, class: "block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" }) })] }), _jsx("div", { children: _jsx("button", { type: "submit", class: "flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", children: "Sign in" }) })] }), _jsxs("p", { class: "mt-10 text-center text-sm/6 text-gray-500", children: ["Dont have account?", _jsx("a", { href: "/signup", class: "font-semibold text-indigo-600 hover:text-indigo-500", children: "Dont have account? Signup here" })] })] })] }));
}
export default LoginPage;
