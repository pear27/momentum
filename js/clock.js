const date = document.getElementById("date");
const clock = document.getElementById("clock");

const days = ["일", "월", "화", "수", "목", "금", "토"];

function getClock() {
    const today = new Date();
    const months = today.getMonth();
    const dates = today.getDate();
    const dayNum = today.getDay();
    date.innerText = `${months + 1}월 ${dates}일 ${days[dayNum]}요일`;

    const hours = String(today.getHours()).padStart(2, "0");
    const minutes = String(today.getMinutes()).padStart(2, "0");
    const seconds = String(today.getSeconds()).padStart(2, "0");
    clock.innerText = `${hours}:${minutes}:${seconds}`;
}

getClock();
setInterval(getClock, 1000);