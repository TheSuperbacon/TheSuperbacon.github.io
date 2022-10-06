/*
TODO: Rework logic to move animation definition object and variables
this object references OUT of the buttonClick function

Use a window.resize event to keep maxHeight up to date
Ensure expandableContent is generated every launch - perhaps as a property of the button object?
*/

let expandableContentList = document.querySelectorAll


// Find all elements in DOM with the see-more-button class, compile into array.
let buttonList = document.querySelectorAll(".see-more-button");

// For each button add event listener "click".
buttonList.forEach((button) => button.addEventListener("click", buttonClick.bind(button)));
//let expandableContent = document.querySelector("." + this.closest("div").className + "__extended");  



function buttonClick() {  


  let expandableContent = document.querySelector(".web-portfolio__extended")
  let maxHeight = expandableContent.scrollHeight + "px";  
    console.log(maxHeight);
  
  let hideShowAnim = anime({
    targets: expandableContent,    
    height: [30, maxHeight],   
    "-webkit-mask-image": "linear-gradient(to bottom, black, rgba(0, 0, 0, 1))",
    duration: 250,
    easing: 'easeInQuad',
    complete: function(anim) {
      anim.direction = (anim.direction == "normal") ? "reverse" :  "normal";
    }
  });


  // For each button, generate selector for extended content div using the className of the parent <div> and an identifying suffix. 
  // THIS references current button.
  // TODO: Performance: maybe unwise to do this on EVERY button click? Try on page load.  
 
  let button = this;
  let buttonIcon = this.firstChild;

  // Set max height of expandable container to fit current contents
  
 

  // Set up anime.js animation
  // Initial values set in styles.css, apart from height which uses a [to, from] range
  // Do not replace the to-from range with a single to value - this breaks anime.js
 

  // TODO: The below code plays the animation forwards smoothly, but reverts instantly when
  // it should smoothly reverse animation. Why?
  // Have tried checking whether hideShowAnim.began is true before setting reverse - no luck.


  // Animate
  hideShowAnim.restart();
    // Change button icon
    // TODO: Animate button
    // Change activated status
   
}









