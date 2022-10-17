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

      // Sneaky put this guy in here
      // Update DOM to reflect new height if window resized while extended content visible
      if (this.targetVisible == true) {
        document.querySelector(this.target).style.height = this.targetMaxHeight;   
      }
    },
    
    buttonClick: function(){
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