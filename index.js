import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
        res.render("index.ejs",{data : "movie details will be shown here "});
      } catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("index.ejs", {
          error: error.message,
        });
      }
});

app.post("/", async (req, res) => {

  try{
      console.log(req.body);
      const movie=req.body.moviename;
      const response = await axios.get(`https://www.omdbapi.com/?t=${movie}&apikey=fd639469`);
      const result = response.data;
     
      console.log(result);
      res.render("index.ejs",{data : result});
    }
    catch(error){
      console.error("Failed to make request:", error.message);
      res.render("index.ejs", {
        error:"NO activity match your criteria ",
      });
    }
  });










app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });