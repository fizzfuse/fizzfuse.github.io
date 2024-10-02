const countDownDate = new Date("Oct 11, 2024 23:00:00").getTime();

const x = setInterval(function() {
    const now = new Date().getTime();
    const distance = countDownDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("countdown").innerHTML = days + "D " + hours + "H "
    + minutes + "M " + seconds + "S ";

    if (distance < 0) {
        clearInterval(x);
        document.getElementById("countdown").innerHTML = "EVENT INITIATED";
    }
}, 1000);
