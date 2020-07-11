class DataSource {
  constructor() {
    this.BASE_URL = "https://api.football-data.org";
    this.options = {
      headers: {
        "Content-Type": "text/plain",
        "X-Auth-Token": "bb5918cd2d3e4b1092b3e7aec6c3c9e8",
      },
    };
  }

  async getIndex() {
    try {
      // Mengambil data dari cache terlebih dahulu
      if ("caches" in window) {
        const response = await caches.match(
          `${this.BASE_URL}/v2/competitions/2014`
        );

        if (response) {
          const responseJson = await response.json();
          if (responseJson) {
            return responseJson;
          }
        }
      }
      const response = await fetch(
        `${this.BASE_URL}/v2/competitions/2014`,
        this.options
      );
      const responseJson = await response.json();
      if (responseJson) {
        return responseJson;
      }
    } catch (error) {
      console.log("Error getIndex()" + error);
    }
  }

  async getStandings() {
    try {
      // Mengambil data dari cache terlebih dahulu
      if ("caches" in window) {
        const response = await caches.match(
          `${this.BASE_URL}/v2/competitions/2014/standings?standingType=TOTAL`
        );

        if (response) {
          const responseJson = await response.json();
          if (responseJson) {
            return responseJson;
          }
        }
      }

      const response = await fetch(
        `${this.BASE_URL}/v2/competitions/2014/standings?standingType=TOTAL`,
        this.options
      );
      const responseJson = await response.json();
      if (responseJson) {
        return responseJson;
      }
    } catch (error) {
      console.log("Error getStandings()" + error);
    }
  }

  async getMatchesByTeam(id) {
    try {
      // Mengambil data dari cache terlebih dahulu
      if ("caches" in window) {
        const response = await caches.match(
          `${this.BASE_URL}/v2/teams/${id}/matches?status=FINISHED`
        );

        if (response) {
          const responseJson = await response.json();
          if (responseJson) {
            return responseJson;
          }
        }
      }

      const response = await fetch(
        `${this.BASE_URL}/v2/teams/${id}/matches?status=FINISHED`,
        this.options
      );
      const responseJson = await response.json();
      if (responseJson) {
        return responseJson;
      }
    } catch (error) {
      console.log("Error getMatchesByTeam()" + error);
    }
  }

  async getMatchById(id) {
    try {
      // Mengambil data dari cache terlebih dahulu
      if ("caches" in window) {
        const response = await caches.match(
          `${this.BASE_URL}/v2/matches/${id}`
        );

        if (response) {
          const responseJson = await response.json();
          if (responseJson) {
            return responseJson;
          }
        }
      }

      const response = await fetch(
        `${this.BASE_URL}/v2/matches/${id}`,
        this.options
      );
      const responseJson = await response.json();
      if (responseJson) {
        return responseJson;
      }
    } catch (error) {
      console.log("Error getMatchesById()" + error);
    }
  }

  async getTeamsByLeague(id) {
    try {
      // Mengambil data dari cache terlebih dahulu
      if ("caches" in window) {
        const response = await caches.match(
          `${this.BASE_URL}/v2/competitions/${id}/teams`
        );

        if (response) {
          const responseJson = await response.json();
          if (responseJson) {
            return responseJson;
          }
        }
      }
      const response = await fetch(
        `${this.BASE_URL}/v2/competitions/${id}/teams`,
        this.options
      );
      const responseJson = await response.json();
      if (responseJson) {
        return responseJson;
      }
    } catch (error) {
      console.log("Error getTeamsByLeague()" + error);
    }
  }

  async getTeamsById(id) {
    try {
      // Mengambil data dari cache terlebih dahulu
      if ("caches" in window) {
        const response = await caches.match(`${this.BASE_URL}/v2/teams/${id}`);

        if (response) {
          const responseJson = await response.json();
          if (responseJson) {
            return responseJson;
          }
        }
      }
      const response = await fetch(
        `${this.BASE_URL}/v2/teams/${id}`,
        this.options
      );
      const responseJson = await response.json();
      if (responseJson) {
        return responseJson;
      }
    } catch (error) {
      console.log("Error getTeamsById()" + error);
    }
  }

  async getUpcomingMatches(id) {
    try {
      // Mengambil data dari cache terlebih dahulu
      if ("caches" in window) {
        const response = await caches.match(
          `${this.BASE_URL}/v2/competitions/${id}/matches?status=SCHEDULED`
        );

        if (response) {
          const responseJson = await response.json();
          if (responseJson) {
            return responseJson;
          }
        }
      }

      const response = await fetch(
        `${this.BASE_URL}/v2/competitions/${id}/matches?status=SCHEDULED`,
        this.options
      );
      const responseJson = await response.json();
      if (responseJson) {
        return responseJson;
      }
    } catch (error) {
      console.log("Error getUpcomingMatches()" + error);
    }
  }
}

export default DataSource;
