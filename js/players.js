const searchPlayer = document.getElementById("search-player-form");
searchPlayer.addEventListener("submit", fetchPlayers);

function fetchPlayers(e) {
  e.preventDefault();
  const name = document.getElementById("player-name").value;

  if (name == "") {
    showMessage("Please Enter A Name.", "danger");
    return;
  }
  fetch(`https://cricapi.com/api/playerFinder?name=${name}&apikey=${apikey}`)
    .then(res => res.json())
    .then(data => showPlayers(data.data))
    .catch(err => console.log(err));
}

function showPlayers(players) {
  const results = document.getElementById("results");
  results.innerHTML = "";

  if (players.length < 1) {
    showMessage("No Player Found.", "danger");
    return;
  }

  players.forEach(player => {
    const div = document.createElement("div");
    div.classList.add("card", "card-body", "mb-3", "mr-2", "bg-light");
    div.innerHTML = `
          <h4>${player.name}</h4>
          <p>${player.fullName}</p>
          <button type="button" class="btn btn-outline-dark setPlayer" player-id="${player.pid}" data-toggle="modal" data-target="#playerProfile">View Profile</button>
        `;

    results.appendChild(div);
  });

  $(".setPlayer").on("click", fetchProfile);
}

function fetchProfile(e) {
  e.preventDefault();
  const pid = e.currentTarget.getAttribute('player-id');

  fetch(`https://cricapi.com/api/playerStats?pid=${pid}&apikey=${apikey}`)
    .then(res => res.json())
    .then(data => showProfile(data))
    .catch(err => console.log(err));
}

