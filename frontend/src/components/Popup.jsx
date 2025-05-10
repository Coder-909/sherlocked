import React,{useContext,useState} from 'react'
import {UserContext} from "../App.jsx"
import {useNavigate} from "react-router-dom";

const popup = ({setPopup}) => {
    const {user,setUser} = useContext(UserContext);
    const [passkey,setPasskey] = useState("");
    const navigate = useNavigate();

    const submitHandler = async(e) => {
        e.preventDefault();
        const result = await fetch('http://localhost:3000/bounty/get-bounties', {
            method:"POST",
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.accesstoken}`
            },
            body:JSON.stringify({
                passkey
            })
        })
        const result1 = await result.json();
        // console.log(result1);
        if(result1){
            setUser({
                ...user,
                user:{
                    ...(user.user),
                    assignedBounty:result1.bounty
                }
            })
            setPopup(false);
            navigate('/bugbounty');
        }else{
            console.log("Wrong passkey");
        }
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
