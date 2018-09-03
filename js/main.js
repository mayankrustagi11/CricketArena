$("header a.scroll-btn").on("click", function (e) {
    e.preventDefault();
    $("html, body").animate({
            scrollTop: $(".features").offset().top
        },
        1000
    );
});

const apikey = "o53OL2Km7QXF4G11iL6kNs6YXE52";

function showMessage(message, className) {
    /* CREATE ALERT ELEMENT */
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));

    /* DISPLAY ALERT ELEMENT */
    const cardBody = document.querySelector(".card-body");
    const cardTitle = document.querySelector(".card-title");
    cardBody.insertBefore(div, cardTitle);

    /* REMOVE ALERT ELEMENT */
    setTimeout(() => document.querySelector(".alert").remove(), 3000);
}

function formatDate(inputDate) {
    let date = new Date(inputDate);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    day = (day < 10) ? '0' + day : day;
    month = (month < 10) ? '0' + month : month;
    date = day + '-' + month + '-' + year;

    return date;
}