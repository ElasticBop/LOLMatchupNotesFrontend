import {useState} from "react"
import {useSelector, useDispatch} from "react-redux"
import {createMatchup} from "../features/matchups/matchupSlice"
import {toast} from "react-toastify"


function MatchupForm(){
    
    const [text, setText] = useState("") ;
    const {champion1, champion2} = useSelector( (state) => state.matchup )

    const dispatch = useDispatch();

    const onSubmit = (e) => {
        e.preventDefault()
        //dispatch(createMatchup(matchup))
        if(!text){
            toast.error("Note cannot be empty")
        }
        else{
            dispatch(createMatchup( { text, champion1, champion2 }))
            setText("");
        }

    }

    return (
        <section className = "form">
            <form onSubmit = {onSubmit}>
                <div className = "form-group">
                    <label htmlFor = "text">Notes about Matchup</label>
                    <input type = "text" name = "text" id = "text" value = {text} onChange = { (e) => setText(e.target.value)}></input>
                </div>
                <div className = "form-group">
                    <button className = "btn btn-block" type = "submit">
                        Add Notes
                    </button>
                </div>
            </form>
        </section>
    )
}

export default MatchupForm