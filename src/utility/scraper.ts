import axios from "axios";
import jsdom from "jsdom";
export async function scrapeJobSites() {
  const mojeDeloJobs = await getJobsForSite(
    "https://www.mojedelo.com/prosta-delovna-mesta/racunalnistvo-programiranje/vse-regije?p=1",
    ".job-ad .title"
  );

  const slotechJobs = await getJobsForSite(
    "https://slo-tech.com/delo",
    ".forums .name"
  );

  return { mojeDeloJobs, slotechJobs };
}

async function getJobsForSite(url, selector) {
  const jobs = [];

  const htmlResponse = await axios.get(url, { responseType: "text" });
  if (htmlResponse.data && typeof htmlResponse.data == "string") {
    const parsedHTML = new jsdom.JSDOM(htmlResponse.data);
    parsedHTML.window.document
      .querySelectorAll(selector)
      .forEach((element) => jobs.push(element.textContent));
  }

  return jobs;
}
