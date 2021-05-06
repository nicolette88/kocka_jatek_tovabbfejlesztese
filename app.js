
// DOM Manipuláció: js-el módosítjuk a html-t és a css-t

let scores, roundScore, activePlayer;


function init() {
  // a két játékos pontszáma egy 2 elemű tömbben lesz tárolva
  // az első elem az első játékos pontszáma, a második a második játékos pontszáma
  scores = [0, 0];

  // az aktuáis játékos kör alatt megszerzett pontjai
  roundScore = 0;

  // mindig az első játékos kezd
  activePlayer = 0;

  // beállítjuk a kezdőértékeket a UI-n is (a html-ben) - dinamikusan itt tudjuk állítani

  document.querySelector('#score-0').textContent = 0;
  document.querySelector('#score-1').textContent = 0;
  //  ez a jQuery-je ennek: $( '#score-1' ).html(0);

  document.querySelector('#current-0').textContent = 0;
  document.querySelector('#current-1').textContent = 0;

  // a játék kezdetekor a kockát eltüntetjük 
  // inline style-t adunk hozzá az img-hez
  document.querySelector('#dice-1').style.display = 'none';
  document.querySelector('#dice-2').style.display = 'none';
  // a gombokat megjelenítjük
  document.querySelector('.btn-roll').style.display = 'block';
  document.querySelector('.btn-hold').style.display = 'block';

  document.querySelector('#name-0').textContent = 'Player 1';
  document.querySelector('#name-1').textContent = 'Player 2';

  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');

  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');

}

init();
document.querySelector('.btn-new').addEventListener('click', init)

// ha a roll dice gombra kattint az user
document.querySelector('.btn-roll').addEventListener('click', function () {
  console.log('rolling the dices...');
  // 1. generálunk egy random számot 1-6 között
  let dice1 = Math.floor(Math.random() * 6) + 1;
  console.log('dice1 roll: ' + dice1);
  // 2. az eredményt megjelenítjük a UI-n
  let dice1DOM = document.querySelector('#dice-1');
  dice1DOM.style.display = 'block';
  // string concatenation, sztring összefűzés 'dice-'+dice'.png'
  dice1DOM.setAttribute('src', 'dice-' + dice1 + '.png');

  let dice2 = Math.floor(Math.random() * 6) + 1;
  console.log('dice2 roll: ' + dice2);
  // 2. az eredményt megjelenítjük a UI-n
  let dice2DOM = document.querySelector('#dice-2');
  dice2DOM.style.display = 'block';
  // string concatenation, sztring összefűzés 'dice-'+dice'.png'
  dice2DOM.setAttribute('src', 'dice-' + dice2 + '.png');


  // Ha a játékos 1-est dob, a roundScore értékét elveszti, és a következő játékos jön

  if ((dice1 !== 1) && (dice2 !== 1)) {
    // A dobott értéket kiszámoljuk majd megjelenítjük a piros dobozban
    roundScore = roundScore + dice1 + dice2;

    document.querySelector('#current-' + activePlayer).textContent = roundScore;

    // ha a játékos 1-est dobott
  } else {
    nextPlayer();
  }

});

// DRY: do not repeat yourself

function nextPlayer() {
  // a roundScore értéket nullázzuk a UI-n is
  document.querySelector('#current-' + activePlayer).textContent = 0;
  // a következő játékos jön
  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }
  roundScore = 0;
  // ha rajta volt a class, akkor leveszi, ha nem, akkor rárakja
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
}

// ha a hold gombra rányom a játékos
document.querySelector('.btn-hold').addEventListener('click', function () {
  // a játékos megszerzi a kör alatt szerzett pontjait
  // az előző érték plusz a mostani
  scores[activePlayer] = scores[activePlayer] + roundScore;
  // update the UI (megjelenítjük az usernek)
  document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

  // ellenőrizzük, hogy van-e nyertes
  if (scores[activePlayer] >= 20) {
    // a játék vége
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
    document.querySelector('#dice-1').style.display = 'none';
    document.querySelector('#dice-2').style.display = 'none';
    document.querySelector('.btn-roll').style.display = 'none';
    document.querySelector('.btn-hold').style.display = 'none';

  } else {
    nextPlayer();
  }
});