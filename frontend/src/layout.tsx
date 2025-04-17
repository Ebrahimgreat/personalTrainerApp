import{Router,Route, } from "@solidjs/router";

import home from "./home";
import { render } from "solid-js/web";
const layout=(props)=>{
    return(
        <>
        <header>
            Header
           
        </header>
        <main>
            {props.children}
        </main>
        </>
    );
};

export default layout;