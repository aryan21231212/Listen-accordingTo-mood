import React, { useState, useEffect } from 'react';
import Box from './components/Box.jsx';

const App = () => {
  const [text, settext] = useState("");
  const [allPlaylist, setallPlaylist] = useState(() => {
    const saved = localStorage.getItem("allPlaylist");
    return saved ? JSON.parse(saved) : [];
  });
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (allPlaylist.length > 0) {
      localStorage.setItem("allPlaylist", JSON.stringify(allPlaylist));
    }
  }, [allPlaylist]);

  const playlist = async (Mood) => {
    if (!Mood) {
      alert("No mood selected!");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/playlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ Mood })
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (JSON.stringify(data) !== JSON.stringify(allPlaylist)) {
        setallPlaylist(data);
      }

      console.log("playlist detected:", data);
    } catch (error) {
      console.error("Error fetching playlist:", error);
    }
  };

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
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <>
      <style jsx>{`
        .hero {
          width: 100%;
          min-height: 100vh;
          padding: 2rem;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: ${darkMode ? 'linear-gradient(135deg, #2a0845 0%, #6441A5 100%)' : 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'};
          transition: all 0.3s ease;
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        
        .container {
          max-width: 800px;
          width: 100%;
          margin: 0 auto;
        }
        
        .header-section {
          text-align: center;
          margin-bottom: 2.4rem;
        }
        
        .title {
          font-size: 2.5rem;
          color: ${darkMode ? '#d3d3d3' : '#4a00e0'};
          margin-bottom: 1rem;
          font-weight: 700;
        }
        
        .description {
          font-size: 1.2rem;
          color: ${darkMode ? '#d3d3d3' : '#6c757d'};
          margin-bottom: 2rem;
          transition: all 0.3s ease;
        }
        
        .input-container {
          display: flex;
          gap: 1rem;
          margin: 3rem 0 1.5rem;
          align-items: center;
        }
        
        .mood-textarea {
          flex: 1;
          padding: 1.5rem;
          border-radius: 16px;
          border: none;
          font-size: 1rem;
          min-height: 120px;
          resize: none;
          transition: all 0.3s ease;
          box-shadow: ${darkMode ? '0 4px 20px rgba(0, 0, 0, 0.3)' : '0 4px 20px rgba(0, 0, 0, 0.1)'};
          background: ${darkMode ? 'rgba(255, 255, 255, 0.1)' : '#fff'};
          color: ${darkMode ? '#fff' : '#333'};
          backdrop-filter: ${darkMode ? 'blur(5px)' : 'none'};
        }
        
        .mood-textarea::placeholder {
          color: ${darkMode ? 'rgba(255, 255, 255, 0.6)' : '#999'};
        }
        
        .mood-textarea:focus {
          outline: none;
          box-shadow: 0 0 0 3px ${darkMode ? 'rgba(157, 80, 187, 0.5)' : 'rgba(138, 43, 226, 0.3)'};
        }
        
        .mic-button {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(135deg, #8a2be2, #4a00e0);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
          border: none;
        }
        
        .mic-button:hover {
          transform: scale(1.05);
          box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
        }
        
        .search-button {
          width: 100%;
          padding: 1.2rem;
          border-radius: 16px;
          border: none;
          background: linear-gradient(135deg, #8a2be2, #4a00e0);
          color: white;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
          margin-top: 1rem;
        }
        
        .search-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
        }
        
        .search-button:active {
          transform: translateY(0);
        }
        
        .dark-mode-toggle {
          position: absolute;
          top: 2rem;
          right: 2rem;
          z-index: 10;
        }
        
        .toggle-btn {
          background: ${darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(138, 43, 226, 0.1)'};
          border: 2px solid ${darkMode ? '#9d50bb' : '#8a2be2'};
          color: ${darkMode ? '#fff' : '#8a2be2'};
          border-radius: 30px;
          padding: 0.5rem 1rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
        }
        
        .toggle-btn:hover {
          background: ${darkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(138, 43, 226, 0.2)'};
        }
        
        .toggle-icon {
          font-size: 1.2rem;
        }
        
        @media (max-width: 768px) {
          .hero {
            padding: 1.5rem;
          }
          
          .title {
            font-size: 2rem;
            margin-top: 0;
          }
          
          .description {
            font-size: 1rem;
          }
          
          .input-container {
            flex-direction: column;
            margin: 2rem 0 1.5rem;
          }
          
          .mic-button {
            width: 100%;
            border-radius: 16px;
            height: 50px;
          }
          
          .dark-mode-toggle {
            top: 1rem;
            right: 1rem;
          }
        }
      `}</style>

      <div className='hero'>
        <div className="dark-mode-toggle">
          <button className="toggle-btn" onClick={toggleDarkMode}>
            <span className="toggle-icon">{darkMode ? '☀️' : '🌙'}</span>
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>

        <div className="container">
          <div className="header-section">
            <h1 className='title'>Music Recommendation according to your mood</h1>
            <p className='description'>Discover new music tailored to your taste.</p>
          </div>

          <Box playlist={allPlaylist} />

          <div className="input-container">
            <textarea
              value={text}
              onChange={(event) => settext(event.target.value)}
              name="baat"
              className="mood-textarea"
              placeholder="How are you feeling today? Share your mood..."
            />
            <button className="mic-button">🎤</button>
          </div>

          <button onClick={searchMood} className="search-button">Get Music Recommendations</button>
        </div>
      </div>
    </>
  );
};

export default App;