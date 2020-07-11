import {
  convertDate,
  convertTime,
  isLoading,
  isLoaded,
  toast,
} from "../../scripts/js/myConfig.js";
import { dbGetAll, dbDeleteById } from "../db/db.js";
import { loadPage } from "../js/nav.js";
const savedPage = async () => {
  isLoading();
  try {
    const savedDatas = await dbGetAll();
    isLoaded();
    let listSaved = document.querySelector(".saved-page ul");

    let isiCard = "";
    let tglSekarang = new Date();

    if (savedDatas.length > 0) {
      savedDatas.forEach((data, index) => {
        // Mengambil data dari API
        const head2head = data.head2head;
        const match = data.match;
        const teams = data.teams;

        let tagStatusSchedule = ""; // Active / expired ?
        let tanggalMain = new Date(match.utcDate);
        if (tglSekarang < tanggalMain) {
          tagStatusSchedule = `<p class="green white-text center rounded-4">Active</p>`;
        } else {
          tagStatusSchedule = `<p class="red white-text center rounded-4">Expired</p>`;
        }

        tanggalMain = convertDate(match.utcDate);
        const jamMain = convertTime(match.utcDate);
        isiCard += `
              <li>
                  <div class="collapsible-header position-relative">

                      <div id="ic-collapse" class="position-abs">
                        <svg width="15" height="15" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect width="15" height="15" fill="white"/>
                          <path d="M24.0017 34.2769L35.3599 17.4576" stroke="#898989" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M23.9272 34.0839L11.528 17.7357" stroke="#898989" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </div>
                      
                      <!-- team -->
                      <div class="team flex basis-1 align-item-center">
                          <span class="position">${index + 1}.</span>
                          <div class="flex align-item-center">
                              <img class="club-logo" src="${
                                teams.homeTeam.url
                              }" alt="${teams.homeTeam.name}"
                                  id="ic-home-logo">
                              <span class="ml-2">${teams.homeTeam.name}</span>
                          </div>
                          <div class="mx-3">vs</div>
                          <div class="flex align-item-center">
                              <img class="club-logo" src="${
                                teams.awayTeam.url
                              }" alt="${teams.awayTeam.name}"
                                  id="ic-home-logo">
                              <span class="ml-2">${teams.awayTeam.name}</span>
                          </div>
                      </div>
      
      
                  </div>
                  <div class="collapsible-body position-relative">
                      <div class="row">
                          <!-- Status schedule match -->
                          <div class="status">
                                  <img src="./images/icons/ic_times.png" alt="ic-times" class="position-abs" key="${
                                    match.id
                                  }" id="ic-delete">
                              ${tagStatusSchedule}
                          </div>
      
                          <div class="detail-match">
                              <div class="col m6 s12">
                                  <div class="card">
                                      <div class="card-content">
                                          Head to Head
                                      </div>
      
                                      <div class="card-action">
                                          <div class="container-history mt-2">
                                              <div class="flex">
                                                  <div class="homeTeam center basis-1">
                                                      <img class="club-logo-upcoming mr-1"
                                                          src="${
                                                            teams.homeTeam.url
                                                          }"
                                                          alt="${
                                                            teams.homeTeam.name
                                                          }">
                                                      <p id="match-home-name">${
                                                        teams.homeTeam.name
                                                      }</p>
                                                  </div>
      
                                                  <div class="winrate basis-1">
                                                      <div class="win flex my-2">
                                                          <span
                                                              class="badge green white-text rounded-4 mr-3 ml-0">Win</span>
                                                          <span id="h2h-win-home">${
                                                            head2head.homeTeam
                                                              .wins
                                                          }</span>
                                                      </div>
                                                      <div class="draw flex my-2">
                                                          <span
                                                              class="badge grey white-text rounded-4 mr-3 ml-0">Draw</span>
                                                          <span id="h2h-draw-home">${
                                                            head2head.homeTeam
                                                              .draws
                                                          }</span>
                                                      </div>
                                                      <div class="lose flex my-2">
                                                          <span
                                                              class="badge red white-text rounded-4 mr-3 ml-0">lose</span>
                                                          <span id="h2h-lose-home">${
                                                            head2head.homeTeam
                                                              .losses
                                                          }</span>
                                                      </div>
                                                  </div>
                                              </div>
      
                                              <div class="divider my-2">
                                              </div>
                                              <div class="flex">
                                                  <div class="awayTeam center basis-1">
                                                      <img class="club-logo-upcoming mr-1"
                                                          src="${
                                                            teams.awayTeam.url
                                                          }"
                                                          alt="${
                                                            teams.awayTeam.name
                                                          }">
                                                      <p id="match-away-name">${
                                                        teams.awayTeam.name
                                                      }</p>
                                                  </div>
      
                                                  <div class="winrate basis-1">
                                                      <div class="win flex my-2">
                                                          <span
                                                              class="badge green white-text rounded-4 mr-3 ml-0">Win</span>
                                                          <span id="h2h-win-away">${
                                                            head2head.awayTeam
                                                              .wins
                                                          }</span>
                                                      </div>
                                                      <div class="draw flex my-2">
                                                          <span
                                                              class="badge grey white-text rounded-4 mr-3 ml-0">Draw</span>
                                                          <span id="h2h-draw-away">${
                                                            head2head.awayTeam
                                                              .draws
                                                          }</span>
                                                      </div>
                                                      <div class="lose flex my-2">
                                                          <span
                                                              class="badge red white-text rounded-4 mr-3 ml-0">lose</span>
                                                          <span id="h2h-lose-away">${
                                                            head2head.awayTeam
                                                              .losses
                                                          }</span>
                                                      </div>
                                                  </div>
                                              </div>
      
                                              <div class="win flex my-2">
                                                  <span class="badge mr-3">Number of Match</span>
                                                  <span id="h2h-nom">${
                                                    head2head.numberOfMatches
                                                  }</span>
                                              </div>
                                              <div class="win flex my-2">
                                                  <span class="badge mr-3">Total Goals</span>
                                                  <span id="h2h-total-goals">${
                                                    head2head.totalGoals
                                                  }</span>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </div>
      
                              <div class="col m6 s12">
                                  <div class="card">
                                      <div class="card-content">
                                          <div class="header-history">
                                              <div class="sub-header-history flex mb-1">
                                                  <div class="date flex">
                                                      <i class="material-icons mr-2">date_range</i>
                                                      <p id="match-date">${tanggalMain}</p>
                                                  </div>
      
                                                  <div class="time flex">
                                                      <i class="material-icons ml-2 mr-2">access_time</i>
                                                      <p id="match-time">${jamMain}</p>
                                                  </div>
                                              </div>
                                              <div class="divider"></div>
                                          </div>
                                          <div class="content-match">
                                              <div class="mt-2 blue lighten-5 p-1">
                                                  <div
                                                      class="info-item flex align-item-center justify-content-center">
                                                      <img src="./images/icons/ic_venue.svg" height="30px">
                                                      <span class="ml-3" id="match-venue">${
                                                        match.venue
                                                      }</span>
                                                  </div>
                                              </div>
                                              <div class="content flex align-item-center mt-2">
                                                  <div class="homeTeam center basis-1">
                                                      <img class="club-logo-upcoming mr-1"
                                                          src="${
                                                            teams.homeTeam.url
                                                          }" alt="logo-team">
                                                      <p id="match-home-name">${
                                                        teams.awayTeam.name
                                                      }</p>
                                                  </div>
                                                  <div class="mid">
                                                      VS
                                                  </div>
                                                  <div class="awayTeam center basis-1">
                                                      <img class="club-logo-upcoming mr-1"
                                                          src="${
                                                            teams.awayTeam.url
                                                          }" alt="logo-team">
                                                      <p id="match-away-name">${
                                                        teams.awayTeam.name
                                                      }</p>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </li>
            `;
      });
      listSaved.innerHTML = isiCard;

      document.querySelectorAll("#ic-delete").forEach((elm) => {
        const idMatch = elm.getAttribute("key");
        elm.addEventListener("click", function (event) {
          dbDeleteById(idMatch)
            .then((msg) => {
              toast(msg);
              loadPage("saved");
            })
            .catch((error) => {
              toast("Failed delete data");
            });
        });
      });
    } else {
      // No data in indexedDb
      document.querySelector(".data").innerHTML = `
          <div class="center">
              <img src="./images/no-data.jpg" alt="no-data" id="image-ilustration">
              <h5>You don't have reminder match</h5>
              <a class="btn rounded-4" id="upcoming-link">Pick your first reminder match</a>
          </div>
        `;

      document.querySelector("#upcoming-link").addEventListener("click", () => {
        loadPage("upcoming");
      });
    }
  } catch (error) {
    console.log("error : " + error);
  }
};

export default savedPage;
