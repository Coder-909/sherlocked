import React,{useContext, useEffect,useState} from 'react'
import {UserContext} from "../App.jsx"

const Dashboard = () => {
	const [user,setUser] = useContext(UserContext);
	const [data,setData] = useState([]);
	// if(user.user?.role !== "admin"){
	// 	return(
	// 		<div className="alert">
	// 			<h1>Unauthorized user</h1>
	// 			<p>You are not authorized to access this page.</p>
	// 		</div>
	// 	)
	// }
	useEffect(() => {
		const fetchData = async () => {
			const token = localStorage.getItem("token");
			if (token) {
				const result = await fetch('https://ncs-backend-gilt.vercel.app/admin/dashboard', {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${token}`
					}
				});
				const data = await result.json();
				console.log(data);
				setData(data);
			}
		}
		fetchData();
	},[])

	return(<></>)
	return (
		<div>
			<table border="1" cellPadding="8" style={{ borderCollapse: 'collapse', width: '100%' }}>
			<thead>
				<tr>
				{headers.map((key) => (
					<th key={key} style={{ backgroundColor: '#f2f2f2' }}>{key.toUpperCase()}</th>
				))}
				</tr>
			</thead>
			<tbody>
				{data.map((row) => (
				<tr key={row.id}>
					{headers.map((key) => (
					<td key={key}>{row[key]}</td>
					))}
				</tr>
				))}
			</tbody>
			</table>
		</div>
	)
}

export default Dashboard
