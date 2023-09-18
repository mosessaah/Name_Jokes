// Import require modules for the backend
import express from "express";
import axios from "axios";

// 
const app = express();
app.use(express.urlencoded({extended: true}));
const port = 3000;
app.use(express.static("public"));
const apiURL = "https://v2.jokeapi.dev/joke/Any?type=single&contains=";



app.get("/", (req, res) =>{
    res.render("index.ejs");
});

app.post("/submit", async(req, res)=> {
    let jokes = "Sorry try another Programming word!";
    let categories = "God is Good!";
    const name = req.body.name;
    try {
        const response = await axios.get(apiURL+ name);
        console.log(response.data);
        if (response.data.joke) {
            jokes = response.data.joke;
            categories = response.data.category;
        }
        res.render("index.ejs",{
            joke: jokes,
            category: categories
        });
    } catch (error) {
        res.render("index.ejs", {joke: response.data.message});
    }
});
// Listen for trafic
app.listen(port, () => {
    console.log(`Server is Listening on port ${port}`);
})
