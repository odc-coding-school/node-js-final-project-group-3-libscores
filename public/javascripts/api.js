function fetchJSONData() {
    // fetch("https://www.thesportsdb.com/api/v1/json/3/searchteams.php?t=Arsenal")
    fetch("https://www.thesportsdb.com//api/v1/json/3/search_all_leagues.php?c=Liberia")
        .then((res) => {
            if (!res.ok) {
                throw new Error
                    (`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
        .then((data) => 
              console.log(data))
        .catch((error) => 
               console.error("Unable to fetch data:", error));
}
var data = fetchJSONData();
console.log(data)