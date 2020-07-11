import DataSource from "../data/data-source.js";
import { isLoaded, renderError } from "../../scripts/js/myConfig.js";
let api = new DataSource();

const teamPage = async () => {
  let listSquad = document.querySelector("#list-squads");
  try {
    let idTeam = window.location.hash.substr(1);
    idTeam = idTeam.substr(idTeam.indexOf("=") + 1);

    // Mengambil data dari API
    const datas = await api.getTeamsById(idTeam);
    isLoaded();
    const logo = document.querySelector("#team-logo");
    const name = document.querySelector("#team-name");
    const address = document.querySelector("#team-address");
    const venue = document.querySelector("#team-venue");
    const jersey = document.querySelector("#team-jersey");
    const mail = document.querySelector("#team-mail");
    const link = document.querySelector("#team-link");
    const coach = document.querySelector("#team-coach");

    const indexLast = datas.squad.length - 1;
    const coachName = datas.squad[indexLast].name;
    logo.src = datas.crestUrl;
    name.innerHTML = datas.name;
    address.innerHTML = datas.address;
    venue.innerHTML = datas.venue;
    jersey.innerHTML = datas.clubColors;
    mail.innerHTML = `<a href="mailto:${datas.email}">${datas.email}</a>`;
    link.innerHTML = `<a href="${datas.website}" target="_blank">Official Link</a>`;
    coach.innerHTML = coachName;

    let isiCard = "";

    let tagPosition = "";
    datas.squad.forEach((player, index) => {
      switch (player.position) {
        case "Goalkeeper":
          tagPosition = `<span class="badge blue accent-4 white-text ml-2 mr-2 rounded-4">GK</span>`;
          break;
        case "Defender":
          tagPosition = `<span class="badge green accent-4 white-text ml-2 mr-2 rounded-4">DF</span>`;
          break;
        case "Midfielder":
          tagPosition = `<span class="badge yellow accent-4 white-text ml-2 mr-2 rounded-4">MF</span>`;
          break;
        case "Attacker":
          tagPosition = `<span class="badge red accent-4 white-text ml-2 mr-2 rounded-4">AT</span>`;
          break;
      }
      if (player.name !== coachName) {
        isiCard += `
            <tr>
                <td class="flex align-item-center">
                    <span class="position">${index + 1}.</span>
                     ${tagPosition} ${player.name}
                </td>
                <td>${player.nationality}</td>
            </tr>
            `;
      }
    });
    listSquad.innerHTML = isiCard;
  } catch (error) {
    renderError();
  }
};

export default teamPage;
