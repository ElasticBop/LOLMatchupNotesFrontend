import {useState} from "react"
import {useSelector, useDispatch} from "react-redux"
import {setChampions,getMatchups} from "../features/matchups/matchupSlice"


function MatchupSearch(){
    const [champs, setChamps] = useState({
        champ1: "",
        champ2: ""
    })
    const dispatch = useDispatch();

    const {champion1, champion2}  = useSelector((state) => state.matchup)

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(setChampions({
            champion1: champs.champ1,
            champion2: champs.champ2
        }))
        dispatch(getMatchups({champion1: champs.champ1, champion2: champs.champ2}))
        console.log("doing")
    }

    const onChange = (e) => {
        setChamps( ( prevChamps) => ({
            ...prevChamps,
            [e.target.id] : e.target.value
        }));
    }

    return (
        <section className = "form">
            <form onSubmit = {onSubmit}>
                <div className = "form-group form-group2">
                    <div>
                        <label htmlFor = "champ1">Champion 1</label>
                        <input type = "text" name ="champ1" id = "champ1" value = {champs.champ1} onChange = {onChange}></input>
                    </div>
                    <div>
                        <label htmlFor = "champ2">Champion 2</label>
                        <input type = "text" name ="champ2" id = "champ2" value = {champs.champ2} onChange = {onChange}></input>
                    </div>
                </div>
                <div className = "form-group">
                    <button className = "btn btn-block" type = "submit">
                        Search
                    </button>
                </div>
            </form>
        </section>
    )
}

export default MatchupSearch