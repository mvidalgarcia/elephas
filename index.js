const https = require("https");
const { URL, URLSearchParams } = require("url");

require("dotenv").config();

const API_URL = new URL("https://tequila-api.kiwi.com/v2/search");
const params = {
  fly_from: "GVA",
  fly_to: "BRU",
  date_from: "01/05/2021",
  date_to: "01/05/2021",
  return_from: "02/06/2021",
  return_to: "02/06/2021",
  partner: "picky",
  sort: "quality",
  price_to: 290,
};
let url = API_URL;
url.search = new URLSearchParams(params);
url = url.href;
console.log(url);

https
  .get(url, { headers: { apikey: process.env.TEQUILA_API_KEY } }, (res) => {
    res.on("data", (d) => {
      process.stdout.write(d);
    });
  })
  .on("error", (err) => {
    debugger;
    console.log(err);
  });
