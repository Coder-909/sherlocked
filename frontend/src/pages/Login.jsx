import React,{useState,useContext} from 'react'
import {useNavigate} from "react-router-dom";
import {UserContext} from "../App"

const Login = () => {
	const navigate = useNavigate();
	const [user,setUser] = useContext(UserContext);
	const [email,setEmail] = useState("");
	const [password,setPassword] = useState("");
	
	if(user.user){
		navigate('/');
	}

	const submitHandler = async(e) => {
		navigate("/about");
		e.preventDefault();
		const result = await(await fetch('http://localhost:4000/login', {
			method:"POST",
			credentials:'include',
			headers:{
				'Content-Type': 'application/json',
			},
			body:JSON.stringify({
				email,password
			})
		})).json();
		if(result.accesstoken){
			setUser({
				user:{user},
				accesstoken:result.accesstoken
			})
			navigate('/');
		}else{
			console.log(result.error);
		}
	}
	return (
		<div id="Login"> 
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
				<button type="submit" id="login-submit">Login</button>
			</form>
		</div>
	)
}

export default Login
