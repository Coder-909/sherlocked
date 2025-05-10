import React,{useState,useContext} from 'react'
import {useNavigate} from "react-router-dom";
import {UserContext} from "../App"

const Register = () => {
	const navigate = useNavigate();
	const [user,setUser] = useContext(UserContext);
    const [details,setDetails] = useState({});

    const handleChange = (e) => {
        const {name,value} = e.target;
        setDetails({
            ...details,
            [name]:value
        })
    }

    // console.log(details);

	const submitHandler = async(e) => {
		e.preventDefault();
		const result = await(await fetch('https://ncs-backend-gilt.vercel.app/auth/register', {
			method:"POST",
			headers:{
				'Content-Type': 'application/json',
			},
			body:JSON.stringify({
				email,password
			})
		})).json();
		if(result.token){
			setUser({
				user:{user},
				accesstoken:result.token
			})
			localStorage.setItem("token",result.token);
			navigate('/');
		}else{
			console.log(result.error);
		}
	}
	return (
		<div id="Register" className='auth-form'> 
			<h1>Register</h1>
			<form onSubmit={submitHandler}>
				<label>Enter your Email:</label>
				<input type="text" value={details.email} onChange={handleChange}/>
				<label>Enter your Teamn name:</label>
				<input type="text" value={details.teamName} onChange={handleChange}/>
				<label>Enter your Teamn Leader name:</label>
				<input type="text" value={details.teamLeaderName} onChange={handleChange}/>
				<label>Enter your Teamn Leader name:</label>
				<input type="text" value={details.teamLeaderName} onChange={handleChange}/>
				<label>Enter your Teamn Leader name:</label>
				<input type="text" value={details.teamLeaderName} onChange={handleChange}/>
				<label>Enter your Teamn Leader name:</label>
				<input type="text" value={details.teamLeaderName} onChange={handleChange}/>
				<label>Enter your Teamn Leader name:</label>
				<input type="text" value={details.teamLeaderName} onChange={handleChange}/>
				<label>Enter your Teamn Leader name:</label>
				<input type="text" value={details.teamLeaderName} onChange={handleChange}/>
				<label>Enter your Teamn Leader name:</label>
				<input type="text" value={details.teamLeaderName} onChange={handleChange}/>
				<label>Enter your Teamn Leader name:</label>
				<input type="text" value={details.teamLeaderName} onChange={handleChange}/>
				<label>Enter your Teamn Leader name:</label>
				<input type="text" value={details.teamLeaderName} onChange={handleChange}/>
				<button type="submit" class="auth-form-submit">Register</button>
			</form>
		</div>
	)
}

export default Register
