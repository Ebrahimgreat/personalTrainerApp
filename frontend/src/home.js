import { jsxs as _jsxs, jsx as _jsx } from "hono/jsx/jsx-runtime";
import { createEffect, createResource, Suspense } from "solid-js";
import { createSignal, Show, For } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { SignedIn, useAuth } from "clerk-solidjs";
import { Card, CardDescription, CardHeader, CardTitle } from "./components/ui/card";
import { useSearchParams } from "@solidjs/router";
function home() {
    const [searchParams, setSearchParams] = useSearchParams();
    const { getToken } = useAuth();
    const { isSignedIn } = useAuth();
    async function removeWeight(item) {
        try {
            const { getToken } = useAuth();
            const token = await getToken();
            console.log(token);
            const data = await fetch('http://localhost:3001/api/weight/remove', {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                credentials: 'include',
                method: 'POST',
                body: JSON.stringify({
                    id: item.id
                })
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    const navigate = useNavigate();
    const navigateToClient = (id) => {
        navigate(`/clients/view?=id${id}`);
    };
    const [count, setCount] = createSignal(0);
    const increment = () => setCount((item) => item + 1);
    const [nutrientPage, setNutrientPage] = createSignal(1);
    const [information, setInformation] = createSignal(1);
    const [message, setMessage] = createSignal('');
    const clients = async () => {
        const response = await fetch('http://localhost:3001/api/dashboard', {
            method: 'GET',
        });
        return response.json();
    };
    const fetchData = async () => {
        const token = await getToken();
        const response = await fetch(`http://localhost:3001/api/dashboard`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.json();
    };
    const [myValue] = createResource(fetchData);
    createEffect(() => {
        if (!isSignedIn()) {
            navigate('/');
        }
    });
    return (_jsx("div", { class: "flex flex-col", children: _jsx(SignedIn, { children: _jsxs(Suspense, { fallback: _jsxs("div", { class: "flex justify-center items-center p-4", children: [_jsxs("svg", { class: "size-6 text-gray-500 animate-spin", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: [_jsx("circle", { class: "opacity-25", cx: "12", cy: "12", r: "10", "stroke-width": "4" }), _jsx("path", { class: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z" })] }), _jsx("span", { children: "Loading" })] }), children: [_jsxs(Show, { when: myValue(), children: [_jsxs("h1", { class: " font-bold", children: ["Welcome ", myValue()[0].name] }), _jsx("span", { class: "font-extralight", children: "Get an overview of your Clients Progress" })] }), _jsx("div", { class: "flex items-center justify-center", children: _jsx(Card, { class: "bg-gray-100 border-gray-300 h-[100px] w-[350px] mb-10", children: _jsxs(CardHeader, { class: "p-4 space-y-2", children: [_jsx(CardTitle, { class: "text-lg text-center", children: "Total Clients" }), _jsx(CardDescription, { children: _jsx(Show, { when: myValue(), children: _jsx(For, { each: myValue(), children: (item) => _jsx("p", { class: "text-center", children: item.children.length }) }) }) })] }) }) }), _jsx(Card, { class: "shadow-md w-full border-gray-300 h-[350px] overflow-auto", children: _jsxs(CardHeader, { children: [_jsx(CardTitle, { class: "text-lg text-center", children: "Total Clients" }), _jsx("ul", { class: "list-decimal", children: _jsx(CardDescription, { children: _jsx(Show, { when: myValue(), children: _jsx(For, { each: myValue(), children: (item) => (_jsx(For, { each: item.children, children: (child) => (_jsx("li", { onclick: () => navigateToClient(child.id), class: "text-sm hover:bg-gray-200 cursor-pointer text-gray-700 text-center", children: child.name })) })) }) }) }) })] }) })] }) }) }));
}
export default home;
