const alphabet = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ñ', 'Z', 'X', 'C', 'V', 'B', 'N', 'M'];
const words = ['pilas', 'squall', 'final', 'minena'];
let mistakes = -1;
const correctWords = [];

const pickRandomWord = () => words[Math.floor(Math.random() * words.length)];

$.when($.ready).then(() => {
  gsap.from('#head', {
    duration: 1,
    scale: 0.1,
    x: 15
  });

  for (let i = 0; i < alphabet.length; i++) {
    $('#keyboard').append(`<input type="button" class="btn" value="${alphabet[i]}">`); 
  }

  let word = pickRandomWord().toUpperCase();
  for (let i = 0; i < word.length; i++) {
    $('.word').append(
      `<div class="letter-field">
        <span class="letter ${word[i]}">${word[i]}</span>
      </div>`
    );
  }

  $('.btn').on('click', e => {
    if (word.includes(e.target.defaultValue)) {
      $('.'+ e.target.defaultValue).css('visibility', 'initial');
      correctWords.push(e.target.defaultValue);
      hasWon(word);
    } else {
      mistakeMade();
    }

    $(e.target).addClass('btn-inactive').attr('disabled', true);
  });
});

const hasWon = (word) => {
  if (word.includes(correctWords)) {
    console.log('Palabra completa');
  } else {
    console.log('Palabra incompleta');
  }
}

const bodyParts = ['#torso', '#armL', '#armR', '#legL', '#legR'];
const mistakeMade = () => {
  mistakes++;
  if (mistakes < 5) {
    $(bodyParts[mistakes]).show();
    gsap.from(bodyParts[mistakes], {
      duration: 1,
      scale: 0.1,
      y: 20
    }); 
  } else {
    alert('game-over');
  }
}

$('#botoncito').on('click', () => {
  console.log('funciona');
});
