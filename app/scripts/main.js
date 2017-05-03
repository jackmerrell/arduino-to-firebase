// Initialize Firebase
var config = {
 apiKey: 'AIzaSyBcCuyAHQFUpQjl-pcKHbBboF-BE8jRNZQ',
 authDomain: 'fir-graph.firebaseapp.com',
 databaseURL: 'https://fir-graph.firebaseio.com',
 projectId: 'fir-graph',
 storageBucket: 'fir-graph.appspot.com',
 messagingSenderId: '699116293856'
};
firebase.initializeApp(config);

$(function(){

   var dbRef = firebase.database().ref();
   dbRef.on('value',function(firebaseData){

   var data = firebaseData.val();
   var seconds = data.room.temperature;

   document.getElementById('txt').innerHTML ='Room Temperature: ' + seconds +'&#8451;';
  //  console.log(seconds);
   document.body.style.backgroundColor = 'hsl(' + seconds + ', 80%, 65%)';

   });
});
