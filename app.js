
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

  // Házi (homework1) beállítom egy tömbben az előző dobás változóját játékosonként
  previousDices = [0, 0];

  // Házi (homework2) létrehozom a finalScore változót, aminek az értéke alapértelmezetten 100
  finalScore = 100;

  // beállítjuk a kezdőértékeket a UI-n is (a html-ben) - dinamikusan itt tudjuk állítani

  document.querySelector('#score-0').textContent = 0;
  document.querySelector('#score-1').textContent = 0;
  //  ez a jQuery-je ennek: $( '#score-1' ).html(0);

  document.querySelector('#current-0').textContent = 0;
  document.querySelector('#current-1').textContent = 0;

  // a játék kezdetekor a kockát eltüntetjük 
  // inline style-t adunk hozzá az img-hez
  document.querySelector('.dice').style.display = 'none';
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
  console.log('rolling the dice...');
  // 1. generálunk egy random számot 1-6 között
  let dice = Math.floor(Math.random() * 6) + 1;
  // Házi feladat (homework1): kiíratom az aktív játékos current dobását a konzolra
  console.log('current dice of player' + activePlayer + ': ' + dice);
  // 2. az eredményt megjelenítjük a UI-n
  let diceDOM = document.querySelector('.dice');
  diceDOM.style.display = 'block';
  // string concatenation, sztring összefűzés 'dice-'+dice'.png'
  diceDOM.setAttribute('src', 'dice-' + dice + '.png');


  // Házi feladat (homework1): ha 6-ost dob 2-szer, akkor játékosváltás történik és elveszti minden pontját

  // kiíratom a konzolra az aktuális játékos előző dobását
  console.log('previous dice of player' + activePlayer + ': ' + previousDices[activePlayer]);
  // megadom az if függvénynek, hogy ha 6-os dob illetve korábban 6-ost dobott, akkor fusson le a nextPlayer
  if ((dice === 6) && (previousDices[activePlayer] === 6)) {
    scores[activePlayer] = 0;
    document.querySelector('#score-' + activePlayer).textContent = 0;
    nextPlayer();
  }

  // Letárolom a tömbben az aktuális játékos előző dobását
  previousDices[activePlayer] = dice;

  // Ha a játékos 1-est dob, a roundScore értékét elveszti, és a következő játékos jön
  if (dice !== 1) {
    // A dobott értéket kiszámoljuk majd megjelenítjük a piros dobozban
    roundScore = roundScore + dice;

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


// Házi feladat (homework2)
// Ha a játékos rákattint a new button gombra, akkor állítjuk be a finalScore-t
document.querySelector('.btn-new').addEventListener('click', function () {
  if (parseInt(document.getElementsByClassName('final-score')[0].value) >= 0) {
    finalScore = parseInt(document.getElementsByClassName('final-score')[0].value);
  }
  else {
    finalScore = 100;
  }
  console.log('finalScore: ' + finalScore);
});


// ha a hold gombra rányom a játékos
document.querySelector('.btn-hold').addEventListener('click', function () {
  // a játékos megszerzi a kör alatt szerzett pontjait
  // az előző érték plusz a mostani
  scores[activePlayer] = scores[activePlayer] + roundScore;
  // update the UI (megjelenítjük az usernek)
  document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

  // ellenőrizzük, hogy van-e nyertes
  if (scores[activePlayer] >= finalScore) {
    // a játék vége
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.btn-roll').style.display = 'none';
    document.querySelector('.btn-hold').style.display = 'none';

  } else {
    nextPlayer();
  }
});


