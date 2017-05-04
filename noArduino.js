// Initialise Firebase
var admin = require('firebase-admin');
var serviceAccount = require('./admin/fir-graph-firebase-adminsdk-oh7fx-32a628ff09.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://fir-graph.firebaseio.com'
});

var db = admin.database();
var ref = db.ref();
var timeStamp = admin.database.ServerValue.TIMESTAMP;

ref.set({
  LiveTime: {

  },
  recordedTime:{

  }
})

  ref.once('value', function(snapshot) {
    // console.log(myTempRounded);
    var timeStamp = admin.database.ServerValue.TIMESTAMP;
    // write some updating data
    function startTime() {
    var today = new Date();
    var s = today.getSeconds();
    var t = setTimeout(startTime, 1000);

    ref.update({
       LiveTime: {
          seconds: s
       }
   });

   db.ref().child('/recordedTime').push({
      seconds: s,
      recordedAt: timeStamp
   });
 }
 startTime();
  });
