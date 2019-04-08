const request = require('request');
const {URL, URLSearchParams} = require('url');

const API_URL = new URL('https://api.skypicker.com/flights');
const params = {
  fly_from: 'GVA',
  fly_to: 'BRU',
  date_from: '01/05/2019',
  date_to: '01/05/2019',
  return_from: '02/05/2019',
  return_to: '02/05/2019',
  partner: 'picky',
  sort: 'quality',
  price_to: 290,
};
let url = API_URL;
url.search = new URLSearchParams(params);
url = url.href;
console.log(url);

request(url, {json: true}, (err, res, body) => {
  if (err) {
    return console.log(err);
  }
  console.log(body);
});
