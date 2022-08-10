import {useState, useEffect} from "react"
import {useSelector, useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom"
import {toast} from "react-toastify"
import {register, reset} from "../features/auth/authSlice"

function Register() {
    const [formData, setFormData] = useState({
        name: "",
        password: "",
    })

    const {name,password} = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user, isError, isSuccess, message} = useSelector( (state) => state.auth) 


    //you might need to use useeffect, you could check it using the subscriber thing
    useEffect( () => {
        if(isError) {
            toast.error(message)
        }
        if(isSuccess || user) {
            navigate("/")
        }
        dispatch(reset())
    }, [user, isError, isSuccess, message, navigate, dispatch]) 


    const onChange = (e) => {
        //passing a function allows use of prev state
        setFormData((prevState)=> ({
            ...prevState,
            [e.target.id]: e.target.value
        }))
    }
    
    const onSubmit = (e) => {
        e.preventDefault()
        const userData = {
            name, password
        }
        dispatch(register(userData))
    }

    return (
        <>
            <section className = "heading">
                <p> League of Legends Matchup Notes </p>
                <h1>
                    Register
                </h1>
            </section>

            <section className = "form">
                <form onSubmit = {onSubmit}>
                    <div className = "form-group">
                        <input type = "text" className = "form-control" id = "name" name = "name" value = {name} placeholder = "Enter your name" onChange = {onChange}>
                        </input>

                    </div>
                    <div className = "form-group">
                        <input type = "password" className = "form-control" id = "password" name = "password" value = {password} placeholder = "Enter your password" onChange = {onChange}>

                        </input>
                    </div>
                    <div className = "form-group">
                        <button type="submit" className = "btn btn-block">Submit</button>
                    </div>
                </form>
            </section>
        </>
        
    )
}

export default Register