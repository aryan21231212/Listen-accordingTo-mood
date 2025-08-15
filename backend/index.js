import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());    


app.listen(port,() => {
    console.log(`Server is running on ${port}`);
})


//spotify auth request
async function getSpotifyToken() {
    const clientId = process.env.CLIENT_ID;
    const clientSecret = process.env.CLIENT_SECRET;
  
    const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  
    const res = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
    });
  
    const data = await res.json();
    return data.access_token;
  }



//playlist on basis of mood
app.post("/playlist",async (req,res)=>{
    const {Mood} = req.body;
    
    try {
        const token = await getSpotifyToken();
    
        const response = await fetch(
          `https://api.spotify.com/v1/search?q=${Mood}&type=playlist&limit=20`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
    
        const data = await response.json();
        console.log(data);
        res.json({"sucess":"playlist"});
        
      } catch (error) {
        console.error("Error fetching Spotify playlists:", error);
        res.status(500).json({ error: "Failed to fetch playlists" });
      }
})


//mood
app.post("/mood", async (req, res) => {
    const text = await req.body.text || "";

    if (!text) {
        return res.status(400).json({ error: "Text is required" });
    };


    try {
        const genAI = new GoogleGenerativeAI("AIzaSyBmoKbIychQZB3W4pQfyiTabRxbzndnCX4");
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `
      You are a mood detection AI.
      Given the text: "${text}",
      Detect the main mood in ONE word only.
      Choose from: happy, sad, calm, energetic, romantic, angry, nostalgic, relaxed, hopeful, stressed.
      Output only the mood word in lowercase.
    `;

        const result = await model.generateContent(prompt);
        const mood = result.response.text().trim().toLowerCase();

        res.status(200).json({ mood });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to detect mood" });
    }

})

