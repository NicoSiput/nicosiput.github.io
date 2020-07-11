function convertDate(date) {
  const formatDate = new Date(date);
  const bulan = formatDate.toLocaleString("default", { month: "long" });
  const tanggal = formatDate.getDate();
  const tahun = formatDate.getFullYear();
  return `${tanggal} ${bulan}  ${tahun}`;
}

function convertTime(date) {
  const formatDate = new Date(date);

  let jam = formatDate.getHours();
  jam = ("0" + jam).slice(-2);
  let menit = formatDate.getMinutes();
  menit = ("0" + menit).slice(-2);

  return `${jam} : ${menit}`;
}

function searchTeam(id, data) {
  const filteredTeam = data.teams.filter((team) => {
    return team.id === id;
  });
  if (filteredTeam.length) {
    return filteredTeam;
  }
}

function isLoading() {
  const loader = document.querySelector(".loader-wrapper");
  const mainContent = document.querySelector("#body-content");

  document.querySelector(".loader-wrapper").classList.remove("loaded");
  mainContent.style.display = "none";
}

function isLoaded() {
  document.querySelector(".loader-wrapper").classList.add("loaded");
  const mainContent = document.querySelector("#body-content");
  mainContent.style.display = "block";
}

function toast(msg) {
  M.toast({ html: msg });
}

function renderError(error = "API") {
  isLoaded();
  let containerError = document.querySelector("#body-content");
  let errorPage = "";
  let text = "";
  if (error === "API") {
    text = `<span>Sorry !</span><br />Page not working, please try again`;
  } else if (error === 404) {
    text = `<span>404</span> <br />Page not found`;
  } else {
    text = `<span>503</span> <br />Page cannot be accessed`;
  }
  errorPage = `
    <div class="container">
        <div class="card rounded-6">
          <div class="card-content">
              <div class="error-page s-flex xl-flex center justify-content-center align-item-center">
                <img src="./images/403.jpg" alt="page-error" class="mr-5 mb-5">
                  <p>${text}</p>
              </div>
          </div>
        </div>
      </div>
    `;

  containerError.innerHTML = errorPage;
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export {
  convertDate,
  convertTime,
  searchTeam,
  toast,
  isLoaded,
  isLoading,
  renderError,
  urlBase64ToUint8Array,
};
