import React from 'react'

const bugSolution = ({data,index,setSubmission}) => {
	const handleChange = (e) => {
		const {name,value} = e.target
		setSubmission((prev) => {
			const newSubmission = [...prev];
			newSubmission[index] = {
				...newSubmission[index],
				[name]: value,
			};
			return newSubmission;
		});
	}

    return (
		<div className='submission-entry'>
			<h2>Bug {index+1}:</h2>
			<input onChange={handleChange} type='text' name="filename" value={data.page} placeholder='Filename'/>
			<input onChange={handleChange} type="text" name="from" value={data.from} placeholder="From" />
			<input onChange={handleChange} type="text" name="to" value={data.to} placeholder="To"/> 
			<input onChange={handleChange} type="text" name="bugDescription" value={data.bugDescription}  placeholder="Bug description"/>
		</div>
	)
}

export default bugSolution
