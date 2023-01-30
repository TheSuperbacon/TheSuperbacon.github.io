// TODO: Rework how this library is implemented in projects.
// - Current issue: hard-coding topNavBarHeight limits functionality and may cause problems for developers.
// - Explore JS modules, Glide.js's 'mount' function, etc, for alternatives.

// ==============


// Your nav bar height in px
// Scroll calculations offset scroll by this amount to keep target section on screen
let topNavBarHeight = 100; 
let buttonClass = ".button";


$(document).ready(function(){  

  // When nav item clicked, run clickHandler()
  $(buttonClass).on("click", function(click){
    clickHandler(click);
  });  
});

function clickHandler(click){  
  
  // Location of the section to scroll to, set later
  let targetLocation = 0;  

  // Find the id of the element to scroll to
  // Using "section-" prefix and suffix of button clicked id
  let targetName = "#section-" + click.target.id.replace("button-", "");
  
  // Generate location (px) of section to scroll to. Offset of section
  // from top of document MINUS the height of the 
  // top nav bar if nav bar is sticky  
  targetLocation = $(targetName).offset().top - topNavBarHeight;

  // Scroll to targetLocation using smooth scrolling
  window.scrollTo({
    top: targetLocation,
    left: 0,
    behavior: 'smooth'
  });

}



