import { useSelector } from "react-redux";

function Home() {

    const authReducer = useSelector(state => state.authReducer)
    if(authReducer.loggedIn){
    return (<div>
        <h1>What's up, {authReducer.user} ?</h1>
        </div>
    )}
    else{
        return <h1>What's up?</h1>
    }
}

export default Home;