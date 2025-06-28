import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "hono/jsx/jsx-runtime";
import { createBrowserClient } from '@supabase/ssr';
import { hc } from 'hono/client';
import { useEffect, useState } from 'hono/jsx';
import { render } from 'hono/jsx/dom';
const client = hc('/');
const supabase = createBrowserClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);
function App() {
    const [user, setUser] = useState(null);
    // Check client-side if user is logged in:
    useEffect(() => {
        supabase.auth.onAuthStateChange((event, session) => {
            console.log('Auth event:', event);
            if (event === 'SIGNED_OUT') {
                setUser(null);
            }
            else {
                setUser(session?.user);
            }
        });
    }, []);
    return (_jsxs(_Fragment, { children: [_jsx("h1", { children: "Hono Supabase Auth Example!" }), _jsx("h2", { children: "Sign in" }), !user ? (_jsx(SignIn, {})) : (_jsx("button", { type: "button", onClick: () => {
                    window.location.href = '/signout';
                }, children: "Sign out!" })), _jsx("h2", { children: "Example of API fetch()" }), _jsx(UserDetailsButton, {}), _jsx("h2", { children: "Example of database read" }), _jsx("p", { children: "Note that only authenticated users are able to read from the database!" }), _jsx("a", { href: "/countries", children: "Get countries" })] }));
}
function SignIn() {
    return (_jsxs(_Fragment, { children: [_jsxs("p", { children: ["Ready about and enable", ' ', _jsx("a", { href: "https://supabase.com/docs/guides/auth/auth-anonymous", target: "_blank", children: "anonymous signins here!" })] }), _jsx("button", { type: "button", onClick: async () => {
                    const { data, error } = await supabase.auth.signInAnonymously();
                    if (error)
                        return console.error('Error signing in:', error.message);
                    console.log('Signed in client-side!');
                    alert('Signed in anonymously! User id: ' + data?.user?.id);
                }, children: "Anonymous sign in" })] }));
}
const UserDetailsButton = () => {
    const [response, setResponse] = useState(null);
    const handleClick = async () => {
        const response = await client.api.user.$get();
        const data = await response.json();
        const headers = Array.from(response.headers.entries()).reduce((acc, [key, value]) => {
            acc[key] = value;
            return acc;
        }, {});
        const fullResponse = {
            url: response.url,
            status: response.status,
            headers,
            body: data,
        };
        setResponse(JSON.stringify(fullResponse, null, 2));
    };
    return (_jsxs("div", { children: [_jsx("button", { type: "button", onClick: handleClick, children: "Get My User Details" }), response && _jsx("pre", { children: response })] }));
};
const root = document.getElementById('root');
render(_jsx(App, {}), root);
