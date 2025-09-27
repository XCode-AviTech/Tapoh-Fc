//review caracter counter
const reviewInput = document.getElementById('review');
const char = document.getElementById('char');
const error = document.getElementById('err');
var inputText = reviewInput.value.length;
const maxChar = 150;

char.textContent = `${inputText}/${maxChar}`;

reviewInput.addEventListener('input', () => {
    char.textContent = `${reviewInput.value.length}/${maxChar}`;
    var inputText = reviewInput.value.length;

    //error message
    if (inputText === maxChar) {
        error.textContent = "Character Limit reached!";
    } else {
        error.textContent = "";
    }
});

//star rating

const stars = document.querySelectorAll('#star-rating i');
  const ratingInput = document.getElementById('rating-value');
  let currentRating = 0;

  stars.forEach(star => {
    star.addEventListener('click', () => {
      const clickedValue = parseInt(star.getAttribute('data-value'));

      if (clickedValue === currentRating) {
        // Partial deselect: remove clicked star and stars after it
        currentRating = clickedValue - 1;
      } else {
        currentRating = clickedValue;
      }

      ratingInput.value = currentRating;
      highlightStars(currentRating);
    });
  });

  function highlightStars(rating) {
    stars.forEach(star => {
      const starVal = parseInt(star.getAttribute('data-value'));
      if (starVal <= rating) {
        star.classList.remove('bi-star');
        star.classList.add('bi-star-fill');
      } else {
        star.classList.remove('bi-star-fill');
        star.classList.add('bi-star');
      }
    });
  }