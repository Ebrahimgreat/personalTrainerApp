
import { SignUp } from "clerk-solidjs";
function signup(){
    return(

        <div class="flex flex-col items-center justify-center min-h-screen">
        <SignUp   signInUrl="/login">

        </SignUp>
        </div>
    )


}
export default signup;