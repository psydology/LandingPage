/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
const startingLandingPage = performance.now();
const ul = document.getElementById('navbar__list');
const sections = document.querySelectorAll('section');
let fragment = document.createDocumentFragment();
const arrowup = document.getElementById('scrollToTop');
const heading = document.querySelectorAll('h2');
let navbar = document.querySelector('.page__header');
const perfTime = document.querySelector('.page__footer');


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= -200 &&  rect.top <= 200
    );
}

function removeActivelink(){
    const a = document.querySelectorAll('.menu__link');
    a.forEach(function (link) {
        link.classList.remove("active");
    })
}

function hideArrow(){
    if (window.scrollY < 450 ){
        arrowup.style.visibility = "hidden";
    }else{
        arrowup.style.visibility = "visible";
    }
}



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav 

function addNavBar(){
    
    sections.forEach(function(section){
        let li = document.createElement("li"); 
        let nav = section.getAttribute("data-nav")
        let a = document.createElement("a");
        let textNode = document.createTextNode(nav);
        // Scroll to section on link click
        a.addEventListener("click" , function(e){
         e.preventDefault();
        section.scrollIntoView({behavior:"smooth"})
    });
    a.className = "menu__link";
    a.setAttribute("href" , "#")
    a.appendChild(textNode)
    
    li.appendChild(a);
    fragment.appendChild(li);
    
    })
   
    ul.appendChild(fragment);
    
}





// Add class 'active' to section when near top of viewport
function addActiveSection(){
    removeActivelink();
    sections.forEach (function(section){  
        if (isInViewport(section)){
             section.classList.add("your-active-class"); 
            activeLink(section);
        } else {
            section.classList.remove("your-active-class");
        } 
    })
        

    function activeLink(section) {
        const a = document.querySelectorAll('.menu__link');
        a.forEach(function (link) {
            if (section.getAttribute('data-nav') == link.textContent) {
                link.classList.add("active");

            } else {
                link.classList.remove("active");
            }
        });
    }
}


// Scroll to anchor ID using scrollTO event
function returnToUP(){
    arrowup.addEventListener('click' , function(e){
        e.preventDefault();
        window.scrollTo(0,0,"smooth");
        removeActivelink();
    })
}

returnToUP();


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
addNavBar();
window.addEventListener("scroll" , hideArrow);



// Set sections as active

window.addEventListener("scroll" ,addActiveSection);

// make sections collapse
function collapseSctions(){
    heading.forEach(function (h){
        h.style = ("background-color : rgba(0,0,0,.1); cursor: pointer;");
        h.addEventListener("click" , function(){
            this.parentNode.classList.toggle("collapse");
            })
    })
}

collapseSctions();


//Hide fixed navigation bar while not scrolling
function hideFixed(){
    let timer = null;
    window.addEventListener('scroll', function() {
        if(timer !== null) {
            clearTimeout(timer);
            navbar.style = "position:fixed;";       
        }
        timer = setTimeout(function() {
            navbar.style = "position:relative;";
        }, 5000);
    });
}
hideFixed();

const endingLandingPage = performance.now();
 // add performance time 

 function addPerformanceTime(){
     let p = document.createElement('p');
     p.innerHTML = "this site loaded on " + (endingLandingPage - startingLandingPage) + " ms";
     perfTime.appendChild(p);

 }

 addPerformanceTime();
console.log("this site loaded on " + (endingLandingPage - startingLandingPage) + " ms")

// add class to responsive view

function doResponsive() {
    let x = document.getElementById("navbar__list");
    if (x.className === "navbar__list") {
      x.className += " responsive";
    } else {
      x.className = "navbar__list";
    }
  }

