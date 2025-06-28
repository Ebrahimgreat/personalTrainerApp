import { jsx as _jsx, jsxs as _jsxs } from "hono/jsx/jsx-runtime";
import { createResource, Show, For, createSignal, createEffect } from "solid-js";
import Button from "./components/button";
import { submitForm } from "./weightForm";
import { useNavigate } from "@solidjs/router";
import Modal from "./components/modal";
import CreateWeight from "./components/weight/createWeight";
import { useAuth } from "clerk-solidjs";
function Weight() {
    const { getToken } = useAuth();
    async function hello() {
        console.log('hi');
        const token = await getToken();
        console.log(token);
    }
    const navigate = useNavigate();
    const fields = ['Date', 'Scale Weight', 'trendWeight', 'Action'];
    const keys = ['created_at', 'scaleWeight', 'trendWeight'];
    const fetchData = async (page) => {
        const { getToken } = useAuth();
        const token = await getToken();
        if (!token) {
            return;
        }
        console.log('fetching data');
        const response = await fetch(`http://localhost:3001/api/weight?page=${page}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.json();
    };
    async function removeData(item) {
        try {
            const isConfirmed = window.confirm('Are you sre you want to remove this record');
            if (isConfirmed) {
                const response = await fetch('http://localhost:3001/api/weight/remove', {
                    method: 'POST',
                    body: JSON.stringify({
                        id: item.id
                    })
                });
                refetch();
            }
            else {
                return;
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    async function handleSubmit(event) {
        const { getToken } = useAuth();
        const token = await getToken();
        console.log("Token", token);
        event.preventDefault();
        submitForm(token);
    }
    const [scaleWeight, setScaleWeight] = createSignal(0);
    const [date, setDate] = createSignal('');
    const [page, setPage] = createSignal(1);
    const [myValue, { refetch }] = createResource(page, fetchData);
    createEffect(() => {
        console.log('page changin', page());
    });
    return (_jsxs("div", { children: [_jsx("div", { class: "flex items-center justify-center", children: _jsx(Modal, { title: "Create Weight", buttonText: "Add", children: _jsx(CreateWeight, {}) }) }), _jsxs(Show, { when: myValue(), children: [_jsx("div", { class: "  overflow-y-auto h-[200px] sm-h-[300px] md:h-[400px] lg:h-[500px]", children: _jsx("div", { class: "overflow-x-auto w-full", children: _jsx("div", { class: "bg-white shadow-md rounded-lg p-4", children: _jsx("ul", { class: "space-y-4", children: _jsx(For, { each: myValue(), children: (item) => _jsxs("li", { class: "  text-gray-700 text-center rounded-lg p-4 shadow-md hover:shadow-xl gap-y-6", children: [_jsx("p", { class: "text-sm", children: new Date(item.created_at).toLocaleDateString() }), _jsxs("p", { class: "text-sm", children: ["Scale Weight: ", item.scaleWeight] }), _jsxs("p", { class: "text-sm", children: ["trend Weight: ", item.TrendWeight] }), _jsx("button", { class: "inline-flex items-center justify-center bg-amber-50  border transition duration-500 ease-in-out  text-black", children: "remove" })] }) }) }) }) }) }), myValue().length == 0 ? 'No weights on this page' : `Showing Results of page${page()}`] }), _jsxs("div", { class: "flex flex-row gap-x-3 overflow-x-auto", children: [_jsx(Button, { onClick: () => setPage(1), children: "1" }), _jsx(Button, { onClick: () => setPage(2), children: "2" }), _jsx(Button, { onClick: () => setPage(3), children: "3" }), _jsx(Button, { onClick: () => setPage(4), children: "4" })] })] }));
}
export default Weight;
