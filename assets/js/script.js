var startButton = document.querySelector('.start-button');

function startUserFlow(){
    console.log("i've started")
}

// get token each time
// curl -d "grant_type=client_credentials&client_id=8xTjKkX9rqOoNSgYVcICbmHSHx7E8NcVyYx0pXUxWTPBB8RzJG&client_secret=7B3fC5cIclR0jWTEliyi7cM52VgwzLrPm382rKwe" https://api.petfinder.com/v2/oauth2/token
var accesstoken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI4eFRqS2tYOXJxT29OU2dZVmNJQ2JtSFNIeDdFOE5jVnlZeDBwWFV4V1RQQkI4UnpKRyIsImp0aSI6IjJhMzBiM2FlNTU3NzU2MzI1ODgwM2Y2YmE2NTE4ZjRkNzBjMWI0N2ZlNDVkNjUzMDI0OWU2NzhlZTVlOTJmMDE5MmU0OTQ3ZDk0M2ZhMTI0IiwiaWF0IjoxNjcxNDgwMTIyLCJuYmYiOjE2NzE0ODAxMjIsImV4cCI6MTY3MTQ4MzcyMiwic3ViIjoiIiwic2NvcGVzIjpbXX0.idCP5ARD2oH_e_qwNKSLShHL1F3KSSFMD_MrIzCNc9NDSlOX1L8nzFe51wsvSLy30ApcDjdWZy7u2xz85C1spkGsM37H5Ks2_1YI9sxawNj3fV-GTHpBXs9KyOT_0Lq4Yt-6BlM-0D0OJOo3dKGjoFp3zYX_7kUoD3O61ArewO1GUggJ2HEdz5c0OYF-FFHMNI_rz2mmQfydiMi0tYN-Trd16F8yB1Oa08okC4XQQ31SvRt902JOB_tf1IOgvLwaH7DslVUCDi2Nan0CCltSDEkyoZj3AZcqvpOYUnZ3IOG5nVind1AB1Pv599zkq5AOdqX9n87-6qHCCaGTzFU5XQ";

function getData(){
    var testUrl = " https://api.petfinder.com/v2/animals?type=dog&page=2"
  
    fetch(testUrl, {headers: {
      Authorization: "Bearer " + accesstoken
    }}).then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);
          showData(data.animals);
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    });
  };

function showData(animals){
    for (var i = 0; i < animals.length; i++) {  
        console.log(animals[i].name)
    }
}

  getData();
  startButton.addEventListener('click', startUserFlow);