import React,{ useState,createContext,useContext,useEffect } from 'react'
import {Routes,Route} from "react-router-dom";
import './App.css'
import NavBar from "./components/Navbar.jsx";
import Login from "./pages/Login.jsx";
import HomePage from "./pages/HomePage.jsx";
import Admin from "./pages/Admin.jsx" 
import About from "./pages/About.jsx"
import BugBounty from "./pages/rounds/BugBounty.jsx"

export const UserContext = React.createContext();
const MODE = "DEVELOPMENT"; // DEVELOPMENT || DEPLOYMENT

function App() {
	const [user,setUser] = useState({});
	useEffect(() => {
		if(MODE === "DEVELOPMENT"){
			setUser({
				user:{
					_id:"1234567890",
					name:"John Doe",
					email:"email123456@email.com",
					password:"password",
					rollno:"24CSE007",
					year:1,
					bountySubmission:{
						bountyId:"1234567890",
						solution:[{
							page:"index.html",
							from:5,
							to:9,
						}],
						clueHuntOrder:[1,5,2,3,4],
						clueHuntExpectedAnswer:"OA69BXYZ",
						hasPassedBounty:true,
					}	
				},
				accesstoken:"abc123",
			})
		}
		async function refreshToken(){
			const result = await(await fetch('{refresh_token_api}',{
				method:'POST',
				credentials:'include',
				headers:{
					'Content-Type':'application/json',
				}
			})).json();
			setUser({
				user:result.user,
				accesstoken:result.accesstoken
			})
		}
		// refreshToken();
	},[])

    return (
		<UserContext.Provider value={[user,setUser]}>
			<div>
				<Background/>
				<NavBar/>
				<Routes id="router">
					<Route path="/login" element={<Login/>}/>
					<Route path="/admin" element={<Admin/>}/>
					<Route path="/" element={<HomePage/>}/>
					<Route path="/about" element={<About/>}/>
					<Route path="/bugbounty" element={<BugBounty/>}/>
				</Routes>
			</div>		
		</UserContext.Provider>
      )
}

const Background = () => {
	return (
		<div className="background">
			<div className="circuit"></div>
			{/* <div class="particle">.</div>
			<div class="particle">.</div>
			<div class="particle">.</div>
			<div class="particle">.</div>
			<div class="particle">.</div>
			<div class="particle">.</div>
			<div class="particle">.</div>
			<div class="particle">.</div>
			<div class="particle">.</div> */}
	  	</div>
	)
}

export default App
