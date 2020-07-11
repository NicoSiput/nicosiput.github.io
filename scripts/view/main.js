import DataSource from "../data/data-source.js";
import { convertDate } from "../../scripts/js/myConfig.js";

import { isLoaded, renderError } from "../../scripts/js/myConfig.js";
import { loadPage } from "../js/nav.js";
let api = new DataSource();

const main = async () => {
  try {
    const datas = await api.getIndex();
    const top3 = await api.getStandings();
    isLoaded();
    const leagueName = datas.name;
    const areaName = datas.area.name;
    const tglMulai = convertDate(datas.currentSeason.startDate);
    const tglSelesai = convertDate(datas.currentSeason.endDate);

    const pos1Id = top3.standings[0].table[0].team.id;
    const pos2Id = top3.standings[0].table[1].team.id;
    const pos3Id = top3.standings[0].table[2].team.id;
    const pos1Name = top3.standings[0].table[0].team.name;
    const pos2Name = top3.standings[0].table[1].team.name;
    const pos3Name = top3.standings[0].table[2].team.name;
    const pos1Url = top3.standings[0].table[0].team.crestUrl;
    const pos2Url = top3.standings[0].table[1].team.crestUrl;
    const pos3Url = top3.standings[0].table[2].team.crestUrl;

    let urlTeams = document.querySelectorAll("#link-team");
    let logoTeams = document.querySelectorAll(".club-logo-upcoming");
    let nameTeams = document.querySelectorAll("#team-name");

    document.querySelector(".title").innerHTML = `${leagueName} - ${areaName}`;
    document.querySelector(
      ".currentSeason"
    ).innerHTML = `${tglMulai} - ${tglSelesai}`;

    nameTeams[0].innerHTML = pos1Name;
    urlTeams[0].href = `#team?id=${pos1Id}`;
    logoTeams[0].src = pos1Url;
    logoTeams[0].alt = pos1Name;

    nameTeams[1].innerHTML = pos2Name;
    urlTeams[1].href = `#team?id=${pos2Id}`;
    logoTeams[1].src = pos2Url;
    logoTeams[1].alt = pos2Name;

    nameTeams[2].innerHTML = pos3Name;
    urlTeams[2].href = `#team?id=${pos3Id}`;
    logoTeams[2].src = pos3Url;
    logoTeams[2].alt = pos3Name;

    urlTeams.forEach((elm) => {
      elm.addEventListener("click", () => {
        loadPage("team");
      });
    });
  } catch (error) {
    renderError();
  }
};

export default main;
