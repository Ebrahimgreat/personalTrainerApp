
import { useLocation } from "@solidjs/router"
import { createSignal } from "solid-js"
import { TextField,TextFieldLabel,TextFieldRoot } from "../ui/textfield"
import Exercise from "../../Exercise"
import ExerciseLibrary from "../exercise/exerciseLibrary"

type props={
    templateName:string,
    onChange:(item:string)=>void
}




function TemplateDescription(props:props)
{
    

    return(
        <div>
         <TextFieldRoot class="w-full px-4 py-2">
            <TextFieldLabel>
                Template Name
            </TextFieldLabel>
            
            <TextField onChange={(e)=>props.onChange(e.currentTarget.value)} value={props.templateName} type="text">


            </TextField>
            </TextFieldRoot>
           
        </div>

        
    )

}
export default TemplateDescription;