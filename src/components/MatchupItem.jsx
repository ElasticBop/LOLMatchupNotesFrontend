
import {useDispatch} from "react-redux"
import {deleteMatchup } from "../features/matchups/matchupSlice"
function MatchupItem({matchup}){
    const dispatch = useDispatch()
    return (
        <div className = "schedule">
            <p>{matchup.text}</p>
            <button onClick = { () => dispatch(deleteMatchup(matchup._id))} className = "close">X</button>
        </div>
    )
}

export default MatchupItem