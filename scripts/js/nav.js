// View
import main from "../view/main.js";
import standing from "../view/standings.js";
import history from "../view/history.js";
import upcoming from "../view/upcoming.js";
import team from "../view/team.js";
import detailMatch from "../view/detailMatch.js";
import saved from "../view/saved.js";
import { renderError, isLoading } from "./myConfig.js";

document.addEventListener("DOMContentLoaded", function () {
  // Activate sidebar nav
  let elems = document.querySelectorAll(".sidenav");
  M.Sidenav.init(elems);
  loadNav();

  function loadNav() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4) {
        if (this.status !== 200) return;

        // Muat daftar tautan menu
        document.querySelectorAll(".topnav, .sidenav").forEach(function (elm) {
          elm.innerHTML = xhttp.responseText;
        });

        // Daftarkan event listener untuk setiap tautan menu
        document
          .querySelectorAll(".sidenav a, .topnav a, .brand-logo.logo")
          .forEach(function (elm) {
            elm.addEventListener("click", function (event) {
              // Tutup sidenav
              let sidenav = document.querySelector(".sidenav");
              M.Sidenav.getInstance(sidenav).close();

              // Muat konten halaman yang dipanggil
              page = event.target.getAttribute("href").substr(1);
              loadPage(page);
            });
          });
      }
    };
    xhttp.open("GET", "./pages/nav.html", true);
    xhttp.send();
  }

  // Load page content
  let page = window.location.hash.substr(1);
  if (page.includes("?")) {
    page = page.substr(0, page.indexOf("?"));
  }
  if (page === "") page = "home";
  loadPage(page);
});

function loadPage(page) {
  isLoading();
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4) {
      let content = document.querySelector("#body-content");
      if (this.status === 200) {
        content.innerHTML = xhttp.responseText;
        switch (page) {
          case "home":
            main();
            break;
          case "standing":
            standing();
            break;
          case "history":
            history();
            break;
          case "upcoming":
            upcoming();
            break;
          case "team":
            team();
            break;
          case "detailMatch":
            detailMatch();
            break;
          case "saved":
            saved();
            let elems = document.querySelectorAll(".collapsible");
            let instances = M.Collapsible.init(elems);
            break;
        }
      } else if (this.status == 404) {
        console.log("masuk sini");
        renderError(404);
      } else {
        content.innerHTML =
          "<p class='not-found'>Oops ! Page cannot be accessed</p>";
      }
    }
  };
  xhttp.open("GET", "pages/" + page + ".html", true);
  xhttp.send();
}

export { loadPage };
