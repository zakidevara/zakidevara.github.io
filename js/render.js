function renderPreloader(){
    document.getElementById("preloader").style.display = '';
    document.getElementById("body-content").style.display = 'none';
}

function hidePreloader(){
    document.getElementById("preloader").style.display = 'none';
    document.getElementById("body-content").style.display = '';
}

function renderTeamInfo(team){
    document.getElementById("team-logo").src = team.crestUrl ? team.crestUrl.replace(/^http:\/\//i, 'https://') : "";
    document.getElementById("team-name").innerHTML = `<strong>${team.name}</strong>`;        
}

function renderFavoriteTeams(teams){
    let teamsHTML = "";
    teams.forEach(function(team) {
        let crestUrl = team.crestUrl ? team.crestUrl.replace(/^http:\/\//i, 'https://') : "";
        teamsHTML += `
                  <div class="col s12 m6 xl3">
                    <div class="card h-100">
                      <a href="./team.html?teamId=${team.id}&favorited=true">
                        <div class="card-image waves-effect waves-block waves-light p-5">
                          <img class="team-thumb responsive-img" src="${crestUrl}" />
                        </div>
                      </a>
                      <div class="card-content">
                        <span class="card-title truncate">${team.name}</span>
                        <a id="${team.id}" class="waves-effect waves-light btn red delete-button">
                          <i id="${team.id}" class="material-icons">delete</i>
                        </a>
                      </div>
                    </div>
                  </div>
                `;
    });
    // Sisipkan komponen card ke dalam elemen dengan id #body-content
    document.getElementById("teams").innerHTML = teamsHTML;

    document.querySelectorAll(".delete-button").forEach(function(button){
        button.addEventListener("click", function(e){
        console.log(e.target.id);
        deleteTeamIDB(e.target.id).then(function(){
            getFavoritedTeams(renderFavoriteTeams, renderPreloader, hidePreloader);
        });
      });
    })
}

function renderStandings(data) {
    let groupsHTML = "";
    data.standings.forEach(function(standing) {
        let teamsHTML = "";
        standing.table.forEach(function(item, index, arr){
            teamsHTML += 
            `<tr id="table-row-${item.team.id}">
                
                    <td>${item.position}</td>
                    <td><a href="./team.html?teamId=${item.team.id}">${item.team.name}</a></td>
                    <td>${item.playedGames}</td>
                    <td>${item.won}</td>
                    <td>${item.lost}</td>
                    <td>${item.draw}</td>
                    <td>${item.points}</td>
                
            </tr>`
        });

        groupsHTML += 
        `<div class="my-5" id="${standing.group}">
            <h4>${standing.group.replace(/_/g, " ")}</h4>
            <div id="standings-${standing.group}">
                <table class="highlight responsive-table">
                    <thead>
                        <tr>
                            <th>Pos</th>
                            <th>Team Name</th>
                            <th>Played Games</th>
                            <th>W</th>
                            <th>L</th>
                            <th>D</th>
                            <th>Points</th>
                        </tr>
                    </thead>
            
                    <tbody>
                        ${teamsHTML}
                    </tbody>
                </table>
            </div>
        </div>`;
    });
    
    document.getElementById("groups").innerHTML = groupsHTML;
    document.getElementById("competition-name").innerHTML = data.competition.name + " Standings";
    document.getElementById("competition-season").innerHTML = "Season : " + data.season.startDate + " - " + data.season.endDate;
}

function renderTeamMatches(matches){
    let matchesHTML = "";
    matches.reverse().forEach(function(match, index, arr){
      matchesHTML += 
        `<tr>
          <td>${formatDate(match.utcDate)}</td>
          <td><a href="./team.html?teamId=${match.homeTeam.id}">${match.homeTeam.name}</a></td>
          <td>${match.score.fullTime.homeTeam !==  null ? match.score.fullTime.homeTeam : "TBD"} - ${match.score.fullTime.awayTeam !==  null ? match.score.fullTime.awayTeam : "TBD"}</td>
          <td><a href="./team.html?teamId=${match.awayTeam.id}">${match.awayTeam.name}</a></td>
          <td>${match.stage.replace(/_/g, " ")}</td>
          <td>${match.matchday !==  null ? match.matchday : "-"}</td>
        </tr>`;
    });    
    document.querySelector("#matches tbody").innerHTML = matchesHTML;
}