import axios from "axios";
import express from "express";
import jsdom from "jsdom";

const app = express();
const port = 3000;

app.get("/", async (req, res) => {
  const htmlResponse = await axios.get(
    "https://www.mojedelo.com/prosta-delovna-mesta/racunalnistvo-programiranje/vse-regije?p=1",
    { responseType: "text" }
  );

  const jobs = [];

  if (htmlResponse.data && typeof(htmlResponse.data) == "string") {
    const parsedHTML = new jsdom.JSDOM(htmlResponse.data);
    parsedHTML.window.document.querySelectorAll('.job-ad .title').forEach(element => jobs.push(element.textContent));
    console.log(jobs);
  }
  res.send({"jobs": jobs});
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
