import { createStore } from "solid-js/store";
import Button from "./components/button";
import { SignedIn, ClerkLoading, SignInButton, SignIn, ClerkLoaded } from "clerk-solidjs";
import { useSignIn } from "clerk-solidjs";
import { redirect, reload, useNavigate, usePreloadRoute } from "@solidjs/router";
import { useAuth } from "clerk-solidjs";
import { createEffect, createSignal, Show } from "solid-js";

type login = {
    email: string,
    password: string
}

function LoginPage() {
    const { isLoaded, isSignedIn } = useAuth();
    const [credentialsInvalid, setCredentialsInvalid] = createSignal('');
    const [isLoading, setIsLoading] = createSignal(false);
    const [showPassword, setShowPassword] = createSignal(false);

    const preload = usePreloadRoute();
    const navigate = useNavigate();
    const { signIn, setActive } = useSignIn();
    
    const [signInForm, setSignInForm] = createStore<login>({
        email: '',
        password: ''
    });

    async function submitLogin(event: Event) {
        event.preventDefault();
        setIsLoading(true);
        setCredentialsInvalid('');
        
        try {
            const data = await signIn()?.create({
                identifier: signInForm.email,
                password: signInForm.password
            });
            
            if (data?.status === 'complete') {
                console.log("data");
                await setActive({ session: data.createdSessionId });
            } else {
                console.log("Data", data);
            }
        } catch (error) {
            console.log(error);
            setCredentialsInvalid("Invalid email or password. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    createEffect(() => {
        if (isLoaded() && isSignedIn()) {
            navigate('/home', { replace: true });
        }
    });

    return (
        <div class="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center px-4 py-8">
            {/* Background decoration */}
            <div class="absolute inset-0 overflow-hidden pointer-events-none">
                <div class="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-br from-indigo-200/30 to-purple-200/30 blur-3xl"></div>
                <div class="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-gradient-to-tr from-blue-200/30 to-indigo-200/30 blur-3xl"></div>
            </div>

            <div class="relative w-full max-w-md">
                {/* Main card */}
                <div class="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8 space-y-8 animate-fade-in-up">
                    {/* Header */}
                    <div class="text-center space-y-2">
                       
                        <h1 class="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            Scope Application
                        </h1>
                        <p class="text-gray-600">Welcome back! Please sign in to continue</p>
                    </div>

                    {/* Form */}
                    <form class="space-y-6" onSubmit={submitLogin}>
                        {/* Email field */}
                        <div class="space-y-2">
                            <label for="email" class="block text-sm font-semibold text-gray-700">
                                Email address
                            </label>
                            <div class="relative group">
                                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg class="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path>
                                    </svg>
                                </div>
                                <input 
                                    type="email" 
                                    onChange={(e) => setSignInForm('email', e.currentTarget.value)} 
                                    value={signInForm.email} 
                                    name="email" 
                                    id="email" 
                                    autocomplete="email" 
                                    required 
                                    class="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 hover:border-gray-300" 
                                    placeholder="Enter your email"
                                />
                            </div>
                        </div>

                        {/* Password field */}
                        <div class="space-y-2">
                            <label for="password" class="block text-sm font-semibold text-gray-700">
                                Password
                            </label>
                            <div class="relative group">
                                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg class="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                                    </svg>
                                </div>
                                <input 
                                    type={showPassword() ? "text" : "password"}
                                    onChange={(e) => setSignInForm('password', e.currentTarget.value)} 
                                    name="password" 
                                    id="password" 
                                    autocomplete="current-password" 
                                    required 
                                    class="block w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 hover:border-gray-300" 
                                    placeholder="Enter your password"
                                />
                                <button 
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword())}
                                    class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <Show when={showPassword()} fallback={
                                        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                                        </svg>
                                    }>
                                        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"></path>
                                        </svg>
                                    </Show>
                                </button>
                            </div>
                        </div>

                        {/* Error message */}
                        <Show when={credentialsInvalid()}>
                            <div class="bg-red-50 border border-red-200 rounded-lg p-3 animate-shake">
                                <div class="flex items-center">
                                    <svg class="h-5 w-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                    <p class="text-sm text-red-700">{credentialsInvalid()}</p>
                                </div>
                            </div>
                        </Show>

                        {/* Submit button */}
                        <button 
                            type="submit" 
                            disabled={isLoading()}
                            class="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                        >
                            <Show when={isLoading()} fallback="Sign in to your account">
                                <div class="flex items-center justify-center">
                                    <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Signing in...
                                </div>
                            </Show>
                        </button>
                    </form>

                    {/* Signup link */}
                    <div class="text-center pt-4 border-t border-gray-100">
                        <p class="text-gray-600">
                            Don't have an account?{' '}
                            <a 
                                href="/signup" 
                                class="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 transition-all duration-200"
                            >
                                Sign up here
                            </a>
                        </p>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes fade-in-up {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-5px); }
                    75% { transform: translateX(5px); }
                }

                .animate-fade-in-up {
                    animation: fade-in-up 0.6s ease-out;
                }

                .animate-shake {
                    animation: shake 0.5s ease-in-out;
                }
            `}</style>
        </div>
    );
}

export default LoginPage;