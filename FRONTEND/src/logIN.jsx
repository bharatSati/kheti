import { SignorLog } from "./signorlog/signorlog.jsx"

export default function LogIn(){
    let props = {
        type: `LOGIN`,
        s1:"Don't have an account?",
        s2:"\u00A0Sign Up Here for free!",
        source: "/signup"
    }
    return (
        <SignorLog props = {props}></SignorLog>
    )
}