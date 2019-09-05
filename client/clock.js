
// gets current time
// converts time from 24hr clock to 12hr clock
function getTime() {
  const time = new Date()
  let hours = time.getHours()
  let minutes = time.getMinutes()
  let seconds = time.getSeconds()

  const amPm = hours < 12 ? 'AM' : 'PM'

  hours = hours > 12 ? `${hours - 12}` : `${hours}`
  hours = hours < 10 ? `0${hours}` : `${hours}`
  minutes = minutes < 10 ? `0${minutes}` : `${minutes}`
  seconds = seconds < 10 ? `0${seconds}` : `${seconds}`

  return { hours, minutes, seconds, amPm }
}

// formats time as an iterable object for the updateClock function
// and grabs the apropriate style for each number

// each number is a div comprized of 2 child divs
// children[0] is the top div of a number
// children[1] is the bottom div of a number
function formatTime(time) {
  const hours = time.hours.split('')
  const minutes = time.minutes.split('')
  const seconds = time.seconds.split('')
  const amPm = time.amPm

  return {
    hours: {
      first: {
        id: 'hour-f',
        styles: [
          stylesTop[hours[0]],
          stylesBot[hours[0]]
        ]
      },
      second: {
        id: 'hour-s',
        styles: [
          stylesTop[hours[1]],
          stylesBot[hours[1]]
        ]
      }
    },
    minutes: {
      first: {
        id: 'min-f',
        styles: [
          stylesTop[minutes[0]],
          stylesBot[minutes[0]]
        ]
      },
      second: {
        id: 'min-s',
        styles: [
          stylesTop[minutes[1]],
          stylesBot[minutes[1]]
        ]
      }
    },
    seconds: {
      first: {
        id: 'sec-f',
        styles: [
          stylesTop[seconds[0]],
          stylesBot[seconds[0]]
        ]
      },
      second: {
        id: 'sec-s',
        styles: [
          stylesTop[seconds[1]],
          stylesBot[seconds[1]]
        ]
      }
    },
    amPm: {
      first: {
        id: 'amPm',
        styles: [
          stylesTop[amPm],
          stylesBot[amPm]
        ]
      }
    }
  }
}


const stylesTop = {
  0: ['bot-off'],
  1: ['left-off', 'top-off', 'bot-off'],
  2: ['left-off'],
  3: ['left-off'],
  4: ['top-off'],
  5: ['right-off'],
  6: ['right-off'],
  7: ['left-off', 'bot-off'],
  8: ['null'],
  9: ['null'],
  AM: ['none'],
  PM: ['hide']
}

const stylesBot = {
  0: ['top-off'],
  1: ['left-off', 'top-off', 'bot-off'],
  2: ['right-off'],
  3: ['left-off'],
  4: ['left-off', 'bot-off'],
  5: ['left-off'],
  6: ['null'],
  7: ['left-off', 'bot-off', 'top-off'],
  8: ['null'],
  9: ['left-off'],
  AM: ['hide'],
  PM: ['none']
}

// creates a closure so that the function is only invoked when the new time is 		different from the old time
// loops through each number removing previous styling 
// and adding updated styling
function updateClock() {
  let time = getTime()

  return () => {
    const newTime = getTime()
    if (newTime.seconds === time.seconds) return null
    time = newTime
    const timeObj = formatTime(time)

    for (let e in timeObj) {
      const unit = timeObj[e]
      for (let i in unit) {
        const digit = unit[i]
        document.getElementById(`${digit.id}`)
          .children[0].classList
          .remove('left-off', 'right-off', 'bot-off', 'top-off', 'none', 'hide')
        document.getElementById(`${digit.id}`)
          .children[1].classList
          .remove('left-off', 'right-off', 'bot-off', 'top-off', 'none', 'hide')
        document.getElementById(`${digit.id}`)
          .children[0].classList
          .add(...digit.styles[0])
        document.getElementById(`${digit.id}`)
          .children[1].classList
          .add(...digit.styles[1])
      }
    }
  }
}

const runClock = updateClock()

// updates the clock every 1/4 second
setInterval(runClock, 250)




