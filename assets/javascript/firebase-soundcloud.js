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
    $('#timesUp').hide();
    $('#start-btn').hide();

  })

var startGame = $("#start-btn").on('click', function () {
  $(this).parent().hide();
  $('.container-fluid').show();
  $("#gameOver").hide();
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


// Your web app's Firebase configuration
  // var firebaseConfig = {
  //   apiKey: "AIzaSyClwRXheZqZBWVw78UKc_agW1OJekjqSw8",
  //   authDomain: "the-game-63f83.firebaseapp.com",
  //   databaseURL: "https://the-game-63f83.firebaseio.com",
  //   projectId: "the-game-63f83",
  //   storageBucket: "the-game-63f83.appspot.com",
  //   messagingSenderId: "183555544943",
  //   appId: "1:183555544943:web:4730fb7de6051856aafa9a",
  //   measurementId: "G-WD2PVF9L1J"
  // };


  // // Initialize Firebase
  // firebase.initializeApp(firebaseConfig);
  // firebase.database();


// url: "https://pixabay.com/api/?key=13979984-d2ae798e35c78a69340f780d3&q=lose+game&safesearch=true&image_type=illustration&category=sad",
