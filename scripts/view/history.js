import DataSource from "../data/data-source.js";
import {
  convertDate,
  convertTime,
  searchTeam,
  isLoaded,
  renderError,
} from "../../scripts/js/myConfig.js";
import { loadPage } from "../../scripts/js/nav.js";
let api = new DataSource();

const historyPage = async () => {
  let listHistory = document.querySelector(".list-history");
  let historyOfTeam = document.querySelector(".team-history");
  try {
    let idTeam = window.location.hash.substr(1);
    idTeam = idTeam.substr(idTeam.indexOf("=") + 1);

    // Mengambil data dari API
    const datas = await api.getMatchesByTeam(idTeam);
    const teams = await api.getTeamsByLeague("2014");
    isLoaded();
    const teamName = searchTeam(parseInt(idTeam), teams);
    historyOfTeam.innerHTML = teamName[0].name;

    let isiCard = "";
    datas.matches.forEach((history) => {
      // mengambil icon setiap clubnya
      const homeTeam = searchTeam(history.homeTeam.id, teams);
      const awayTeam = searchTeam(history.awayTeam.id, teams);

      let iconHome = "./images/logo-not-found.svg";
      if (homeTeam) {
        iconHome = homeTeam[0].crestUrl;
      }
      let iconAway = "./images/logo-not-found.svg";
      if (awayTeam) {
        iconAway = awayTeam[0].crestUrl;
      }

      let whoWinner = history.score.winner;
      if (whoWinner === "AWAY_TEAM") {
        whoWinner = history.awayTeam.id;
      } else if (whoWinner === "HOME_TEAM") {
        whoWinner = history.homeTeam.id;
      } else {
        whoWinner = "DRAW";
      }

      let tagResult = "";

      if (whoWinner === "DRAW") {
        tagResult = `<span class="badge grey white-text rounded-4">Draw</span>`;
      } else if (idTeam == whoWinner) {
        tagResult = `<span class="badge green white-text rounded-4">Win</span>`;
      } else {
        tagResult = `<span class="badge red white-text rounded-4">Lose</span>`;
      }
      const tanggalMain = convertDate(history.utcDate);
      const jamMain = convertTime(history.utcDate);
      isiCard += `
        <div class="col s12 m6 xl4">
                        <div class="card">
                            <div class="card-content">
                                <div class="header-history">
                                    <div class="sub-header-history flex mb-1">
                                        <div class="date flex">
                                        <i class="material-icons mr-2">date_range</i>
                                        <p>${tanggalMain}</p>
                                        </div>
                                        
                                        <div class="time flex">
                                        <i class="material-icons ml-2 mr-2">access_time</i>
                                        <p>${jamMain}</p>
                                        </div>
                                    </div>
                                    <div class="divider"></div>
                                    <div class="competition mt-2 center blue lighten-5">
                                      <p>${history.competition.name}</p>
                                    </div>
                                </div>
                                <div class="container-history flex mt-2">
                                    <div class="teams">
                                        <div class="homeTeam flex">
                                            <h6 class="mr-2">${history.score.fullTime.homeTeam}</h6>
                                            <a href="#team?id=${history.homeTeam.id}" class="flex align-item-center" id="link-team">
                                              <img class="club-logo-history mr-1"
                                                  src="${iconHome}"
                                                  alt="${history.homeTeam.name}">
                                              <p>${history.homeTeam.name}</p>
                                            </a>
                                        </div>
                                        
                                        <div class="awayTeam flex">
                                              <h6 class="mr-2">${history.score.fullTime.awayTeam}</h6>
                                              <a href="#team?id=${history.awayTeam.id}" class="flex align-item-center" id="link-team">
                                                <img class="club-logo-history mr-1"
                                                    src="${iconAway}"
                                                    alt="${history.awayTeam.name}">
                                                <p>${history.awayTeam.name}</p>
                                              </a>
                                        </div>
                                    </div>
                                    <div class="result">
                                        <p>${tagResult}</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
        `;
    });
    listHistory.innerHTML = isiCard;

    document.querySelectorAll("#link-team").forEach(function (elm) {
      elm.addEventListener("click", function (event) {
        // Muat konten halaman yang dipanggil
        loadPage("team");
      });
    });
  } catch (error) {
    renderError();
  }
};

export default historyPage;
