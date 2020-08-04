let dbPromised = idb.open("champions-league", 1, function(upgradeDb) {
    let teamsObjectStore = upgradeDb.createObjectStore("teams", {
      keyPath: "id"
    });
    teamsObjectStore.createIndex("name", "name", { unique: true });
});

function addFavoriteTeamIDB(team) {

  return new Promise(function(resolve, reject){
    dbPromised
      .then(function(db) {
        let tx = db.transaction("teams", "readwrite");
        let store = tx.objectStore("teams");
        console.log(team);
        store.add(team);
        return tx.complete;
      })
      .then(function() {
        console.log("Team berhasil di simpan sebagai favorite.");
        resolve(team);
      });
  })
}
function updateTeamMatchesIDB(matches, team) {
    dbPromised
      .then(function(db) {
        let tx = db.transaction("teams", "readwrite");
        let store = tx.objectStore("teams");
        console.log(matches);
        team.matches = matches;
        store.put(team);
        return tx.complete;
      })
      .then(function() {
        console.log("Team matches berhasil di update.");
      });
}

function getTeamsIDB(){
    return new Promise(function(resolve, reject) {
        dbPromised
          .then(function(db) {
            let tx = db.transaction("teams", "readonly");
            let store = tx.objectStore("teams");
            return store.getAll();
          })
          .then(function(teams) {
            resolve(teams);
          });
    });
}

function getTeamByIdIDB(id) {
    return new Promise(function(resolve, reject) {
      dbPromised
        .then(function(db) {
          let tx = db.transaction("teams", "readonly");
          let store = tx.objectStore("teams");
          return store.get(parseInt(id));
        })
        .then(function(team) {
          resolve(team);
        });
    });
}

function deleteTeamIDB(id) {
  return new Promise(function(resolve, reject){
    dbPromised
      .then(function(db) {
        var tx = db.transaction('teams', 'readwrite');
        var store = tx.objectStore('teams');
        store.delete(parseInt(id));
        return tx.complete;
      })
      .then(function() {
        console.log(`Team dengan id ${id} terhapus dari favorit.`);
        resolve();
      });
  });
}