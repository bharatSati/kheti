import { SignorLog } from "./signorlog/signorlog.jsx"




export default function signUp(){
    let props = {
        type: `SIGN UP`,
        s1:"Already have an account?",
        s2:"\u00A0Login here!",
        source: "/login"
    }
    return (
        <SignorLog props = {props}></SignorLog>
    )
}