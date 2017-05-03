// Initialise Arduino Board
var jfive = require("johnny-five");
var board = new jfive.Board();
var connected = false;

// Initialise Firebase
var admin = require('firebase-admin');
var serviceAccount = require('./admin/fir-graph-firebase-adminsdk-oh7fx-32a628ff09.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://fir-graph.firebaseio.com'
});
var db = admin.database();
var ref = db.ref();

board.on('ready', function() {
  connected = true;
  console.log('board has connected');

  var tempSensor = new jfive.Thermometer({
      controller: "DS18B20",
      pin: "2",
      freq: 1000
  });


tempSensor.on('change', function() {
  var myTemp = tempSensor.celsius;
  var myTempRounded = Math.round( myTemp * 10 ) / 10;

  ref.on('value', function(snapshot) {
    console.log(myTempRounded);

    ref.update({
       room: {
          temperature: myTempRounded
       }
   });
  });

});

});

//   // write some updating data
//   function startTime() {
//   var today = new Date();
//   var s = today.getSeconds();
//   var t = setTimeout(startTime, 1000);
//
//   ref.update({
//      timeData: {
//         seconds: s
//      }
//  });
