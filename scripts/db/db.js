import idb from "./idb.js";

let dbPromised = idb.open("nico-league", 1, function (upgradeDb) {
  let schedulesObjectStore = upgradeDb.createObjectStore("schedules", {
    keyPath: "match.id",
  });
});

function dbSaveMatch(data) {
  return dbPromised
    .then(function (db) {
      let tx = db.transaction("schedules", "readwrite");
      let store = tx.objectStore("schedules");
      store.put(data);
      return tx.complete;
    })
    .then(function () {
      return "1";
    });
}

function dbGetAll() {
  return new Promise(function (resolve, reject) {
    dbPromised
      .then(function (db) {
        let tx = db.transaction("schedules", "readonly");
        let store = tx.objectStore("schedules");

        return store.getAll();
      })
      .then(function (schedules) {
        resolve(schedules);
      });
  });
}

function dbGetById(id) {
  return new Promise(function (resolve, reject) {
    dbPromised
      .then(function (db) {
        let tx = db.transaction("schedules", "readonly");
        let store = tx.objectStore("schedules");
        return store.get(parseInt(id));
      })
      .then(function (data) {
        resolve(data);
      });
  });
}

function dbDeleteById(id) {
  return new Promise(function (resolve, reject) {
    dbPromised
      .then(function (db) {
        let tx = db.transaction("schedules", "readwrite");
        let store = tx.objectStore("schedules");
        store.delete(parseInt(id));
        return tx.complete;
      })
      .then(function () {
        resolve("Success delete data");
      });
  });
}

export { dbSaveMatch, dbGetById, dbGetAll, dbDeleteById };
