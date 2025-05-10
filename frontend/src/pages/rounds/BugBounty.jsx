import React,{useContext,useEffect,useState} from 'react'
import {UserContext} from '../../App.jsx' 
import {useNavigate} from "react-router-dom";
import BugSolution from '../../components/bugSolution.jsx';
import InstructionImage from "../../assets/instructionImage.jpg";

const BugBounty = ({remainingTime,setRemainingTime}) => {
	const [user,setUser] = useContext(UserContext);
	const [submission, setSubmission] = useState([{}]);
	const navigate = useNavigate();
	const token = localStorage.getItem('token');

	useEffect(() => {
		const fetchBounty = async () => {
			const result = await fetch('https://ncs-backend-gilt.vercel.app/bounty/get-bounties', {
				method:"GET",
				headers:{
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`
				}
			})
			const result1 = await result.json();
			if(result1.success){
				setUser({
					...user,
					user:{
						...(user.user),
						assignedBounty:result1.bounty
					}
				})
			}else{
				console.log("error");
			}
		}
		fetchBounty();
		const convertMillisecondsToTime = (milliseconds) => {
			const hours = Math.floor(milliseconds / (1000 * 60 * 60)); // Convert to hours
			const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60)); // Convert remainder to minutes
			return { hours, minutes };
		};

		const startTime = localStorage.getItem("round1-start-time");
		if (startTime) {
			const currentTime = new Date().getTime();
			const elapsedTime = currentTime - startTime; // Elapsed time in milliseconds
			const totalDuration = 4 * 60 * 60 * 1000; // 4 hours in milliseconds
			const remainingMilliseconds = totalDuration - elapsedTime;

			if (remainingMilliseconds <= 0) {
				setRemainingTime({ hours: 0, minutes: 0 }); // Time expired
			} else {
				// setRemainingTime({ hours: 0, minutes: 0 }); // Time expired

				setRemainingTime(convertMillisecondsToTime(remainingMilliseconds));
			}
		}
	},[])

	const submitHandler = async () => {
		console.log(submission);
		submission.map(async(data,index) => {
			const result = await fetch('https://ncs-backend-gilt.vercel.app/bounty/submit-solution', {
				method:"POST",
				headers:{
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${user.accesstoken}`
				},
				body:JSON.stringify({
					bountyId: user.user.assignedBounty._id,
					solution:data
				})
			})
			const result1 = await result.json();
				if(result1.success){
					console.log("Submission successful");
				}else{
					console.log("Submission failed");
				}
			})
		alert("Submission successful");
	}

	const submissionCode = () => {
		if(remainingTime?.hours === 0 && remainingTime?.minutes === 0){
			return(<h1>Time has run out...</h1>)
		}else{
			return(
				<>
				<h1>Submissions</h1>
					{submission.map((data,index) => (
						<BugSolution setSubmission={setSubmission} data={data} key={index} index={index} />
					))}
					<div className='bounty-bts'>
						<button id="add-submission" onClick={() => {
							setSubmission([...submission,{}]);
						}}>Add bug</button>
						<button id="submit-bounty" onClick={submitHandler}>Submit bugs</button>
					</div>
				</>
		)}
	}

	return (
		<div id="BugBounty">
			<div>
				<h1 className='bounty-heading'>Bug Bounty</h1>
				<div className='bounty-description'>	
					<div className='bounty-section'>
						<h2>Instruction:</h2>
						<ul>
							<li>Clone the repository provided to your laptop.</li>
							<li>Run the application.</li>
							<li>Identify the bugs.</li>
							<li>Fix the bugs.</li>
							<li>Mention all the bugs in the submission below.</li>
						</ul>
						<img unselectable src={InstructionImage} alt='instruction-img'/>
					</div>
					<div className='bounty-section'>
						<h2>Prerequisites:</h2>
						<ul>
							<li>Github basics</li>
							<li>Laptop</li>
						</ul>
					</div>
				</div>
				<div className="bounty-question">
					<h1>Github repository:</h1>
					<a href={user.user?.assignedBounty?.githubLink}>{user.user?.assignedBounty?.githubLink}</a>
					<p>Time remaining: {`${remainingTime?.hours}:${remainingTime?.minutes}`}</p>
				</div>
				<div className="bounty-submission">
					{submissionCode()}
					{/* {finalSubmission && <div className='popup-backdrop' onClick={() => setFinalSubmission(false)}>
						<div className='final-submission' onClick={(e) => e.stopPropagation()}>
							<h1>Final Submission</h1>
							<p>Once you submit the final submission, you will not be able to add any more submissions.</p>
							<button id="final-submit-btn" onClick={() => {
								setFinalSubmission(false);
								
							}}>Add submission</button>
						</div>
					</div>} */}
				</div>
			</div>
		</div>
	)
}

export default BugBounty
