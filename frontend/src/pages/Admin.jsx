import React,{useContext} from 'react'
import UserContext from "../App"

const Admin = () => {
	const [user] = useContext(UserContext);

	useEffect(() => {
		async function fetchProtected(){
			const result = await(await fetch('{protected route}', {
				method:'POST',
				header:{
					'Content-Type':'application/json',
					authorization:`bearer ${user.accesstoken}`,
				}
			})).json();
		}
	})
	return (
		<div>
			<h1>Admin</h1>
		</div>
	)
}

export default Admin
