import React,{useContext} from 'react'
import {UserContext} from '../../App' 
import {useNavigate} from "react-router-dom";

const BugBounty = () => {
	const [user,setUser] = useContext(UserContext);
	const navigate = useNavigate();

	if(!user.user?.bountySubmission.hasPassedBounty){
		return(
			<div className="alert">
				<h1>Unauthorized user</h1>
				<p>You are not authorized to access this page.</p>
				<button onClick={() => {navigate('/')}}>Go Back</button>
			</div>
		)
	}



	return (
		<div id="BugBounty">
			<h1 className='bounty-heading'>Bug Bounty</h1>
			<h2>Prerequisites:</h2>
			<ul>
				<li>Github basics</li>
				<li>Laptop</li>
			</ul>
			<h2>Instruction:</h2>
			<ul>
				<li>Clone the repository provided to your laptop.</li>
				<li>Run the application</li>
				<li>Identify the bugs.</li>
				<li></li>
			</ul>
		</div>
	)
}

export default BugBounty
