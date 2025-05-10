import React,{useState,useContext} from 'react'
import {useNavigate} from "react-router-dom";
import {UserContext} from "../App"

const Login = ({}) => {
	const navigate = useNavigate();
	const [user,setUser] = useContext(UserContext);
	const [email,setEmail] = useState("");
	const [password,setPassword] = useState("");
	
	if(user.user){
		navigate('/');
	}

	const submitHandler = async(e) => {
		e.preventDefault();
		const result = await(await fetch('https://ncs-backend-gilt.vercel.app/auth/login', {
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
			setForceUpdate(Date.now());
			navigate('/');
		}else{
			alert("Incorrect username or password");
		}
	}
	return (
		<div id="Login" className='auth-form'> 
			<h1>Login</h1>
			<form onSubmit={submitHandler}>
				<label>Enter your username/email:</label>
				<input type="text" value={email} 
					onChange={(e)=>{
						setEmail(e.target.value);
					}}
				/>
				<label>Enter your password:</label>
				<input type="password" value={password} 
					onChange={(e)=>{
						setPassword(e.target.value);
					}}
				/>
				<button type="submit" class="auth-form-submit">Login</button>
			</form>
		</div>
	)
}

export default Login
