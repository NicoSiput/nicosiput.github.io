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

const upcomingPage = async () => {
  let listHistory = document.querySelector(".list-upcoming");
  try {
    // Mengambil data dari API
    const datas = await api.getUpcomingMatches("2014");
    const teams = await api.getTeamsByLeague("2014");
    isLoaded();
    let isiCard = "";
    datas.matches.forEach((data) => {
      // mengambil icon setiap clubnya
      const homeTeam = searchTeam(data.homeTeam.id, teams);
      const awayTeam = searchTeam(data.awayTeam.id, teams);

      let iconHome = "./images/logo-not-found.svg";
      if (homeTeam) {
        iconHome = homeTeam[0].crestUrl;
      }
      let iconAway = "./images/logo-not-found.svg";
      if (awayTeam) {
        iconAway = awayTeam[0].crestUrl;
      }
      const tanggalMain = convertDate(data.utcDate);
      const jamMain = convertTime(data.utcDate);
      isiCard += `
            <div class="col s12 m6 xl4">
                <div class="card">
                    <div class="card-content">
                    
                        <a id="link-detail-upcoming" href="#detailMatch?id=${data.id}"><img src="./images/icons/ic_link.svg" height="20px" alt="link"/></a>
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
                        </div>
                        <div class="container-history flex mt-2">
                            <div class="homeTeam center basis-1">
                                <a href="#team?id=${data.homeTeam.id}" id="link-team">
                                    <img class="club-logo-upcoming mr-1"
                                        src="${iconHome}"
                                        alt="${data.homeTeam.name}">
                                    <p>${data.homeTeam.name}</p>
                                </a>
                            </div>
                            <div class="mid">
                                VS
                            </div>
                            <div class="awayTeam center basis-1">
                                <a href="#team?id=${data.awayTeam.id}" id="link-team">
                                    <img class="club-logo-upcoming mr-1"
                                        src="${iconAway}"
                                        alt="${data.awayTeam.name}">
                                    <p>${data.awayTeam.name}</p>
                                </a>
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

    document.querySelectorAll("#link-detail-upcoming").forEach(function (elm) {
      elm.addEventListener("click", function (event) {
        // Muat konten halaman yang dipanggil
        loadPage("detailMatch");
      });
    });
  } catch (error) {
    renderError();
  }
};

export default upcomingPage;
