window.onload = fetchMatches;

function fetchMatches() {
    if (document.querySelector('button.tab.active').getAttribute('target') == 'upcomingMatches')
        fetchUpcomingMatches();
    else if ((document.querySelector('button.tab.active').getAttribute('target') == 'oldMatches'))
        fetchOldMatches();
}

function fetchUpcomingMatches() {
    fetch(`http://cricapi.com/api/matches?apikey=${apikey}`)
        .then(res => res.json())
        .then(data => showUpcomingMatches(data.matches))
        .catch(err => console.log(err));
}

function fetchOldMatches() {
    fetch(`http://cricapi.com/api/cricket?apikey=${apikey}`)
        .then(res => res.json())
        .then(data => showOldMatches(data.data))
        .catch(err => console.log(err));
}

function showUpcomingMatches(matches) {
    const results = document.getElementById("matchResults");
    results.innerHTML = "";

    matches.forEach(match => {
        const div = document.createElement("div");
        div.classList.add("card", "card-body", "mb-3", "mr-2", "bg-light", "matchCard", "text-center");
        div.innerHTML = `
                <h4 class="text-dark">${match['team-1']}</h4>
                <h4 class="text-secondary">vs</h4>
                <h4 class="text-dark">${match['team-2']}</h4>
                <p class="lead text-info">Format: ${match.type}</p>
                <p class="lead text-warning">Match Started: ${match.matchStarted ? "Yes" : "No"}</p>
                <p class="lead text-secondary">Squad Announced: ${match.squad ? "Yes" : "No"}</p>
                <p class="lead text-danger">Toss: ${match.toss_winner_team ? match.toss_winner_team : 'Awaited'}</p>
                <p class="lead text-success">Winner: ${match.winner_team ? match.winner_team : 'Awaited'}</p>
                <p class="lead text-primary">Date: ${formatDate(match.date)}</p>
                <button type="button" class="btn btn-outline-dark setMatch" match-id="${match.unique_id}" data-toggle="modal" data-target="#matchScore">View Score Summary</button>
            `;

        results.appendChild(div);
    });
    $(".setMatch").on("click", fetchScorecard);
}

function showOldMatches(matches) {
    const results = document.getElementById("matchResults");
    results.innerHTML = "";

    matches.forEach(match => {
        const div = document.createElement("div");
        div.classList.add("card", "card-body", "mb-3", "mr-2", "bg-light", "matchCard", "text-center");

        const teamScores = match.description.split(' v ');
        teamScores.forEach(teamScore => {
            const head = document.createElement('h5');
            head.classList.add('text-dark');
            head.innerHTML = teamScore;
            div.appendChild(head);
        });

        const divBtn = document.createElement('div');
        divBtn.classList.add('mt-2');
        divBtn.innerHTML = `<button type="button" class="btn btn-outline-dark setMatch" match-id="${match.unique_id}" data-toggle="modal" data-target="#matchScore">View Score Summary</button>`;
        div.appendChild(divBtn);

        results.appendChild(div);
    });

    $(".setMatch").on("click", fetchScorecard);
}

function fetchScorecard(e) {
    e.preventDefault();
    const id = e.currentTarget.getAttribute('match-id');

    fetch(`http://cricapi.com/api/cricketScore?unique_id=${id}&apikey=${apikey}`)
        .then(res => res.json())
        .then(data => showScorecard(data))
        .catch(err => console.log(err));
}

function showScorecard(match) {
    const modalBody = document.querySelector(".modal-body");
    modalBody.innerHTML = "";

    const div = document.createElement("div");
    div.classList.add('text-center');

    const activeTab = document.querySelector('button.tab.active').getAttribute('target');
    if (activeTab == 'upcomingMatches') {
        div.innerHTML = `<h4 class="text-dark">${match['team-1']} vs ${match['team-2']}</h4>`;
    }

    const teamScores = match.score.split(' v ');
    teamScores.forEach(teamScore => {
        const head = document.createElement('h5');
        head.classList.add('text-secondary');
        head.innerHTML = teamScore;
        div.appendChild(head);
    });

    modalBody.appendChild(div);
}

const tabs = document.querySelectorAll('button.tab');
tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
        document.querySelector('button.tab.active').classList.remove('active');
        e.currentTarget.classList.add('active');
        fetchMatches();
    });
});