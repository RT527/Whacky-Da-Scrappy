/*-------------------------------- Constants --------------------------------*/
const dogs = { 
  Scooby: {
    image: 'Scrappy_files/Scooby-happy.png',
    whackedImage: 'Scrappy_files/Scooby-hurt.png',
    score: -10,
    soundGroup: 'Scooby'
  },
  Scrappy : {
    image: 'Scrappy_files/Scrappy-happy.png',
    whackedImage: 'Scrappy_files/Scrappy-hurt.png',
    score: 10,
    soundGroup: 'Scrappy'
  },
  Sea : {
    image: 'Scrappy_files/sea-monster.png',
    whackedImage: 'Scrappy_files/sea-monster-dead.png',
    score: 25,
    soundGroup: 'Sea'
  },
  Pumpkin : {
    image: 'Scrappy_files/pumkin-head.png',
    whackedImage: 'Scrappy_files/pumkin-head-dead.png',
    score: 20,
    soundGroup: 'Pumpkin'
  },
  Dracula : {
    image: 'Scrappy_files/dracula.png',
    whackedImage: 'Scrappy_files/dracula-dead.png',
    score: 50,
    soundGroup: 'Dracula'
  }
}
const sounds = {
  Scooby: [
    'Scrappy_files/Scooby-1.mp3',
    'Scrappy_files/Scooby-2.mp3'
  ],
  Scrappy: [
    'Scrappy_files/Scrappy-1.mp3',
    'Scrappy_files/Scrappy-2.mp3',
    'Scrappy_files/Scrappy-3.mp3'
  ],
  Sea: [
    'Scrappy_files/Sea-1.mp3',
    'Scrappy_files/Sea-2.mp3'
  ],
  Pumpkin: [
    'Scrappy_files/Pumpkin-1.mp3',
    'Scrappy_files/Pumpkin-2.mp3'
  ],
  Dracula: [
    'Scrappy_files/Dracula-1.mp3',
    'Scrappy_files/Dracula-2.mp3'
  ]
} 
/*------------------------ Cached Element References ------------------------*/
const cursor = document.querySelector('.cursor')
const holes = [...document.querySelectorAll('.hole')]
const scoreEl = document.querySelector('.score span')
const timerEl = document.querySelector('.timer span')
const resetBtn = document.getElementById('reset-btn')
/*---------------------------- Variables (state) ----------------------------*/
let score = 0
let timeLeft = 60
let intervalID = null
/*----------------------------- Event Listeners -----------------------------*/
window.addEventListener('mousemove', m => {
  cursor.style.top = m.pageY + 'px'
  cursor.style.left = m.pageX + 'px'
})
window.addEventListener('mousedown',() =>{
  cursor.classList.add('active')
})
window.addEventListener('mouseup',() =>{
  cursor.classList.remove('active')
})

resetBtn.addEventListener('click',resetGame)
/*-------------------------------- Functions --------------------------------*/
//function to grab different songy
function getRandoSong (soundGroup) {
  const songs = sounds[soundGroup]
  const s = Math.floor(Math.random()* songs.length)
  return songs[s]
}

function showScore() {
  const finalScore = score
  const popUp = document.createElement('div')
  const popUpContent = document.createTextNode(score <= 0
    ? `YOU LOSE!! NO SCOOBY SNACKS! YOUR SCORE IS: ${finalScore}`
    : `YOU WIN!! HERE'S YOUR SCOOBY SNACK !🍪 YOUR SCORE IS: ${finalScore}`)
  const popUpClose = document.createElement('button')
  const popUpCloseText = document.createTextNode('Close')

  popUp.appendChild(popUpContent)
  popUpClose.appendChild(popUpCloseText)
  popUp.appendChild(popUpClose)
  popUp.classList.add('pop-up')
  popUpClose.classList.add('pop-up_close')

  document.body.appendChild(popUp)

  popUpClose.addEventListener('click', () => {
    popUp.remove()
  })
}

function gameStart() {
  const i = Math.floor(Math.random()* holes.length)
  const hole = holes[i]
  let timer = null
  const dogNames = Object.keys(dogs)
  const dogIndex = Math.floor(Math.random()*dogNames.length)
  const dog = dogs[dogNames[dogIndex]]
  const img = document.createElement('img')
  img.classList.add('dog')
  img.src = dog.image
  // event listner when user clicks any of the doggys
  img.addEventListener('click', ()=> {
    score += dog.score
    const soundGroup = dog.soundGroup
    const sound = new Audio(getRandoSong(soundGroup))
    sound.play()
    scoreEl.textContent = score
    img.src = dog.whackedImage
    clearTimeout(timer)
    setTimeout(()=> {
      hole.removeChild(img)
      gameStart()
    },555)
  })
  hole.appendChild(img)

  timer = setTimeout(() => {
    hole.removeChild(img)
    gameStart()
  }, 1527);
}
//timer functions
function updateTimer(time) {
  const timerEl = document.querySelector('.timer span')
  timerEl.textContent = time
}

function startTimer(dur) {
  timeLeft = dur
  updateTimer(timeLeft)

  const intervalID = setInterval(()=> {
    timeLeft--
    if (timeLeft <= 0) {
      clearInterval(intervalID)
      endGame()
    } else {
      updateTimer(timeLeft)
    }
  },999)
}

function endGame() {
  holes.forEach(hole=> {
    const dogImg = hole.querySelector('.dog')
    if (dogImg) {
      hole.removeChild(dogImg)
    }
  })
  clearTimeout()
  clearInterval()
  showScore()
  resetBtn.style.display = 'block'
}

function resetGame(){
  resetBtn.style.display = 'none'
  score = 0
  scoreEl.textContent = score

  gameStart()
  startTimer(60)
}

gameStart()
startTimer(60)