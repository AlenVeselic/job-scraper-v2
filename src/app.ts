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

  const mojeDeloJobs = [];

  if (htmlResponse.data && typeof(htmlResponse.data) == "string") {
    const parsedHTML = new jsdom.JSDOM(htmlResponse.data);
    parsedHTML.window.document.querySelectorAll('.job-ad .title').forEach(element => mojeDeloJobs.push(element.textContent));
    console.log(mojeDeloJobs);
  }

  const slotechResponse = await axios.get("https://slo-tech.com/delo", {responseType: "text"});
  const slotechJobs = [];

  if (slotechResponse.data && typeof(slotechResponse.data) == "string") {
    const parsedHTML = new jsdom.JSDOM(slotechResponse.data);
    parsedHTML.window.document.querySelectorAll('.forums .name').forEach(element => slotechJobs.push(element.textContent));
    console.log(slotechJobs);
  }

  res.send({ mojeDeloJobs, slotechJobs });
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
