const BASE_URL = "https://api.football-data.org/v2/";
const API_KEY = "a17006d015c84eeb991f1b042d3bbd8e";
const COMPETITION_ID = "2001"; //Champions League
const fetchApi = function(url) {    
  return fetch(url, {
    headers: {
      'X-Auth-Token': API_KEY
    }
  });
};

// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}

// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}

// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}


// Blok kode untuk melakukan request data json
function getStandings(renderCallback, renderPreloader, hidePreloader) {
  renderPreloader();
  if ('caches' in window) {
    caches.match(BASE_URL + "competitions/" + COMPETITION_ID + "/standings?standingType=TOTAL").then(function(response) {
      if (response) {
        response.json().then((data) => {
          if(data){
            renderCallback(data);
          }
          hidePreloader();
        })
      }
      
    })
  }
  // Jika request tidak ada di cache, lanjutkan request ke server
  fetchApi(BASE_URL + "competitions/" + COMPETITION_ID + "/standings?standingType=TOTAL")
    .then(status)
    .then(json)
    .then((data) => {
      if(data){
        renderCallback(data);
      }
      hidePreloader();
    })
    .catch(error);
}

function getTeamById(renderCallback, renderPreloader, hidePreloader) {
  return new Promise(function(resolve, reject) {
    // Ambil nilai query parameter (?teamId=)
    renderPreloader();
    let urlParams = new URLSearchParams(window.location.search);
    let teamId = urlParams.get("teamId");
    if ("caches" in window) {
      caches.match(BASE_URL + "teams/" + teamId).then(function(response) {
        if (response) {
          response.json().then(function(data) {
            if(data){
              renderCallback(data);
            }
            hidePreloader();
            // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
            resolve(data);
          });
        }
      });
    }

    fetchApi(BASE_URL + "teams/" + teamId)
      .then(status)
      .then(json)
      .then(function(data) {
        console.log(data);
        if(data){
          renderCallback(data);
        }
        hidePreloader();
        // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
        resolve(data);
      })
      .catch((error) => {
        console.log(error);
        hidePreloader();
        renderNeedInternetAccess();
      });
  });
}

function getTeamMatches(renderCallback, renderPreloader, hidePreloader) {
  return new Promise(function(resolve, reject) {
    // Ambil nilai query parameter (?teamId=)
    renderPreloader();
    let urlParams = new URLSearchParams(window.location.search);
    let teamId = urlParams.get("teamId");
    if ("caches" in window) {
      caches.match(BASE_URL + "teams/" + teamId + "/matches?competitions=2001").then(function(response) {
        if (response) {
          response.json().then(function(data) {
            if(data){
              renderCallback(data.matches);
            }
            hidePreloader();
            // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
            resolve(data);
          });
        }
      });
    }

    fetchApi(BASE_URL + "teams/" + teamId + "/matches?competitions=2001")
      .then(status)
      .then(json)
      .then(function(data) {
        console.log(data);
        if(data){
          renderCallback(data.matches);
        }
        hidePreloader();
        // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
        resolve(data);
      })
      .catch((error) => {
        console.log(error);
        hidePreloader();
        renderNeedInternetAccess();
      });
  });
}

function getFavoritedTeams(renderCallback, renderPreloader, hidePreloader) {
  renderPreloader();
  getTeamsIDB().then(function(teams) {
    console.log(teams);
    renderCallback(teams);
    hidePreloader();
  });
}

function getFavoritedTeamById(renderTeamInfo, renderMatches, renderPreloader, hidePreloader) {
  let urlParams = new URLSearchParams(window.location.search);
  let teamId = urlParams.get("teamId");
  renderPreloader();
  getTeamByIdIDB(teamId).then(function(team) {
    renderTeamInfo(team);
    if(team){
      renderMatches(team.matches);
    }
    hidePreloader();
  });
}