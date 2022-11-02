const daysEl = document.getElementById('days')
const hoursEl = document.getElementById('hours')
const minsEl = document.getElementById('minutes')
const secondsEl = document.getElementById('seconds')

const newYear = '1 Jan 2023'

function countdown() {
    const newYearDate = new Date(newYear)
    const currentDate = new Date()

    let timeRemaining = newYearDate - currentDate

    let seconds = Math.floor((timeRemaining / 1000) % 60)
    let mins = Math.floor((timeRemaining / 1000 / 60) % 60)
    let hours = Math.floor((timeRemaining / 1000 / 3600) % 24)
    let days = Math.floor(timeRemaining / 1000 / 3600 / 24)

    seconds = formatTime(seconds)

    daysEl.innerText = days
    hoursEl.innerText = hours
    minsEl.innerText = formatTime(mins)
    secondsEl.innerText = formatTime(seconds)
}

// initial call
countdown()
setInterval(countdown, 1000)

function formatTime(time) {
    return time < 10 ? `0${time}` : time
}
