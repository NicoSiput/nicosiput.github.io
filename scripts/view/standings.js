import DataSource from "../data/data-source.js";
import { loadPage } from "../../scripts/js/nav.js";
import {
  isLoaded,
  renderError,
  convertDate,
} from "../../scripts/js/myConfig.js";
let api = new DataSource();

const standingPage = async () => {
  let listStandings = document.querySelector(".list-standings tbody");

  try {
    const datas = await api.getStandings();
    isLoaded(); // hide loader
    let isiTable = "";

    const tglMulai = convertDate(datas.season.startDate);
    const tglSelesai = convertDate(datas.season.endDate);
    document.querySelector("#title").innerHTML = datas.competition.name;
    document.querySelector(
      "#currentSeason"
    ).innerHTML = `${tglMulai} - ${tglSelesai}`;
    datas.standings[0].table.forEach((standing) => {
      isiTable += `
      <tr>
          <td class="flex">
              <span class="position">${standing.position}.</span>
              <div class="flex">
                <a href="#team?id=${standing.team.id}" id="link-team">
                    <img class="club-logo"
                        src="${standing.team.crestUrl}"
                        alt="club-logo">
                    <span class="ml-2">${standing.team.name}</span>
                </a>
              </div>
          </td>
          <td class="center">${standing.won}</td>
          <td class="center">${standing.draw}</td>
          <td class="center">${standing.lost}</td>
          <td class="center">${standing.playedGames}</td>
          <td class="center">${standing.points}</td>
          <td class="center"><a id="history-link" href="#history?id=${standing.team.id}"><i
                      class="material-icons">timer</i></a>
          </td>
      </tr>
      `;
    });
    listStandings.innerHTML = isiTable;

    document.querySelectorAll("#history-link").forEach(function (elm) {
      elm.addEventListener("click", function (event) {
        // Muat konten halaman yang dipanggil
        loadPage("history");
      });
    });

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
export default standingPage;
