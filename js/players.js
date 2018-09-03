const searchPlayer = document.getElementById("search-player-form");
searchPlayer.addEventListener("submit", fetchPlayers);

function fetchPlayers(e) {
  e.preventDefault();
  const name = document.getElementById("player-name").value;

  if (name == "") {
    showMessage("Please Enter A Name.", "danger");
    return;
  }
  fetch(`http://cricapi.com/api/playerFinder?name=${name}&apikey=${apikey}`)
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
    div.classList.add("card", "card-body", "mb-3");
    div.innerHTML = `
            <div class="row">
                <div class="col-sm-4">
                    <h4>${player.name}</h4>
                    <p>${player.fullName}</p>
                    <button type="button" class="btn btn-outline-dark setPlayer" player-id="${player.pid}" data-toggle="modal" data-target="#playerProfile">View Profile</button> 
                </div>
            </div>    
        `;

    results.appendChild(div);
  });

  $(".setPlayer").on("click", fetchProfile);
}

function fetchProfile(e) {
  e.preventDefault();
  const pid = e.currentTarget.getAttribute('player-id');

  fetch(`http://cricapi.com/api/playerStats?pid=${pid}&apikey=${apikey}`)
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
            <div class="col-lg-5 col-sm-12">
                <div class="text-center text-secondary">
                    <img src="${player.imageURL}" class="rounded mx-auto mb-2 d-block" alt="${player.name}">
                </div> 
            </div>

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
            <li class="list-group-item"><p class="lead text-justify">${player.profile}</p></li>
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
                    <tr>
                        <td>ODIs</td>
                        <td>${
                          player.data.batting.ODIs
                            ? player.data.batting.ODIs.Mat
                              ? player.data.batting.ODIs.Mat
                              : "-"
                            : ""
                        }</td>
                        <td>${
                          player.data.batting.ODIs
                            ? player.data.batting.ODIs.Inns
                              ? player.data.batting.ODIs.Inns
                              : "-"
                            : ""
                        }</td>
                        <td>${
                          player.data.batting.ODIs
                            ? player.data.batting.ODIs.Runs
                            : ""
                        }</td>
                        <td>${
                          player.data.batting.ODIs
                            ? player.data.batting.ODIs.Ave
                            : ""
                        }</td>
                        <td>${
                          player.data.batting.ODIs
                            ? player.data.batting.ODIs.SR
                            : ""
                        }</td>
                        <td>${
                          player.data.batting.ODIs
                            ? player.data.batting.ODIs.HS
                            : ""
                        }</td>
                        <td>${
                          player.data.batting.ODIs
                            ? player.data.batting.ODIs["50"]
                            : ""
                        }</td>
                        <td>${
                          player.data.batting.ODIs
                            ? player.data.batting.ODIs["100"]
                            : ""
                        }</td>
                        <td>${
                          player.data.batting.ODIs
                            ? player.data.batting.ODIs.NO
                            : ""
                        }</td>
                        <td>${
                          player.data.batting.ODIs
                            ? player.data.batting.ODIs.BF
                            : ""
                        }</td>
                        <td>${
                          player.data.batting.ODIs
                            ? player.data.batting.ODIs["4s"]
                            : ""
                        }</td>
                        <td>${
                          player.data.batting.ODIs
                            ? player.data.batting.ODIs["6s"]
                            : ""
                        }</td>
                        <td>${
                          player.data.batting.ODIs
                            ? player.data.batting.ODIs.Ct
                            : ""
                        }</td>
                        <td>${
                          player.data.batting.ODIs
                            ? player.data.batting.ODIs.St
                            : ""
                        }</td>
                    </tr>
                    <tr>
                        <td>Tests</td>
                        <td>${
                          player.data.batting.tests
                            ? player.data.batting.tests.Mat
                            : ""
                        }</td>
                        <td>${
                          player.data.batting.tests
                            ? player.data.batting.tests.Inns
                            : ""
                        }</td>
                        <td>${
                          player.data.batting.tests
                            ? player.data.batting.tests.Runs
                            : ""
                        }</td>
                        <td>${
                          player.data.batting.tests
                            ? player.data.batting.tests.Ave
                            : ""
                        }</td>
                        <td>${
                          player.data.batting.tests
                            ? player.data.batting.tests.SR
                            : ""
                        }</td>
                        <td>${
                          player.data.batting.tests
                            ? player.data.batting.tests.HS
                            : ""
                        }</td>
                        <td>${
                          player.data.batting.tests
                            ? player.data.batting.tests["50"]
                            : ""
                        }</td>
                        <td>${
                          player.data.batting.tests
                            ? player.data.batting.tests["100"]
                            : ""
                        }</td>
                        <td>${
                          player.data.batting.tests
                            ? player.data.batting.tests.NO
                            : ""
                        }</td>
                        <td>${
                          player.data.batting.tests
                            ? player.data.batting.tests.BF
                            : ""
                        }</td>
                        <td>${
                          player.data.batting.tests
                            ? player.data.batting.tests["4s"]
                            : ""
                        }</td>
                        <td>${
                          player.data.batting.tests
                            ? player.data.batting.tests["6s"]
                            : ""
                        }</td>
                        <td>${
                          player.data.batting.tests
                            ? player.data.batting.tests.Ct
                            : ""
                        }</td>
                        <td>${
                          player.data.batting.tests
                            ? player.data.batting.tests.St
                            : ""
                        }</td>
                    </tr>
                    <tr>
                        <td>T20Is</td>
                        <td>${
                          player.data.batting.T20Is
                            ? player.data.batting.T20Is.Mat
                            : ""
                        }</td>
                        <td>${
                          player.data.batting.T20Is
                            ? player.data.batting.T20Is.Inns
                            : ""
                        }</td>
                        <td>${
                          player.data.batting.T20Is
                            ? player.data.batting.T20Is.Runs
                            : ""
                        }</td>
                        <td>${
                          player.data.batting.T20Is
                            ? player.data.batting.T20Is.Ave
                            : ""
                        }</td>
                        <td>${
                          player.data.batting.T20Is
                            ? player.data.batting.T20Is.SR
                            : ""
                        }</td>
                        <td>${
                          player.data.batting.T20Is
                            ? player.data.batting.T20Is.HS
                            : ""
                        }</td>
                        <td>${
                          player.data.batting.T20Is
                            ? player.data.batting.T20Is["50"]
                            : ""
                        }</td>
                        <td>${
                          player.data.batting.T20Is
                            ? player.data.batting.T20Is["100"]
                            : ""
                        }</td>
                        <td>${
                          player.data.batting.T20Is
                            ? player.data.batting.T20Is.NO
                            : ""
                        }</td>
                        <td>${
                          player.data.batting.T20Is
                            ? player.data.batting.T20Is.BF
                            : ""
                        }</td>
                        <td>${
                          player.data.batting.T20Is
                            ? player.data.batting.T20Is["4s"]
                            : ""
                        }</td>
                        <td>${
                          player.data.batting.T20Is
                            ? player.data.batting.T20Is["6s"]
                            : ""
                        }</td>
                        <td>${
                          player.data.batting.T20Is
                            ? player.data.batting.T20Is.Ct
                            : ""
                        }</td>
                        <td>${
                          player.data.batting.T20Is
                            ? player.data.batting.T20Is.St
                            : ""
                        }</td>
                    </tr>
                    <tr>
                        <td>List A</td>
                        <td>${
                          player.data.batting.listA
                            ? player.data.batting.listA.Mat
                            : ""
                        }</td>
                        <td>${
                          player.data.batting.listA
                            ? player.data.batting.listA.Inns
                            : ""
                        }</td>
                        <td>${
                          player.data.batting.listA
                            ? player.data.batting.listA.Runs
                            : ""
                        }</td>
                        <td>${
                          player.data.batting.listA
                            ? player.data.batting.listA.Ave
                            : ""
                        }</td>
                        <td>${
                          player.data.batting.listA
                            ? player.data.batting.listA.SR
                            : ""
                        }</td>
                        <td>${
                          player.data.batting.listA
                            ? player.data.batting.listA.HS
                            : ""
                        }</td>
                        <td>${
                          player.data.batting.listA
                            ? player.data.batting.listA["50"]
                            : ""
                        }</td>
                        <td>${
                          player.data.batting.listA
                            ? player.data.batting.listA["100"]
                            : ""
                        }</td>
                        <td>${
                          player.data.batting.listA
                            ? player.data.batting.listA.NO
                            : ""
                        }</td>
                        <td>${
                          player.data.batting.listA
                            ? player.data.batting.listA.BF
                            : ""
                        }</td>
                        <td>${
                          player.data.batting.listA
                            ? player.data.batting.listA["4s"]
                            : ""
                        }</td>
                        <td>${
                          player.data.batting.listA
                            ? player.data.batting.listA["6s"]
                            : ""
                        }</td>
                        <td>${
                          player.data.batting.listA
                            ? player.data.batting.listA.Ct
                            : ""
                        }</td>
                        <td>${
                          player.data.batting.listA
                            ? player.data.batting.listA.St
                            : ""
                        }</td>
                    </tr>
                    <tr>
                        <td>First Class</td>
                        <td>${
                          player.data.batting.firstClass
                            ? player.data.batting.firstClass.Mat
                            : ""
                        }</td>
                        <td>${
                          player.data.batting.firstClass
                            ? player.data.batting.firstClass.Inns
                            : ""
                        }</td>
                        <td>${
                          player.data.batting.firstClass
                            ? player.data.batting.firstClass.Runs
                            : ""
                        }</td>
                        <td>${
                          player.data.batting.firstClass
                            ? player.data.batting.firstClass.Ave
                            : ""
                        }</td>
                        <td>${
                          player.data.batting.firstClass
                            ? player.data.batting.firstClass.SR
                            : ""
                        }</td>
                        <td>${
                          player.data.batting.firstClass
                            ? player.data.batting.firstClass.HS
                            : ""
                        }</td>
                        <td>${
                          player.data.batting.firstClass
                            ? player.data.batting.firstClass["50"]
                            : ""
                        }</td>
                        <td>${
                          player.data.batting.firstClass
                            ? player.data.batting.firstClass["100"]
                            : ""
                        }</td>
                        <td>${
                          player.data.batting.firstClass
                            ? player.data.batting.firstClass.NO
                            : ""
                        }</td>
                        <td>${
                          player.data.batting.firstClass
                            ? player.data.batting.firstClass.BF
                            : ""
                        }</td>
                        <td>${
                          player.data.batting.firstClass
                            ? player.data.batting.firstClass["4s"]
                            : ""
                        }</td>
                        <td>${
                          player.data.batting.firstClass
                            ? player.data.batting.firstClass["6s"]
                            : ""
                        }</td>
                        <td>${
                          player.data.batting.firstClass
                            ? player.data.batting.firstClass.Ct
                            : ""
                        }</td>
                        <td>${
                          player.data.batting.firstClass
                            ? player.data.batting.firstClass.St
                            : ""
                        }</td>
                    </tr>
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
                    <tr>
                        <td>ODIs</td>
                        <td>${
                          player.data.bowling.ODIs
                            ? player.data.bowling.ODIs.Mat
                            : ""
                        }</td>
                        <td>${
                          player.data.bowling.ODIs
                            ? player.data.bowling.ODIs.Inns
                            : ""
                        }</td>
                        <td>${
                          player.data.bowling.ODIs
                            ? player.data.bowling.ODIs.Wkts
                            : ""
                        }</td>
                        <td>${
                          player.data.bowling.ODIs
                            ? player.data.bowling.ODIs.Runs
                            : ""
                        }</td>
                        <td>${
                          player.data.bowling.ODIs
                            ? player.data.bowling.ODIs.Ave
                            : ""
                        }</td>
                        <td>${
                          player.data.bowling.ODIs
                            ? player.data.bowling.ODIs.SR
                            : ""
                        }</td>
                        <td>${
                          player.data.bowling.ODIs
                            ? player.data.bowling.ODIs.Econ
                            : ""
                        }</td>
                        <td>${
                          player.data.bowling.ODIs
                            ? player.data.bowling.ODIs.Balls
                            : ""
                        }</td>
                        <td>${
                          player.data.bowling.ODIs
                            ? player.data.bowling.ODIs.BBI
                            : ""
                        }</td>
                        <td>${
                          player.data.bowling.ODIs
                            ? player.data.bowling.ODIs.BBM
                            : ""
                        }</td>
                        <td>${
                          player.data.bowling.ODIs
                            ? player.data.bowling.ODIs["4w"]
                            : ""
                        }</td>
                        <td>${
                          player.data.bowling.ODIs
                            ? player.data.bowling.ODIs["5w"]
                            : ""
                        }</td>
                        <td>${
                          player.data.bowling.ODIs
                            ? player.data.bowling.ODIs["10"]
                            : ""
                        }</td>
                    </tr>
                    <tr>
                        <td>Tests</td>
                        <td>${
                          player.data.bowling.tests
                            ? player.data.bowling.tests.Mat
                            : ""
                        }</td>
                        <td>${
                          player.data.bowling.tests
                            ? player.data.bowling.tests.Inns
                            : ""
                        }</td>
                        <td>${
                          player.data.bowling.tests
                            ? player.data.bowling.tests.Wkts
                            : ""
                        }</td>
                        <td>${
                          player.data.bowling.tests
                            ? player.data.bowling.tests.Runs
                            : ""
                        }</td>
                        <td>${
                          player.data.bowling.tests
                            ? player.data.bowling.tests.Ave
                            : ""
                        }</td>
                        <td>${
                          player.data.bowling.tests
                            ? player.data.bowling.tests.SR
                            : ""
                        }</td>
                        <td>${
                          player.data.bowling.tests
                            ? player.data.bowling.tests.Econ
                            : ""
                        }</td>
                        <td>${
                          player.data.bowling.tests
                            ? player.data.bowling.tests.Balls
                            : ""
                        }</td>
                        <td>${
                          player.data.bowling.tests
                            ? player.data.bowling.tests.BBI
                            : ""
                        }</td>
                        <td>${
                          player.data.bowling.tests
                            ? player.data.bowling.tests.BBM
                            : ""
                        }</td>
                        <td>${
                          player.data.bowling.tests
                            ? player.data.bowling.tests["4w"]
                            : ""
                        }</td>
                        <td>${
                          player.data.bowling.tests
                            ? player.data.bowling.tests["5w"]
                            : ""
                        }</td>
                        <td>${
                          player.data.bowling.tests
                            ? player.data.bowling.tests["10"]
                            : ""
                        }</td>
                    </tr>

                    <tr>
                        <td>T20Is</td>
                        <td>${
                          player.data.bowling.T20Is
                            ? player.data.bowling.T20Is.Mat
                            : ""
                        }</td>
                        <td>${
                          player.data.bowling.T20Is
                            ? player.data.bowling.T20Is.Inns
                            : ""
                        }</td>
                        <td>${
                          player.data.bowling.T20Is
                            ? player.data.bowling.T20Is.Wkts
                            : ""
                        }</td>
                        <td>${
                          player.data.bowling.T20Is
                            ? player.data.bowling.T20Is.Runs
                            : ""
                        }</td>
                        <td>${
                          player.data.bowling.T20Is
                            ? player.data.bowling.T20Is.Ave
                            : ""
                        }</td>
                        <td>${
                          player.data.bowling.T20Is
                            ? player.data.bowling.T20Is.SR
                            : ""
                        }</td>
                        <td>${
                          player.data.bowling.T20Is
                            ? player.data.bowling.T20Is.Econ
                            : ""
                        }</td>
                        <td>${
                          player.data.bowling.T20Is
                            ? player.data.bowling.T20Is.Balls
                            : ""
                        }</td>
                        <td>${
                          player.data.bowling.T20Is
                            ? player.data.bowling.T20Is.BBI
                            : ""
                        }</td>
                        <td>${
                          player.data.bowling.T20Is
                            ? player.data.bowling.T20Is.BBM
                            : ""
                        }</td>
                        <td>${
                          player.data.bowling.T20Is
                            ? player.data.bowling.T20Is["4w"]
                            : ""
                        }</td>
                        <td>${
                          player.data.bowling.T20Is
                            ? player.data.bowling.T20Is["5w"]
                            : ""
                        }</td>
                        <td>${
                          player.data.bowling.T20Is
                            ? player.data.bowling.T20Is["10"]
                            : ""
                        }</td>
                    </tr>
                    <tr>
                        <td>List A</td>
                        <td>${
                          player.data.bowling.listA
                            ? player.data.bowling.listA.Mat
                            : ""
                        }</td>
                        <td>${
                          player.data.bowling.listA
                            ? player.data.bowling.listA.Inns
                            : ""
                        }</td>
                        <td>${
                          player.data.bowling.listA
                            ? player.data.bowling.listA.Wkts
                            : ""
                        }</td>
                        <td>${
                          player.data.bowling.listA
                            ? player.data.bowling.listA.Runs
                            : ""
                        }</td>
                        <td>${
                          player.data.bowling.listA
                            ? player.data.bowling.listA.Ave
                            : ""
                        }</td>
                        <td>${
                          player.data.bowling.listA
                            ? player.data.bowling.listA.SR
                            : ""
                        }</td>
                        <td>${
                          player.data.bowling.listA
                            ? player.data.bowling.listA.Econ
                            : ""
                        }</td>
                        <td>${
                          player.data.bowling.listA
                            ? player.data.bowling.listA.Balls
                            : ""
                        }</td>
                        <td>${
                          player.data.bowling.listA
                            ? player.data.bowling.listA.BBI
                            : ""
                        }</td>
                        <td>${
                          player.data.bowling.listA
                            ? player.data.bowling.listA.BBM
                            : ""
                        }</td>
                        <td>${
                          player.data.bowling.listA
                            ? player.data.bowling.listA["4w"]
                            : ""
                        }</td>
                        <td>${
                          player.data.bowling.listA
                            ? player.data.bowling.listA["5w"]
                            : ""
                        }</td>
                        <td>${
                          player.data.bowling.listA
                            ? player.data.bowling.listA["10"]
                            : ""
                        }</td>
                    </tr>
                    <tr>
                        <td>First Class</td>
                        <td>${
                          player.data.bowling.firstClass
                            ? player.data.bowling.firstClass.Mat
                            : ""
                        }</td>
                        <td>${
                          player.data.bowling.firstClass
                            ? player.data.bowling.firstClass.Inns
                            : ""
                        }</td>
                        <td>${
                          player.data.bowling.firstClass
                            ? player.data.bowling.firstClass.Wkts
                            : ""
                        }</td>
                        <td>${
                          player.data.bowling.firstClass
                            ? player.data.bowling.firstClass.Runs
                            : ""
                        }</td>
                        <td>${
                          player.data.bowling.firstClass
                            ? player.data.bowling.firstClass.Ave
                            : ""
                        }</td>
                        <td>${
                          player.data.bowling.firstClass
                            ? player.data.bowling.firstClass.SR
                            : ""
                        }</td>
                        <td>${
                          player.data.bowling.firstClass
                            ? player.data.bowling.firstClass.Econ
                            : ""
                        }</td>
                        <td>${
                          player.data.bowling.firstClass
                            ? player.data.bowling.firstClass.Balls
                            : ""
                        }</td>
                        <td>${
                          player.data.bowling.firstClass
                            ? player.data.bowling.firstClass.BBI
                            : ""
                        }</td>
                        <td>${
                          player.data.bowling.firstClass
                            ? player.data.bowling.firstClass.BBM
                            : ""
                        }</td>
                        <td>${
                          player.data.bowling.firstClass
                            ? player.data.bowling.firstClass["4w"]
                            : ""
                        }</td>
                        <td>${
                          player.data.bowling.firstClass
                            ? player.data.bowling.firstClass["5w"]
                            : ""
                        }</td>
                        <td>${
                          player.data.bowling.firstClass
                            ? player.data.bowling.firstClass["10"]
                            : ""
                        }</td>
                    </tr>
                </tbody>
            </table>
        </div>    
    `;

  modalBody.appendChild(divPersonal);
  modalBody.appendChild(divBio);
  modalBody.appendChild(divTeams);
  modalBody.appendChild(divBatting);
  modalBody.appendChild(divBowling);
}