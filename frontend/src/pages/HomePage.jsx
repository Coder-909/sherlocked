import {useContext,useState} from 'react'
import avatar from '../assets/avatar.png'
import {UserContext} from "../App.jsx"
import Popup from "../components/popup";

const HomePage = () => {
	const [user] = useContext(UserContext);
  const [popup, setPopup] = useState(false);

  if(!user.user){
    return(
      <div id="HomePage">
        <h1 id="unauth">Please login to continue</h1>
      </div>
    )
  }

  return (
    <div id="HomePage">
      {popup && <Popup setPopup={setPopup} />}
      <div className="profile">
        <img unselectable src={avatar} alt="Avatar" />
        <div className="profile-info">
          <div className="profile-header">
            <p>Name</p>
            <p>Email</p>
            <p>Year</p>
            <p>Roll No</p>
          </div>
          <div className='profile-data'>
            <p>{user.user?.name}</p>
            <p>{user.user?.email}</p>
            <p>{user.user?.year}</p>
            <p>{user.user?.rollno}</p>
          </div>
        </div>
      </div>  

      {/* <div className="rules">
        <h2>Rules</h2>
        <p>Content for rules goes here.</p>
      </div> */}

      <div className="rounds">
        <div className="round">
          <div className="round-header">
            <p>Round 1:</p>
            <p>Bug Bounty</p>
          </div>
          <div className="round-bts">
            <button className="round1-start" onClick={() => {setPopup(!popup)}}>Start</button>
            <p>Time Duration: <span>2 hours</span></p>
          </div>
          <div className="desc">
            <p>Find the bug and get your bounty.</p>
          </div>
          
        </div>
        <div className={user.user?.bountySubmission.hasPassedBounty ? "round" : "round locked"}>
          <div className="round-header">
              <p>Round 2</p>
              <p unselectable>{user.user?.bountySubmission.hasPassedBounty ? "Riddler" : "Nice try"}</p>
            </div>
            <div className="desc">
              <p>Find the bug and get your bounty.</p>
            </div>
            <div className="round-bts">
              <button className="round1-start">Start</button>
              <p>Time Duration: <span>2 hours</span></p>
            </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
