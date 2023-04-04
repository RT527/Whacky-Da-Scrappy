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
  ]
} 
/*------------------------ Cached Element References ------------------------*/
const cursor = document.querySelector('.cursor')
const holes = [...document.querySelectorAll('.hole')]
const scoreEl = document.querySelector('.score span')

/*---------------------------- Variables (state) ----------------------------*/
let score = 0
/* let timeLeft = 60
let intervalID = null */
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
/*-------------------------------- Functions --------------------------------*/

//function to grab different songy
function getRandoSong (soundGroup) {
  const songs = sounds[soundGroup]
  const s = Math.floor(Math.random()* songs.length)
  return songs[s]
}
//const sound = new Audio('Scrappy_files/Scrappy-1.mp3')
//testing noise
window.addEventListener('click', ()=> {
  const sound = new Audio(getRandoSong('Scooby'))
  sound.play()
})

function run() {
  const i = Math.floor(Math.random()* holes.length)
  const hole = holes[i]
  let timer = null
  //Choose between Scooby and Scrappy 
  const dog = Math.random()<0.5? 'Scooby' : 'Scrappy'
  //Create scrappy and scooby images
  const img = document.createElement('img')
  img.classList.add('dog')
  img.src = dogs[dog].image
  // event listner when user clicks any of the doggys

}

