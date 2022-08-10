import {useEffect} from "react"
import {useNavigate} from "react-router-dom"
import {useSelector, useDispatch} from "react-redux"
import MatchupForm from "../components/MatchupForm"
import MatchupSearch from "../components/MatchupSearch"
import MatchupItem from "../components/MatchupItem"
import {reset} from "../features/matchups/matchupSlice"

function Dashboard() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user} = useSelector( (state) => state.auth)
    const {matchups, champion1, champion2, isError, message } = useSelector((state) => state.matchup)

    useEffect( ()=>{
        dispatch(reset())
        if(isError){
            console.log(message)
        }
        if(!user){
            navigate("/login")
        }

    }, [user, isError, message])

    return (
        <> 
            <MatchupSearch></MatchupSearch>
            <section className = "content">
                {champion1 && champion2 ? (
                    <div className = "form-group2">
                        <img src = {"https://www.mobafire.com/images/champion/square/" + champion1 + "-60x.png"}></img>
                        <h1> VS </h1>
                        <img src = {"https://www.mobafire.com/images/champion/square/" + champion2 + "-60x.png"}></img>
                    </div>
                ) : ("")}
                {matchups.length > 0 ? (
                        <div className = "schedules">
                            {
                                matchups.map((matchup) => (<MatchupItem key = {matchup._id} matchup = {matchup}></MatchupItem>))
                            }
                            
                        </div>
                ) : ( champion1 && champion2 ? (<h1> No notes for this matchup</h1>) : (<></>) )}
            </section>
            
            {champion1 && champion2 ? (<MatchupForm></MatchupForm>) : (<></>)}

            

        </>
    )
}

export default Dashboard