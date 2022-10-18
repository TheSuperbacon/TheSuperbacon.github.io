// Overview
// Each DOM button is associated with a JS Object that holds
// information about the button's target div
// methods for updating the target div maxHeight
// and for handling animation of target div

// Bugs TODO:
// When resizing window while target div is expanded, div will GROW but not SHRINK - max height is locking at upper
// limit?
// PROBLEM - scrollHeight can increase but not decrease dynamically?

// GENERATE LIST OF BUTTON OBJECTS
// Button objects store info about their targets
// Find all elements in DOM with the see-more-button class, compile into array.
let buttonNodes= document.querySelectorAll(".see-more-button");


// Array for button objects
let buttonObjects = [];


// Generate button objects, each containing
// - Reference to the DOM node of each button
// - Target extended content div
// - Target max height
// - Is target div visible?
// - Method that generates new max height (run on load + on window resize)
// - Method that handles button clicks, animations
buttonNodes.forEach(function(button) {
  buttonObjects.push({  
    "node" : button,
    "target": "." + button.closest("div").className + "__extended",
    "targetMaxHeight": 0,    
    "targetVisible" : false,

    generateMaxHeight: function(){      
      this.targetMaxHeight = document.querySelector(this.target).scrollHeight + "px";        
      console.log(this.targetMaxHeight);
      console.log(document.querySelector(this.target).scrollHeight);

      // Sneaky put this guy in here
      // Update DOM to reflect new height if window resized while extended content visible
      if (this.targetVisible == true) {
        document.querySelector(this.target).style.height = this.targetMaxHeight;   
      }
    },
  
    buttonClick: function(){
      this.animateTarget();
      this.animateSelf();
    },   

    animateTarget: function(){
      let animDirection = (this.targetVisible == true) ? "reverse" : "normal";

      let hideShowAnim = anime({
        targets: this.target,    
        height: [30, this.targetMaxHeight],   
        "-webkit-mask-image": "linear-gradient(to bottom, black, rgba(0, 0, 0, 1))",
        duration: 250,
        direction: animDirection,
        easing: 'easeInQuad'        
      });    
      
      hideShowAnim.restart();

      this.targetVisible = (this.targetVisible == true) ? false : true;
      console.log(this.targetVisible);
    },

    animateSelf: function(){
      
      let animDirection = (this.targetVisible == true) ? "reverse" : "normal";      

      let buttonFlipAnim = anime({

        begin: function(anim){
          console.log(anim.direction);
        },

        targets: this.node,  
        autoplay: false, 
        duration: 350,
        direction: animDirection,        
        easing: "linear",
        opacity: [
          { value: 1},
          { value: 0},
          { value: 0},
          { value: 1}
        ],
        scaleY: [-1, 1]       
      });       

      buttonFlipAnim.restart();      
    }
  });
});


// Generate maxHeight for each button on page load
buttonObjects.forEach(function(button) {
  button.generateMaxHeight();
});


// GENERATE BUTTON OBJECT INFO ON WINDOW RESIZE
// Window resize event: generate new maxHeight target for each item in buttonObject[]
// Use timeout to limit generateMaxHeights calls to only occur once the window has reached final size
let timeout;
addEventListener('resize', (event) => {  
  clearTimeout(timeout);
  timeout = setTimeout(() => {generateMaxHeights()}, 200);  
});

function generateMaxHeights () {
  buttonObjects.forEach((button) => {button.generateMaxHeight()});   
}

buttonObjects.forEach((buttonObject) => {  
  buttonObject.node.addEventListener("click", buttonObject.buttonClick.bind(buttonObject));
});