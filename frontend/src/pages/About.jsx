import React from 'react'

const data = [{
  name:"Founder's Den",
  description:"A two day innovation and proposal event, with the first day focusing on pitching the ideas and second day focusing on the prototypes, the winning ideas of which would be acquired by NCS in the name of student welfare."
},{
  name:"Dominion",
  description:"Interactive esports event held online over Discord, featuring high qualiity streams and broadcasts as well a cash prizes for the top 2 teams. "
},{
  name:"VR EXPO",
  description:"An immersive event focusing on the demonstration of virtual reality technology, expanding on not only the technical and theoretical aspects of VR but also providing hands-on experience with the tech on the spot."
},{
  name:"Stratosphere",
  description:"Drone and Aerospace technology STRATOSPHERE'25 , featuring industry expers displaying state-of-the-art tech, as well as a student project showcase with prizes for the top two positions. "
},{
  name:"Craffiti",
  description:"It is a dynamic online event where participants join a virtual room on Skribblio, competing in drawing rounds with themed prompts or words, engaging in real-time drawing and guessing with fellow attendees, earning points for accurate guesses and quality drawings. The highest-scoring participant wins, fostering a sense of community and excitement around artistic expression."
},{
  name:"Blind code",
  description:"Innovative pair programming event where one person has to guide the other, blindfolded person to implement certain patterns that will only be displayed for a limited time."
},{
  name:"Snippets",
  description:"A fun community board event where students can write messages in the form of cryptic code snippets for one another."
}]

const About = () => {
  return (
    <div id="About">
      <h1>About NCS</h1>
      <p> </p>
      <div className='cards'>
        {data.map((data,index) => (
          <Section data={data} key={index}/>
        ))}
      </div>
    </div>
  )
}

const Section = ({data}) => {
	return(
    <div className="card-container">
      <div className="card-content">
        <h3 className="card-heading">{data.name}</h3>
        <p className="card-description">{data.description}</p>
      </div>
    </div>
	)
}

export default About
