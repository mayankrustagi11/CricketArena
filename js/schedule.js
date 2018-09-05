window.onload = fetchSchedule;

function fetchSchedule() {
  fetch(`https://cricapi.com/api/matchCalendar?apikey=${apikey}`)
    .then(res => res.json())
    .then(data => showSchedule(data.data))
    .catch(err => console.log(err));
}

function showSchedule(matches) {
  const results = document.getElementById("schedule");
  results.innerHTML = "";

  matches.forEach(match => {
    const div = document.createElement("div");
    div.classList.add("card", "card-body", "mb-3", "mr-2", "bg-light");
    div.innerHTML = `
            <h4 class="text-dark">${match.name}</h4>
            <p class="lead text-secondary">Date: ${match.date}</p>
            <p class="lead text-secondary">Id: ${match.unique_id}</p>
        `;

    results.appendChild(div);
  });
}