import DataSource from "../data/data-source.js";
import {
  convertDate,
  convertTime,
  searchTeam,
  toast,
  isLoaded,
  renderError,
} from "../../scripts/js/myConfig.js";
import { loadPage } from "../../scripts/js/nav.js";
import { dbSaveMatch, dbGetById, dbDeleteById } from "../db/db.js";
let api = new DataSource();

const historyPage = async () => {
  try {
    let currentUrl = window.location.hash.substr(1);
    let params = currentUrl.substr(currentUrl.indexOf("?") + 1);
    params = params.split("&");

    let isSaved = false;
    if (params.length > 1) {
      isSaved = true;
    }
    // Mengambil data dari API
    let idMatch = params[0].substr(params[0].indexOf("=") + 1);
    const datas = await api.getMatchById(idMatch);
    const teams = await api.getTeamsByLeague("2014");
    isLoaded();
    const head2head = datas.head2head;
    const match = datas.match;

    // mengambil icon setiap clubnya
    const homeTeam = searchTeam(match.homeTeam.id, teams);
    const awayTeam = searchTeam(match.awayTeam.id, teams);

    // Bagian Match
    const tanggalMain = document.querySelector("#match-date");
    const jamMain = document.querySelector("#match-time");
    const venue = document.querySelector("#match-venue");
    const logoHomeTeam = document.querySelectorAll(".homeTeam img");
    const logoAwayTeam = document.querySelectorAll(".awayTeam img");
    const homeTeamName = document.querySelectorAll("#match-home-name");
    const awayTeamName = document.querySelectorAll("#match-away-name");

    tanggalMain.innerHTML = convertDate(match.utcDate);
    jamMain.innerHTML = convertTime(match.utcDate);
    venue.innerHTML = match.venue;
    logoHomeTeam[0].src = homeTeam[0].crestUrl;
    homeTeamName[0].innerHTML = homeTeam[0].name;
    logoAwayTeam[0].src = awayTeam[0].crestUrl;
    awayTeamName[0].innerHTML = awayTeam[0].name;

    // Bagian Head2Head
    const winHome = document.querySelector("#h2h-win-home");
    const drawHome = document.querySelector("#h2h-draw-home");
    const loseHome = document.querySelector("#h2h-lose-home");
    const winAway = document.querySelector("#h2h-win-away");
    const drawAway = document.querySelector("#h2h-draw-away");
    const loseAway = document.querySelector("#h2h-lose-away");
    const numberOfMatch = document.querySelector("#h2h-nom");
    const totalGoals = document.querySelector("#h2h-total-goals");

    logoHomeTeam[1].src = homeTeam[0].crestUrl;
    homeTeamName[1].innerHTML = homeTeam[0].name;
    logoAwayTeam[1].src = awayTeam[0].crestUrl;
    awayTeamName[1].innerHTML = awayTeam[0].name;

    winHome.innerHTML = head2head.homeTeam.wins;
    drawHome.innerHTML = head2head.homeTeam.draws;
    loseHome.innerHTML = head2head.homeTeam.losses;
    winAway.innerHTML = head2head.awayTeam.wins;
    drawAway.innerHTML = head2head.awayTeam.draws;
    loseAway.innerHTML = head2head.awayTeam.losses;
    numberOfMatch.innerHTML = head2head.numberOfMatches;
    totalGoals.innerHTML = head2head.totalGoals;

    const remindMe = document.getElementById("reminder");

    // if user coming from "my reminder" page, hide remindMe element
    if (isSaved) {
      remindMe.setAttribute("style", "display:none !important");
    }

    // action for button saveMatch
    const btnSave = document.querySelector("#saveMatch");
    const btnDelete = document.querySelector("#deleteMatch");

    const isDataSaved = await dbGetById(idMatch);

    if (isDataSaved) {
      // Kalau data sudah ada di daftar reminder
      btnSave.style.display = "none";
      btnDelete.style.display = "block";
    } else {
      // Kalau data BELUM ada di daftar reminder
      btnSave.style.display = "block";
      btnDelete.style.display = "none";
    }

    btnSave.onclick = async () => {
      if (isDataSaved) {
        toast("Data has been saved");
      } else {
        // Tambahkan data id, url, name untuk team agar pada saat view di saved pages tidak panggil API
        let dataTeam = {
          homeTeam: {
            id: homeTeam[0].id,
            url: homeTeam[0].crestUrl,
            name: homeTeam[0].name,
          },
          awayTeam: {
            id: awayTeam[0].id,
            url: awayTeam[0].crestUrl,
            name: awayTeam[0].name,
          },
        };
        datas.teams = dataTeam;
        dbSaveMatch(datas).then(() => {
          toast("Success save data");
          loadPage("detailMatch");
        });
      }
    };

    btnDelete.onclick = async () => {
      dbDeleteById(idMatch).then(() => {
        toast("Success delete reminder");
        loadPage("detailMatch");
      });
    };
  } catch (error) {
    console.log(error);
    renderError();
  }
};

export default historyPage;
