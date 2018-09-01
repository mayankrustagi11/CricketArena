$("header a.scroll-btn").on("click", function () {
    $("html, body").animate({
            scrollTop: $(".features").offset().top
        },
        1000
    );
});

const searchPlayer = document.getElementById('search-player-form');
searchPlayer.addEventListener('submit', fetchPlayers);

const apikey = 'o53OL2Km7QXF4G11iL6kNs6YXE52';

function fetchPlayers(e) {
    e.preventDefault();

    const name = document.getElementById('player-name').value;

    fetch(`http://cricapi.com/api/playerFinder?name=${name}&apikey=${apikey}`)
        .then(res => res.json())
        .then(data => showPlayers(data.data))
        .catch(err => console.log(err));
}

function showPlayers(players) {
    const results = document.getElementById('results');
    results.innerHTML = '';

    players.forEach(player => {
        const div = document.createElement('div');
        div.classList.add('card', 'card-body', 'mb-3');
        div.innerHTML = `
            <div class="row">
                <div class="col-sm-4">
                    <h4>${player.name}</h4>
                    <p>${player.fullName}</p>
                    <a href="profile.html?id=${player.pid}" class="btn btn-outline-dark player-profile-fetch">View Profile</a>
                </div>
            </div>    
        `;

        results.appendChild(div);
    });
}