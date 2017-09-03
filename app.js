const express = require('express')
const app = express()
app.use(express.static('static'));

app.get('/', function (req, res) {
  res.redirect('/index.html');
});
app.get('/face', function (req, res) {
  res.redirect('/face-detection-demo/index3.html');
});
app.get('/face2', function (req, res) {
  res.redirect('/face-detection-demo/index2.html');
});

// var http = require('https');
// var options = {
//     host: 'github.com',
//     path: '/Carol1992/dataVisualization_d3js/blob/master/json/city.json'
// }
// var request = http.request(options, function (res) {
//     var data = '';
//     res.on('data', function (chunk) {
//         data += chunk;
//     });
//     res.on('end', function () {
//         console.log(data.toString());
//     });
// });
// request.on('error', function (e) {
//     console.log(e.message);
// });
// request.end();

app.listen(3001, function () {
  console.log('Example app listening on port 3001!')
})