function showProfile(player) {
  const modalBody = document.querySelector(".modal-body");
  modalBody.innerHTML = "";

  const divPersonal = document.createElement("div");
  divPersonal.innerHTML = `
        <h4 class="text-center">${player.fullName}</h4>
        <h5 class="text-center text-secondary">${player.country}</h5>
        <h6 class="text-secondary my-3 ml-2">Personal Information</h6>
        <div class="row">
            <div class="col-lg-5 col-sm-12 playerImage"></div>
            <div class="col-lg-7 col-sm-12">
                <ul class="list-group">
                    <li class="list-group-item"><p class="lead">Age: ${player.currentAge ? player.currentAge : ""}</p></li>
                    <li class="list-group-item"><p class="lead">Birth: ${player.born ? player.born : ""}</p></li>
                    <li class="list-group-item"><p class="lead">Playing Role: ${player.playingRole ? player.playingRole : ""}</p></li>
                    <li class="list-group-item"><p class="lead">Batting Style: ${player.battingStyle ? player.battingStyle : ""}</p></li>
                    <li class="list-group-item"><p class="lead">Bowling Style: ${player.bowlingStyle ? player.bowlingStyle : ""}</p></li>
                </ul>
            </div>
        </div>
    `;

  const divBio = document.createElement("div");
  divBio.innerHTML = `
        <h6 class="text-secondary my-3 ml-2">Profile</h6>
        <ul class="list-group">
            <li class="list-group-item"><p class="lead text-justify">${player.profile ? player.profile : ''}</p></li>
        </ul>
    `;

  const divTeams = document.createElement("div");
  divTeams.innerHTML = `
        <h6 class="text-secondary my-3 ml-2">Teams</h6>
        <ul class="list-group">
            <li class="list-group-item"><p class="lead">${player.majorTeams}</p></li>
        </ul>
    `;

  const divBatting = document.createElement("div");
  divBatting.innerHTML = `
        <h6 class="text-secondary my-3 ml-2">Batting Performance</h6>
        <div class="scrollable">   
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">League</th>
                        <th scope="col">Mat</th>
                        <th scope="col">Inns</th>
                        <th scope="col">Runs</th>
                        <th scope="col">Avg</th>
                        <th scope="col">SR</th>
                        <th scope="col">HS</th>
                        <th scope="col">50s</th>
                        <th scope="col">100s</th>
                        <th scope="col">NOs</th>
                        <th scope="col">BF</th>
                        <th scope="col">4s</th>
                        <th scope="col">6s</th>
                        <th scope="col">Ct</th>
                        <th scope="col">St</th>
                    </tr>
                </thead>
                <tbody>
                  ${player.data.batting.ODIs ? `                
                    <tr>
                        <td>ODIs</td>
                        <td>${player.data.batting.ODIs.Mat ? player.data.batting.ODIs.Mat : "-"}</td>
                        <td>${player.data.batting.ODIs.Inns ? player.data.batting.ODIs.Inns : "-"}</td>
                        <td>${player.data.batting.ODIs.Runs ? player.data.batting.ODIs.Runs : "-"}</td>
                        <td>${player.data.batting.ODIs.Ave ? player.data.batting.ODIs.Ave : "-"}</td>
                        <td>${player.data.batting.ODIs.SR ? player.data.batting.ODIs.SR : "-"}</td>
                        <td>${player.data.batting.ODIs.HS ? player.data.batting.ODIs.HS : "-"}</td>
                        <td>${player.data.batting.ODIs["50"] ? player.data.batting.ODIs["50"] : "-"}</td>
                        <td>${player.data.batting.ODIs["100"] ? player.data.batting.ODIs["100"] : "-"}</td>
                        <td>${player.data.batting.ODIs.NO ? player.data.batting.ODIs.NO : "-"}</td>
                        <td>${player.data.batting.ODIs.BF ? player.data.batting.ODIs.BF : "-"}</td>
                        <td>${player.data.batting.ODIs["4s"] ? player.data.batting.ODIs["4s"] : "-"}</td>
                        <td>${player.data.batting.ODIs["6s"] ? player.data.batting.ODIs["6s"] : "-"}</td>
                        <td>${player.data.batting.ODIs.Ct ? player.data.batting.ODIs.Ct : "-"}</td>
                        <td>${player.data.batting.ODIs.St ? player.data.batting.ODIs.St : "-"}</td>
                    </tr>
                  ` : ``}  
                  ${player.data.batting.tests ? `                
                    <tr>
                        <td>Test</td>
                        <td>${player.data.batting.tests.Mat ? player.data.batting.tests.Mat : "-"}</td>
                        <td>${player.data.batting.tests.Inns ? player.data.batting.tests.Inns : "-"}</td>
                        <td>${player.data.batting.tests.Runs ? player.data.batting.tests.Runs : "-"}</td>
                        <td>${player.data.batting.tests.Ave ? player.data.batting.tests.Ave : "-"}</td>
                        <td>${player.data.batting.tests.SR ? player.data.batting.tests.SR : "-"}</td>
                        <td>${player.data.batting.tests.HS ? player.data.batting.tests.HS : "-"}</td>
                        <td>${player.data.batting.tests["50"] ? player.data.batting.tests["50"] : "-"}</td>
                        <td>${player.data.batting.tests["100"] ? player.data.batting.tests["100"] : "-"}</td>
                        <td>${player.data.batting.tests.NO ? player.data.batting.tests.NO : "-"}</td>
                        <td>${player.data.batting.tests.BF ? player.data.batting.tests.BF : "-"}</td>
                        <td>${player.data.batting.tests["4s"] ? player.data.batting.tests["4s"] : "-"}</td>
                        <td>${player.data.batting.tests["6s"] ? player.data.batting.tests["6s"] : "-"}</td>
                        <td>${player.data.batting.tests.Ct ? player.data.batting.tests.Ct : "-"}</td>
                        <td>${player.data.batting.tests.St ? player.data.batting.tests.St : "-"}</td>
                    </tr>
                  ` : ``}
                  ${player.data.batting.T20Is ? `                
                    <tr>
                        <td>T20Is</td>
                        <td>${player.data.batting.T20Is.Mat ? player.data.batting.T20Is.Mat : "-"}</td>
                        <td>${player.data.batting.T20Is.Inns ? player.data.batting.T20Is.Inns : "-"}</td>
                        <td>${player.data.batting.T20Is.Runs ? player.data.batting.T20Is.Runs : "-"}</td>
                        <td>${player.data.batting.T20Is.Ave ? player.data.batting.T20Is.Ave : "-"}</td>
                        <td>${player.data.batting.T20Is.SR ? player.data.batting.T20Is.SR : "-"}</td>
                        <td>${player.data.batting.T20Is.HS ? player.data.batting.T20Is.HS : "-"}</td>
                        <td>${player.data.batting.T20Is["50"] ? player.data.batting.T20Is["50"] : "-"}</td>
                        <td>${player.data.batting.T20Is["100"] ? player.data.batting.T20Is["100"] : "-"}</td>
                        <td>${player.data.batting.T20Is.NO ? player.data.batting.T20Is.NO : "-"}</td>
                        <td>${player.data.batting.T20Is.BF ? player.data.batting.T20Is.BF : "-"}</td>
                        <td>${player.data.batting.T20Is["4s"] ? player.data.batting.T20Is["4s"] : "-"}</td>
                        <td>${player.data.batting.T20Is["6s"] ? player.data.batting.T20Is["6s"] : "-"}</td>
                        <td>${player.data.batting.T20Is.Ct ? player.data.batting.T20Is.Ct : "-"}</td>
                        <td>${player.data.batting.T20Is.St ? player.data.batting.T20Is.St : "-"}</td>
                    </tr>
                  ` : ``}
                  ${player.data.batting.listA ? `                
                    <tr>
                        <td>List A</td>
                        <td>${player.data.batting.listA.Mat ? player.data.batting.listA.Mat : "-"}</td>
                        <td>${player.data.batting.listA.Inns ? player.data.batting.listA.Inns : "-"}</td>
                        <td>${player.data.batting.listA.Runs ? player.data.batting.listA.Runs : "-"}</td>
                        <td>${player.data.batting.listA.Ave ? player.data.batting.listA.Ave : "-"}</td>
                        <td>${player.data.batting.listA.SR ? player.data.batting.listA.SR : "-"}</td>
                        <td>${player.data.batting.listA.HS ? player.data.batting.listA.HS : "-"}</td>
                        <td>${player.data.batting.listA["50"] ? player.data.batting.listA["50"] : "-"}</td>
                        <td>${player.data.batting.listA["100"] ? player.data.batting.listA["100"] : "-"}</td>
                        <td>${player.data.batting.listA.NO ? player.data.batting.listA.NO : "-"}</td>
                        <td>${player.data.batting.listA.BF ? player.data.batting.listA.BF : "-"}</td>
                        <td>${player.data.batting.listA["4s"] ? player.data.batting.listA["4s"] : "-"}</td>
                        <td>${player.data.batting.listA["6s"] ? player.data.batting.listA["6s"] : "-"}</td>
                        <td>${player.data.batting.listA.Ct ? player.data.batting.listA.Ct : "-"}</td>
                        <td>${player.data.batting.listA.St ? player.data.batting.listA.St : "-"}</td>
                    </tr>
                  ` : ``}
                  ${player.data.batting.firstClass ? `                
                    <tr>
                        <td>First Class</td>
                        <td>${player.data.batting.firstClass.Mat ? player.data.batting.firstClass.Mat : "-"}</td>
                        <td>${player.data.batting.firstClass.Inns ? player.data.batting.firstClass.Inns : "-"}</td>
                        <td>${player.data.batting.firstClass.Runs ? player.data.batting.firstClass.Runs : "-"}</td>
                        <td>${player.data.batting.firstClass.Ave ? player.data.batting.firstClass.Ave : "-"}</td>
                        <td>${player.data.batting.firstClass.SR ? player.data.batting.firstClass.SR : "-"}</td>
                        <td>${player.data.batting.firstClass.HS ? player.data.batting.firstClass.HS : "-"}</td>
                        <td>${player.data.batting.firstClass["50"] ? player.data.batting.firstClass["50"] : "-"}</td>
                        <td>${player.data.batting.firstClass["100"] ? player.data.batting.firstClass["100"] : "-"}</td>
                        <td>${player.data.batting.firstClass.NO ? player.data.batting.firstClass.NO : "-"}</td>
                        <td>${player.data.batting.firstClass.BF ? player.data.batting.firstClass.BF : "-"}</td>
                        <td>${player.data.batting.firstClass["4s"] ? player.data.batting.firstClass["4s"] : "-"}</td>
                        <td>${player.data.batting.firstClass["6s"] ? player.data.batting.firstClass["6s"] : "-"}</td>
                        <td>${player.data.batting.firstClass.Ct ? player.data.batting.firstClass.Ct : "-"}</td>
                        <td>${player.data.batting.firstClass.St ? player.data.batting.firstClass.St : "-"}</td>
                    </tr>
                  ` : ``}            
                </tbody>
            </table>
        </div>    
    `;

  const divBowling = document.createElement("div");
  divBowling.innerHTML = `
        <h6 class="text-secondary my-3 ml-2">Bowling Performance</h6>
        <div class="scrollable">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">League</th>
                        <th scope="col">Mat</th>
                        <th scope="col">Inns</th>
                        <th scope="col">Wkts</th>
                        <th scope="col">Runs</th>
                        <th scope="col">Avg</th>
                        <th scope="col">SR</th>
                        <th scope="col">Econ</th>
                        <th scope="col">Balls</th>
                        <th scope="col">BBI</th>
                        <th scope="col">BBM</th>
                        <th scope="col">4W</th>
                        <th scope="col">5W</th>
                        <th scope="col">10</th>  
                    </tr>
                </thead>
                <tbody>
                  ${player.data.bowling.ODIs ? `
                    <tr>
                      <td>ODIs</td>
                      <td>${player.data.bowling.ODIs.Mat ? player.data.bowling.ODIs.Mat : "-"}</td>
                      <td>${player.data.bowling.ODIs.Inns ? player.data.bowling.ODIs.Inns : "-"}</td>
                      <td>${player.data.bowling.ODIs.Wkts ? player.data.bowling.ODIs.Wkts : "-"}</td>
                      <td>${player.data.bowling.ODIs.Runs ? player.data.bowling.ODIs.Runs : "-"}</td>
                      <td>${player.data.bowling.ODIs.Ave ? player.data.bowling.ODIs.Ave : "-"}</td>
                      <td>${player.data.bowling.ODIs.SR ? player.data.bowling.ODIs.SR : "-"}</td>
                      <td>${player.data.bowling.ODIs.Econ ? player.data.bowling.ODIs.Econ : "-"}</td>
                      <td>${player.data.bowling.ODIs.Balls ? player.data.bowling.ODIs.Balls : "-"}</td>
                      <td>${player.data.bowling.ODIs.BBI ? player.data.bowling.ODIs.BBI : "-"}</td>
                      <td>${player.data.bowling.ODIs.BBM ? player.data.bowling.ODIs.BBM : "-"}</td>
                      <td>${player.data.bowling.ODIs["4w"] ? player.data.bowling.ODIs["4w"] : "-"}</td>
                      <td>${player.data.bowling.ODIs["5w"] ? player.data.bowling.ODIs["5w"] : "-"}</td>
                      <td>${player.data.bowling.ODIs["10"] ? player.data.bowling.ODIs["10"] : "-"}</td>
                    </tr>
                  ` : ``}
                  ${player.data.bowling.tests ? `
                    <tr>
                      <td>Test</td>
                      <td>${player.data.bowling.tests.Mat ? player.data.bowling.tests.Mat : "-"}</td>
                      <td>${player.data.bowling.tests.Inns ? player.data.bowling.tests.Inns : "-"}</td>
                      <td>${player.data.bowling.tests.Wkts ? player.data.bowling.tests.Wkts : "-"}</td>
                      <td>${player.data.bowling.tests.Runs ? player.data.bowling.tests.Runs : "-"}</td>
                      <td>${player.data.bowling.tests.Ave ? player.data.bowling.tests.Ave : "-"}</td>
                      <td>${player.data.bowling.tests.SR ? player.data.bowling.tests.SR : "-"}</td>
                      <td>${player.data.bowling.tests.Econ ? player.data.bowling.tests.Econ : "-"}</td>
                      <td>${player.data.bowling.tests.Balls ? player.data.bowling.tests.Balls : "-"}</td>
                      <td>${player.data.bowling.tests.BBI ? player.data.bowling.tests.BBI : "-"}</td>
                      <td>${player.data.bowling.tests.BBM ? player.data.bowling.tests.BBM : "-"}</td>
                      <td>${player.data.bowling.tests["4w"] ? player.data.bowling.tests["4w"] : "-"}</td>
                      <td>${player.data.bowling.tests["5w"] ? player.data.bowling.tests["5w"] : "-"}</td>
                      <td>${player.data.bowling.tests["10"] ? player.data.bowling.tests["10"] : "-"}</td>
                    </tr>
                  ` : ``}
                  ${player.data.bowling.T20Is ? `
                    <tr>
                      <td>T20Is</td>
                      <td>${player.data.bowling.T20Is.Mat ? player.data.bowling.T20Is.Mat : "-"}</td>
                      <td>${player.data.bowling.T20Is.Inns ? player.data.bowling.T20Is.Inns : "-"}</td>
                      <td>${player.data.bowling.T20Is.Wkts ? player.data.bowling.T20Is.Wkts : "-"}</td>
                      <td>${player.data.bowling.T20Is.Runs ? player.data.bowling.T20Is.Runs : "-"}</td>
                      <td>${player.data.bowling.T20Is.Ave ? player.data.bowling.T20Is.Ave : "-"}</td>
                      <td>${player.data.bowling.T20Is.SR ? player.data.bowling.T20Is.SR : "-"}</td>
                      <td>${player.data.bowling.T20Is.Econ ? player.data.bowling.T20Is.Econ : "-"}</td>
                      <td>${player.data.bowling.T20Is.Balls ? player.data.bowling.T20Is.Balls : "-"}</td>
                      <td>${player.data.bowling.T20Is.BBI ? player.data.bowling.T20Is.BBI : "-"}</td>
                      <td>${player.data.bowling.T20Is.BBM ? player.data.bowling.T20Is.BBM : "-"}</td>
                      <td>${player.data.bowling.T20Is["4w"] ? player.data.bowling.T20Is["4w"] : "-"}</td>
                      <td>${player.data.bowling.T20Is["5w"] ? player.data.bowling.T20Is["5w"] : "-"}</td>
                      <td>${player.data.bowling.T20Is["10"] ? player.data.bowling.T20Is["10"] : "-"}</td>
                    </tr>
                  ` : ``}
                  ${player.data.bowling.listA ? `
                    <tr>
                      <td>List A</td>
                      <td>${player.data.bowling.listA.Mat ? player.data.bowling.listA.Mat : "-"}</td>
                      <td>${player.data.bowling.listA.Inns ? player.data.bowling.listA.Inns : "-"}</td>
                      <td>${player.data.bowling.listA.Wkts ? player.data.bowling.listA.Wkts : "-"}</td>
                      <td>${player.data.bowling.listA.Runs ? player.data.bowling.listA.Runs : "-"}</td>
                      <td>${player.data.bowling.listA.Ave ? player.data.bowling.listA.Ave : "-"}</td>
                      <td>${player.data.bowling.listA.SR ? player.data.bowling.listA.SR : "-"}</td>
                      <td>${player.data.bowling.listA.Econ ? player.data.bowling.listA.Econ : "-"}</td>
                      <td>${player.data.bowling.listA.Balls ? player.data.bowling.listA.Balls : "-"}</td>
                      <td>${player.data.bowling.listA.BBI ? player.data.bowling.listA.BBI : "-"}</td>
                      <td>${player.data.bowling.listA.BBM ? player.data.bowling.listA.BBM : "-"}</td>
                      <td>${player.data.bowling.listA["4w"] ? player.data.bowling.listA["4w"] : "-"}</td>
                      <td>${player.data.bowling.listA["5w"] ? player.data.bowling.listA["5w"] : "-"}</td>
                      <td>${player.data.bowling.listA["10"] ? player.data.bowling.listA["10"] : "-"}</td>
                    </tr>
                  ` : ``}
                  ${player.data.bowling.firstClass ? `
                    <tr>
                      <td>First Class</td>
                      <td>${player.data.bowling.firstClass.Mat ? player.data.bowling.firstClass.Mat : "-"}</td>
                      <td>${player.data.bowling.firstClass.Inns ? player.data.bowling.firstClass.Inns : "-"}</td>
                      <td>${player.data.bowling.firstClass.Wkts ? player.data.bowling.firstClass.Wkts : "-"}</td>
                      <td>${player.data.bowling.firstClass.Runs ? player.data.bowling.firstClass.Runs : "-"}</td>
                      <td>${player.data.bowling.firstClass.Ave ? player.data.bowling.firstClass.Ave : "-"}</td>
                      <td>${player.data.bowling.firstClass.SR ? player.data.bowling.firstClass.SR : "-"}</td>
                      <td>${player.data.bowling.firstClass.Econ ? player.data.bowling.firstClass.Econ : "-"}</td>
                      <td>${player.data.bowling.firstClass.Balls ? player.data.bowling.firstClass.Balls : "-"}</td>
                      <td>${player.data.bowling.firstClass.BBI ? player.data.bowling.firstClass.BBI : "-"}</td>
                      <td>${player.data.bowling.firstClass.BBM ? player.data.bowling.firstClass.BBM : "-"}</td>
                      <td>${player.data.bowling.firstClass["4w"] ? player.data.bowling.firstClass["4w"] : "-"}</td>
                      <td>${player.data.bowling.firstClass["5w"] ? player.data.bowling.firstClass["5w"] : "-"}</td>
                      <td>${player.data.bowling.firstClass["10"] ? player.data.bowling.firstClass["10"] : "-"}</td>
                    </tr>
                  ` : ``}  
                </tbody>
            </table>
        </div>    
    `;

  modalBody.appendChild(divPersonal);
  modalBody.appendChild(divBio);
  modalBody.appendChild(divTeams);
  modalBody.appendChild(divBatting);
  modalBody.appendChild(divBowling);

  const img = document.createElement('img');
  img.classList.add('rounded', 'mx-auto', 'd-block');
  img.src = player.imageURL.replace("http:", "https:");

  img.onload = function () {};
  img.onerror = function () {
    img.src = 'img/user.png';
  };
  document.querySelector('.playerImage').appendChild(img);
}