import React,{ useState,createContext,useContext,useEffect,useRef } from 'react'
import {Routes,Route} from "react-router-dom";
import './App.css'
import NavBar from "./components/NavBar.jsx";
import Login from "./pages/Login.jsx";
import HomePage from "./pages/HomePage.jsx";
import About from "./pages/About.jsx"
import BugBounty from "./pages/rounds/BugBounty.jsx"
import Riddler from "./pages/rounds/Riddler.jsx"
// import Register from "./pages/Register.jsx"
import Dashboard from "./pages/Dashboard.jsx"

export const UserContext = React.createContext();

function App() {
	const [user,setUser] = useState({});
	const [remainingTime, setRemainingTime] = useState(null);
	
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
			console.log(data)
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
				solutions:data.solutions,
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


    return (
		<UserContext.Provider value={[user,setUser]}>
			<div>
				<Background/>
				<NavBar/>
				<Routes id="router">
					<Route path="/login" element={<Login/>}/>
					<Route path="/"  element={<HomePage remainingTime={remainingTime} setRemainingTime={setRemainingTime}/>}/>
					<Route path="/about" element={<About/>}/>
					<Route path="/bugbounty" element={<BugBounty remainingTime={remainingTime} setRemainingTime={setRemainingTime}/>}/>
					<Route path="/riddler" element={<Riddler/>}/>
					<Route path="/admin/dashboard" element={<Dashboard/>}/>
					{/* <Route path="/admin/register" element={<Register/>}/> */}
				</Routes>
			</div>		
		</UserContext.Provider>
      )
}

const Background = () => {
	const backgroundRef = useRef(null);

  	const particles = Array.from({ length: 9 });

	return (
	<div ref={backgroundRef} className="background">
		<div className="circuit" />
		{particles.map((_, idx) => (
		<div
			key={idx}
			className="particle"
			style={{
			top: `${Math.random() * 100}%`,
			left: `${Math.random() * 100}%`,
			}}
		>
			.
		</div>
		))}
	</div>
  );
}

export default App
