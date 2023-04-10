/*-------------------------------- Constants --------------------------------*/
const dogs = { 
  Scooby: {
    image: 'assets/Scooby-happy.png',
    whackedImage: 'assets/Scooby-hurt.png',
    score: -10,
    soundGroup: 'Scooby'
  },
  Scrappy : {
    image: 'assets/Scrappy-happy.png',
    whackedImage: 'assets/Scrappy-hurt.png',
    score: 10,
    soundGroup: 'Scrappy'
  },
  Sea : {
    image: 'assets/sea-monster.png',
    whackedImage: 'assets/sea-monster-dead.png',
    score: 25,
    soundGroup: 'Sea'
  },
  Pumpkin : {
    image: 'assets/pumkin-head.png',
    whackedImage: 'assets/pumkin-head-dead.png',
    score: 20,
    soundGroup: 'Pumpkin'
  },
  Dracula : {
    image: 'assets/dracula.png',
    whackedImage: 'assets/dracula-dead.png',
    score: 50,
    soundGroup: 'Dracula'
  }
}
const sounds = {
  Scooby: [
    'assets/Scooby-1.mp3',
    'assets/Scooby-2.mp3'
  ],
  Scrappy: [
    'assets/Scrappy-1.mp3',
    'assets/Scrappy-2.mp3',
    'assets/Scrappy-3.mp3'
  ],
  Sea: [
    'assets/Sea-1.mp3',
    'assets/Sea-2.mp3'
  ],
  Pumpkin: [
    'assets/Pumpkin-1.mp3',
    'assets/Pumpkin-2.mp3'
  ],
  Dracula: [
    'assets/Dracula-1.mp3',
    'assets/Dracula-2.mp3'
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
  const popUpCloseText = document.createTextNode('CLOSE')

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