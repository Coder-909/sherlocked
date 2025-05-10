import {useContext,useState,useEffect} from 'react'
import avatar from '../assets/avatar.png'
import {UserContext} from "../App.jsx"
import {useNavigate} from 'react-router-dom'

const HomePage = ({remainingTime,setRemainingTime}) => {
	const [user,setUser] = useContext(UserContext);
  const navigate = useNavigate();
  if(localStorage.getItem('token') === null || localStorage.getItem('token') === ""){
    return(
      <div id="HomePage">
        <h1 id="unauth">Please login to continue</h1>
      </div>
    )
  }

  useEffect(() => {
		const func = async () => {  
		  const token = localStorage.getItem("token");
		  if (token) {
			const result = await fetch('https://ncs-backend-gilt.vercel.app/auth/get-user', {
			  method: 'GET',
			  headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			  }
			});
			let userRole;
			const data = await result.json();
			if(data.name==="shreyansh"){
				userRole = "admin";
			}else{
				userRole = "user";
			}
			// console.log(data);
			setUser({
			  user:{
				team:data.team,
				name: data.name,
				email: data.email,
				year: data.year,
				rollno: data.admissionNumber,
				clueHuntOrder: data.clueHuntOrder,
				solutions:[],
				assignedBounty: {},
				hasPassedBountyHunt: data.hasPassedBountyHunt,
				role:userRole
			  },
			  accesstoken: token
			})
		  }
		}
		func();
	},[]);

  const riddleSubmission = localStorage.getItem("riddle-submission");

  const handleRound1Start = async(e) => {
    e.preventDefault();
    const result = await fetch('https://ncs-backend-gilt.vercel.app/bounty/get-bounties', {
        method:"GET",
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.accesstoken}`
        }
    })
    const result1 = await result.json();
    if(result1.success){
        setUser({
            ...user,
            user:{
                ...(user.user),
                assignedBounty:result1.bounty,
            }
        })
        const startTime = new Date().getTime(); // Current time in milliseconds
        localStorage.setItem("round1-start-time", startTime);
        navigate('/bugbounty');
    }else{
        console.log("Wrong passkey");
    }
  }
  const riddleStartButton = () => {
      if(riddleSubmission !== null){
        return( <p className='final'>Final submission done</p>)
      }
      if(!user.user?.hasPassedBountyHunt){
        return (<button disabled className="round2-start">Start</button>);
      }else{
        return (<button className="round2-start" onClick={() => navigate('/riddler')}>Start</button> )
      }
  }

  const BugBountyStartButton = () => {
    if(user.user?.hasPassedBountyHunt){
      return(<p className="final">Cleared</p>)
    }
    else if(localStorage.getItem("round1-start-time") !== null){
      return (<button className="round1-start" onClick={() => navigate('/bugbounty')}>Continue</button>)
    }else if(!user.user?.hasPassedBountyHunt){
      return (<button className="round1-start" onClick={handleRound1Start}>Start</button>)
    } 
  }

  // console.log(user);
  return (
    <div id="HomePage">
      <div className="profile">
        <img unselectable src={avatar} alt="Avatar" />
        <div className="profile-info">
          <div className="profile-header">
            <p>Team ID</p>
            <p>Name</p>
            <p>Year</p>
            <p>ZealID</p>
          </div>
          <div className='profile-data'>
            <p>{user.user?.team}</p>
            <p>{user.user?.name}</p>
            <p>{user.user?.year}</p>
            <p>{user.user?.rollno}</p>
          </div>
        </div>
      </div>  

      <div className="rounds">
        <div className="round">
          <div className="round-header">
            <p>Round 1:</p>
            <p>Bug Bounty</p>
          </div>
          <div className="round-bts">
            {BugBountyStartButton()}
            <p>Time Duration: <span>4 hours</span></p>
          </div>
          <div className="desc">
            <p>Find the bug and get your bounty.</p>
          </div>
          
        </div>
        <div className={user.user?.hasPassedBountyHunt ? "round" : "round locked"}>
          <div className="round-header">
              <p>Round 2: </p>
              <p unselectable>{user.user?.hasPassedBountyHunt ? "Riddler" : "Nice try"}</p>
            </div>
            <div className="desc">
              <p>{user.user?.hasPassedBountyHunt ? "Solve riddles, find clues and arrange them into a phrase/word." : "How long are you going to try?"}</p>
            </div>
            <div className="round-bts">
              {riddleStartButton()}
              <p>Time Duration: <span>{user.user?.hasPassedBountyHunt ? "1 Day" : "0"}</span></p>
            </div>
        </div>
      </div>
      <div className="home-rules">
        <h1>Rules:</h1>
        <ul>
          <li>You can not take the help of internet during any of the rounds.</li>
          <li>You can not use chatgpt during any of the rounds.</li>
        </ul>
      </div>
    </div>
  )
}

export default HomePage
