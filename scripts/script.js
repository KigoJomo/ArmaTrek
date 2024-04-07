// A way to collect images using js and dynamically creating dom elements

//get full control over the content that is displayed
// next and previous buttons get the next element from JS, not html

let currentSlide = 0;
let previousSlide = 0;

function nextSlide() {
    previousSlide = currentSlide;
    currentSlide += 1;
}
