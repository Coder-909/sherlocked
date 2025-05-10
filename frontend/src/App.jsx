import React,{ useState,createContext,useContext,useEffect,useRef } from 'react'
import {Routes,Route} from "react-router-dom";
import './App.css'
import NavBar from "./components/NavBar.jsx";
import Login from "./pages/Login.jsx";
import HomePage from "./pages/HomePage.jsx";
import About from "./pages/About.jsx"
import BugBounty from "./pages/rounds/BugBounty.jsx"
import Riddler from "./pages/rounds/Riddler.jsx"
import Register from "./pages/Register.jsx"
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
					<Route path="/admin/register" element={<Register/>}/>
				</Routes>
			</div>		
		</UserContext.Provider>
      )
}

const Background = () => {
	const backgroundRef = useRef(null);

 	// useEffect(() => {
	// 	const background = backgroundRef.current;
	// 	let timeoutId = null;
	// 	let lastX = 0, lastY = 0, lastTime = Date.now();

	// 	const handleMouseMove = (e) => {
	// 		const x = e.clientX;
	// 		const y = e.clientY;
	// 		const now = Date.now();

	// 		const dx = x - lastX;
	// 		const dy = y - lastY;
	// 		const dt = now - lastTime;

	// 		const speed = Math.sqrt(dx * dx + dy * dy) / dt;
	// 		const intensity = Math.min(speed * 4, 0.5);

	// 		const baseColor = [94, 66, 44];
	// 		const brightColor = [201, 142, 83];

	// 		const blended = baseColor.map((val, i) =>
	// 			Math.round(val + (brightColor[i] - val) * intensity)
	// 		);

	// 		const colorHex = `rgb(${blended.join(',')})`;

	// 		background.style.background = `radial-gradient(circle at ${x}px ${y}px, ${colorHex} 60px, rgb(31, 20, 10) 130px)`;

	// 		lastX = x;
	// 		lastY = y;
	// 		lastTime = now;

	// 		if (timeoutId) clearTimeout(timeoutId);
	// 		timeoutId = setTimeout(() => {
	// 			background.style.background =
	// 			'radial-gradient(circle at center, rgb(54, 41, 29) 0%, rgb(35, 24, 15) 100%)';
	// 		}, 300);
	// 	};

	// 	document.addEventListener('mousemove', handleMouseMove);

	// 	return () => {
	// 	document.removeEventListener('mousemove', handleMouseMove);
	// 	clearTimeout(timeoutId);
	// 	};
	// }, []);

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
