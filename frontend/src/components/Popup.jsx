import React,{useContext,useState} from 'react'
import {UserContext} from "../App.jsx"

const popup = ({setPopup}) => {
    const [user] = useContext(UserContext);
    const [passkey,setPasskey] = useState("");

    const submitHandler = async(e) => {

    }

    return (
        <div className="popup-backdrop" onClick={() => setPopup(false)}>
            <div className='popup' onClick={(e) => e.stopPropagation()}>
                <h1>Bug Bounty</h1>
                <label>Enter the Passkey</label>
                <input 
                    type="password" 
                    placeholder="Enter the Passkey...." 
                    value={passkey}
                    onChange={(e) => {
                        setPasskey(e.target.value);
                    }} />
                <button id="popup-submit" onClick={submitHandler}>Submit</button>
            </div>
        </div>
    )
}

export default popup
