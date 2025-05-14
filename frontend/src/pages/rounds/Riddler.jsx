import React,{useState,useEffect} from 'react'
import {useContext} from 'react'
import {UserContext} from '../../App.jsx'
import {useNavigate} from "react-router-dom";

const Riddler = () => {
  const [riddleAns , setRiddleAns] = useState("");
  const [riddles, setRiddles] = useState([]);
  const [finalSubmission, setFinalSubmission] = useState(false);
  const [user] = useContext(UserContext);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  useEffect(() => {
    const fetchRiddles = async () => {
      const result = await fetch('https://ncs-backend-gilt.vercel.app/cluehunt/assigned-clues', {
        method:"GET",
        headers:{
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      const result1 = await result.json();
      setRiddles(result1.assignedClues);
      // console.log("data")
      // console.log(result1)
    }
    fetchRiddles();
  },[])
  // console.log(user);
  const submitHandler = async () => {
    const result = await fetch('https://ncs-backend-gilt.vercel.app/cluehunt/submit-cluehunt', {
      method:"POST",
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body:JSON.stringify({
        clueHuntResponse:riddleAns
      })
    })
    const result1 = await result.json();
    // console.log("result1");
    if(result1.success){
      console.log("Submission successful");
    }else{
      console.log("Submission failed");
    }
    localStorage.setItem("riddle-submission",riddleAns);
    navigate('/');
  }

  if(!user.user?.hasPassedBountyHunt){
		return(
			<div className="alert">
				<h1>Unauthorized user</h1>
				<p>You are not authorized to access this page.</p>
				<button onClick={() => {navigate('/')}}>Go Back</button>
			</div>
		)
	}
  if(localStorage.getItem("riddle-submission") !== null){
    return(
			<div className="alert">
				<h1>Already submitted</h1>
				<p>You are not authorized to access this page anymore.</p>
				<button onClick={() => {navigate('/')}}>Go Back</button>
			</div>
		) 
  }

    return (
      <div id="Riddler">
        <h1>Round 2: The Riddle Vault</h1>
        <div className="rules-section">
          <h2>Rules</h2>
          <ul>
            <li>✪ Solve each riddle to unlock the bug in code.
            </li>
            <li>✪ No brute force or external help allowed.</li>
            <li>✪ Each riddle corresponds to one part of the answer.</li>
            <li>✪ To solve these you will have to think outside of the box.</li>
            <li>✪ After getting the answers to all the riddles, join them in the same order as the question and submit your answer.</li>
            <li>✪ Time is limited, so choose wisely!</li>
          </ul>
        </div>

        <div className="riddle-buttons">
          {riddles.map((data,index) => (
            <Riddle data={data} key={index} index={index}/>
          ))}
        </div>

        <div className="riddle-submission">
          <h1>Submission:</h1>
          <label>Enter your answer:</label>
          <input name="riddle-ans" type="text" value={riddleAns} onChange={(e) => setRiddleAns(e.target.value)} placeholder='Answer...'/>
          <button id="riddle-submit" onClick={() => setFinalSubmission(true)}>Submit</button>
        </div>
        {finalSubmission && <div className='popup-backdrop' onClick={() => setFinalSubmission(false)}>
						<div className='final-submission' onClick={(e) => e.stopPropagation()}>
							<h1>Final Submission</h1>
							<p>Once you submit the final submission, you will not be able to change your submissions.</p>
							<button id="final-submit-btn" onClick={() => {
								setFinalSubmission(false);
								submitHandler();
							}}>Submit</button>
						</div>
					</div>}
          {/* <Notif data={{heading:"Riddler",description:"Solve the riddles to unlock the bug in code."}}/> */}
      </div>
    )
}

const Riddle = ({data,index}) => {
  const [open,setOpen] = useState(false);
    return (
        <div className="riddle">
            <div className="tab" onClick={() => {setOpen(!open)}}>
              Riddle {index+1}
            </div>
            {open && <div className='popup-backdrop' onClick={() => {setOpen(false)}}>
              <div className='riddle-box' onClick={(e) => e.stopPropagation()}>
                <div className='riddle-header'>
                  <h1>Riddle {index+1}</h1>
                </div>
                <p>{data.clue}</p>
              </div></div>}
        </div>
    )
}

export default Riddler
