/*-------------------------------- Constants --------------------------------*/


/*---------------------------- Variables (state) ----------------------------*/
let score = 0
let timeLeft = 60
let intervalID = null

/*------------------------ Cached Element References ------------------------*/
const cursor = document.querySelector(".cursor")
const sounds = new Audio('Scrappy_files/Scooby-1.mp3') 
const sound = new Audio(sounds[dog.])
const dogs = [
  {
    image: 'Scrappy_files/'
  }
]

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

window.addEventListener('click',()=>{
  const sound
})