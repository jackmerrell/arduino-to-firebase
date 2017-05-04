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
   var liveTemperature = data.LiveTemperature.temperature;

   document.getElementById('currentTemperature').innerHTML ='Temperature: ' + liveTemperature +'&#8451;';
   document.body.style.backgroundColor = 'hsl(' + liveTemperature + ', 80%, 65%)';

   var recordedTemperature = data.recordedTemperature;
   var tempArray = [];
   var timeArray = [];

   $.each(recordedTemperature, function(i, option) {
      tempArray.push(option.temperature);
      timeArray.push(option.recordedAt);
    });


    var chart = c3.generate({
      bindto: '#chart',
      size: {height: 800},
      data: {columns: [tempArray],type: 'spline', },
      interaction: {enabled: false},
      transition: {duration: 500},
      legend: {show: false},
      tooltip: {show: false},
      point: {focus: {expand: {enabled: false} },r:5 },
      axis: { x: { show: false}, y:{show:false}}

    });

   });
});
