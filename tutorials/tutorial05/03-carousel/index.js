let currentPosition = 0; // follows current position of the carousel
let gap = 10; // gap between the pictures in the carousel
const slideWidth = 400; // how big the slides are

function moveCarousel(direction) {
  // selects the carousel-item class
  const items = document.querySelectorAll('.carousel-item');
  // check if forward button is pressed
  if (direction == 'forward') {
    // minus 2 b/c first 2 slides already showing
    // end function if at last picture
    if (currentPosition >= items.length - 2) {
      return false;
    }
    // increase by 1 otherwise if not last picture
    currentPosition++;
  } else {
    // if moving backwards, if the current position is 0
    // stops function by returning false
    if (currentPosition == 0) {
      return false;
    }
    //otherwise decrease the current position by 1
    currentPosition--;
  }
  // Decides how much the pictures need to move
  // when moving forwards or backwards!
  const offset = (slideWidth + gap) * currentPosition;
  // Loops through each item (pictures) to move
  // them based off the offset value
  for (const item of items) {
    item.style.transform = `translateX(-${offset}px)`;
  }
}
