import { jsx as _jsx } from "hono/jsx/jsx-runtime";
import { SignUp } from "clerk-solidjs";
function Register() {
    return (_jsx("div", { children: _jsx(SignUp, {}) }));
}
export default Register;
