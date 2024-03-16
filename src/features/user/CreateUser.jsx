import { useState } from "react"
import Button from "../../UI/Button"
import { useDispatch } from "react-redux"
import { updatename } from "./userSlice"
import { useNavigate } from "react-router-dom"

function CreateUser() {
    
    const [username, setUsername] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate();

    function handleSubmit(e){
        e.preventDefault()

        if(!username) return
        dispatch(updatename(username))
        navigate('/menu')
    }
    
    
    return (
        <div>
            <p className="mb-4 text-sm md:text-base">👋Welcome! Please start by entering your name </p>
            <form onSubmit={handleSubmit}>
                <input type="text" value={username}
                placeholder="Your Full Name" onChange={(e) => setUsername(e.target.value)}
                className="w-72 input mb-8"    
                />
                {username !== '' && (<div><Button type='primary'>Start Ordering</Button></div>)}
            </form>
        </div>
    )
}

export default CreateUser
