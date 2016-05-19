SC.initialize({
  client_id: 'f7191bb62c854f9e0b7ff52a9260e4d4'
});

$(document).ready(function(){
    $(".play").mouseover(function() {
    playRandom();
  })
  .mouseout(function() {
    stopRandom();
  });
});
function playRandom(){
  findSong($("#genre").val());
}
function findSong(genre){
  SC.get('/tracks' , {
    genres: genre ,
    limit: 10
  }).then(function(tracks){
    console.log(tracks)
    var track = tracks[Math.floor(Math.random() * tracks.length)];
    playTrack(track.id);
    console.log(track.title);
  });
}

function stopRandom() {
  currentSong.pause();
}

var currentSong = null; // The song that is currently playing
function playTrack(trackid) {
  if (currentSong != null) {
    // TODO: stop the current song
    currentSong.pause();
  }

SC.stream('/tracks/' + trackid).then(function(player) {
    player.play();
    currentSong = player;
  });
}

