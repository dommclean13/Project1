$(document).ready(function () {
  $(".container-fluid").hide();
  $("#gameOver").hide();
})


function resetGame() {
    $('.playAgain').on('click', function () {
        
        $('.container-fluid').show();
        $('#timesUp').hide();
        $('#start-btn').hide();

    })
};

$('.playAgain').on('click', function () {
    $('.container-fluid').show();
    $('#start-btn').hide();
    $('#gameOver').hide();
    play();
  })

var startGame = $("#start-btn").on('click', function () {
  $(this).parent().hide();
  $('.container-fluid').show();
  $("#gameOver").hide();
  play();
});



$(".click").on("click", function () {
  var sad = "lose+game&safesearch=true&image_type=illustration&category=sad"
  var queryURL = "https://pixabay.com/api/?key=13979984-d2ae798e35c78a69340f780d3&q=" + sad;

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);
    var image = $("<img>").addClass("img-fluid").attr("src", response.hits[0].previewURL);
    $("#poster").empty().append(image);
  });
});

var firebaseConfig = {
  apiKey: "AIzaSyAHhb_obGgFcHKtRToHQ3FPmpp17xA98W0",
  authDomain: "thebestdatabase-67d89.firebaseapp.com",
  databaseURL: "https://thebestdatabase-67d89.firebaseio.com",
  projectId: "thebestdatabase-67d89",
  storageBucket: "thebestdatabase-67d89.appspot.com",
  messagingSenderId: "644479964175",
  appId: "1:644479964175:web:e5eb5197521879c6d87f7a"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

$(".submit").on("click", function(){
  if (("#name").length != 0){
    firebase.database().ref('/').set({
      name: String($("#name").val()),
      score: String(score)
    });
  }
});