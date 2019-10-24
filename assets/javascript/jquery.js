$(document).ready(function () {
    $(".container-fluid").hide();
    $("#gameOver").hide();
})

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

