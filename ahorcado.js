const alphabet = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ñ', 'Z', 'X', 'C', 'V', 'B', 'N', 'M'];
const words = ['pilas', 'nubes', 'final', 'minena', 'tormenta', 'parapsicologia', 'pokemon', 'panfleto', 'mueca', 'pinguino', 'caracol', 'garfio', 'clarinete'];
let mistakes = -1;
const bodyParts = ['#torso', '#armL', '#armR', '#legL', '#legR'];

const pickRandomWord = () => words[Math.floor(Math.random() * words.length)];

$.when($.ready).then(() => {
  startGame();
});

const startGame = () => {
  $('.game-result').removeClass('winner', 'looser').text('');
  $('.btn').removeClass('btn-inactive').attr('disabled', false);

  gsap.from('#head', {
    duration: 1,
    scale: 0.1,
    x: 15
  });

  let word = pickRandomWord().toUpperCase();
  for (let i = 0; i < word.length; i++) {
    $('.word').append(
      `<div class="letter-field">
        <span class="letter ${word[i]}">${word[i]}</span>
      </div>`
    );
  }

  for (let i = 0; i < alphabet.length; i++) {
    $('#keyboard').append(`<input type="button" class="btn" value="${alphabet[i]}">`); 
  }

  $('.btn').on('click', e => {
    $(e.target).addClass('btn-inactive').attr('disabled', true);

    if (word.includes(e.target.defaultValue)) {
      $('.'+ e.target.defaultValue).addClass('letter-guessed');
      hasWon(word);
    } else {
      mistakeMade();
    }
  });
}

$('.restart-btn').on('click', () => {
  $('.letter-field').remove();
  $('.btn').remove();
  $('.hidden-bodypart').css('display', 'none');
  mistakes = -1;
  startGame();
});

const hasWon = word => {
  if ($('.letter-guessed').length === word.length) {
    $('.btn').addClass('btn-inactive').attr('disabled', true);
    $('.game-result').addClass('winner').text('Ganaste');
    $('.letter').css( 'color', 'forestgreen');
  }
}

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
    $('.letter').css({ 'visibility': 'initial', 'color': 'red' });
    $('.btn').addClass('btn-inactive').attr('disabled', true);
    $('.game-result').addClass('looser').text('Perdiste');
  }
}
