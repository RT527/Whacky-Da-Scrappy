/*-------------------------------- Constants --------------------------------*/


/*---------------------------- Variables (state) ----------------------------*/


/*------------------------ Cached Element References ------------------------*/
const cursor = document.querySelector(".cursor")



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

resetBtnEl.addEventListener('click',init)
/*-------------------------------- Functions --------------------------------*/