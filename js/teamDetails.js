document.addEventListener("DOMContentLoaded", function() {
    hidePreloader();
    let urlParams = new URLSearchParams(window.location.search);
    let isFromFavorites = urlParams.get("favorited");
    let btnFavorite = document.getElementById("addFavorite");
    if (isFromFavorites) {
      // Hide fab jika dimuat dari indexed db
      btnFavorite.style.display = 'none';
      
      // ambil info tim lalu tampilkan
      getFavoritedTeamById(renderTeamInfo, renderTeamMatches, renderPreloader, hidePreloader);
    } else {
      let team = getTeamById(renderTeamInfo, renderPreloader, hidePreloader);
      let teamMatches = getTeamMatches(renderTeamMatches, renderPreloader, hidePreloader);
      btnFavorite.onclick = function() {
        console.log("Tombol FAB di klik.");
        team
        .then(function(team) {
          addFavoriteTeamIDB(team).then(function(team){
            teamMatches.then(function(result){
              updateTeamMatchesIDB(result.matches, team);
            })
          });
        })
        .catch(error => {
          console.log(error);
          renderNeedInternetAccess();
        });
      };
    }
});