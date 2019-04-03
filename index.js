const request = require('request');

const url = 'https://api.skypicker.com/flights?fly_from=GVA&fly_to=KEF&date_from=17/04/2019&date_to=27/04/2019&return_from=27/04/2019&return_to=27/04/2019&partner=picky&sort=quality&price_to=290'
const url2 = 'https://api.skypicker.com/flights?fly_from=GVA&fly_to=LHR&date_from=21/11/2018&date_to=26/11/2018&partner=picky&sort=quality'

request(url, { json: true }, (err, res, body) => {
  if (err) { return console.log(err); }
  console.log(body);
});
