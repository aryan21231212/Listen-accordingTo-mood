import React, { useState } from 'react'
import Box from './components/Box.jsx'

const App = () => {
  const [text, settext] = useState("");



  const playlist  = async (Mood)=>{
    if (!Mood) {
      alert("No mood selected!");
      return;
    }

    try{
      const response = await fetch("http://localhost:3000/playlist",{
        method:"POST",
        headers:{
             "Content-Type": "application/json"
        },
        body: JSON.stringify({Mood})
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      console.log("playlist detected:", data);
    }
    catch (error) {
      console.error("Error fetching playlist:", error);
    }
  }




  const searchMood = async () => {
    if (!text) {
      alert("Please enter your mood");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/mood", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ text })
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      console.log("Mood detected:", data.mood);


        playlist(data.mood);

    

    } catch (error) {
      console.error("Error fetching mood:", error);
    }
  }

  return (
    <>
      <div className='hero'>
        <div className="header-section" style={{marginBottom:"2.4rem"}}>
          <h1 className='title'>Music Recommendation according to your mood</h1>
          <p className='description'>Discover new music tailored to your taste.</p>
        </div>
        
        <Box />
        
        <div className="input-container" style={{display:"flex", gap:"1rem"}}>
          <textarea 
            value={text}
            onChange={(event)=> settext(event.target.value)}
            name="baat" 
            className="mood-textarea"
            placeholder="Enter your mood here to get music recommendations..."
          />
          <div className="mic-button">
            🎤
          </div>
        </div>
        
        <button onClick={searchMood} className="search-button">Search</button>
      </div>
    </>
  )
}

export default App