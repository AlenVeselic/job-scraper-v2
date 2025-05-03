import axios from "axios";
import express from "express";
import jsdom from "jsdom";
import { scrapeJobSites } from "./utility/scraper";
const app = express();
const port = 3000;

app.get("/", async (req, res) => {
  res.send(await scrapeJobSites());
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
