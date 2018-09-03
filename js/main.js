$("header a.scroll-btn").on("click", function () {
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