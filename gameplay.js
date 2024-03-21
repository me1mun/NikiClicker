let coins = 0;
let energyMax = 100;
let energy = energyMax;

function initializeProfile(playerName, leagueNumber, coinCount, energyCount) {
    const playerNameElement = document.querySelector('.player-name');
    playerNameElement.textContent = playerName;

    coins = coinCount;
    energy = energyCount;

    setLeague(leagueNumber);
    updateUI();
}


function setLeague(leagueNumber) {
    const leagueIcon = document.getElementById("leagueIcon");
    const leagueName = document.getElementById("leagueName");
    
    if (leagueNumber === 1) {
        leagueIcon.innerHTML = "🥇";
        leagueName.textContent = "Gold League";
    } else if (leagueNumber === 2) {
        leagueIcon.innerHTML = "🥈";
        leagueName.textContent = "Silver League";
    } else if (leagueNumber === 3) {
        leagueIcon.innerHTML = "🥉";
        leagueName.textContent = "Bronze League";
    } else {
        leagueIcon.innerHTML = "";
        leagueName.textContent = "Unknown League";
    }
}

initializeProfile('Michael Jackson', 1, 992, 100);

function clickCoin() {
    let coinsEarned = Math.floor(Math.random() * 5) + 1;

    if (coinsEarned > energy) {
        coinsEarned = energy;
    }

    coins += coinsEarned;
    energy -= coinsEarned;
    
    if (coinsEarned > 0) {
        showIncome(coinsEarned);
        updateUI();
        updateUIBackground();
    }
    
}

function showIncome(income) {
    var incomeElement = document.createElement('div');
    var cursorX = event.clientX;
    var cursorY = event.clientY;
    incomeElement.innerText = '' + income;

    incomeElement.classList.add('income');
    incomeElement.style.left = (cursorX - 4) + 'px';
    incomeElement.style.top = (cursorY - 16) + 'px';

    document.body.appendChild(incomeElement);
    
    setTimeout(function() {
        incomeElement.style.top = (cursorY - 64) + 'px';
    }, 10);

    setTimeout(function() {
        incomeElement.style.opacity = "0";
    }, 250);

    setTimeout(function() {
        incomeElement.remove();
    }, 1000);
}

function updateUI() {
    document.querySelector('.coin-count').textContent = "🌕" + coins.toLocaleString('en-EN');
    document.querySelector('.energy').style.width = energy + '%';
    document.querySelector('.energy-counter').textContent = energy;
}

function updateUIBackground() {
    if (coins < 1000) {
        document.body.style.background = "radial-gradient(circle at center, rgb(161, 146, 173), rgb(30, 30, 30) 75%)";
    } else {
        document.body.style.background = "radial-gradient(circle at center, rgb(147, 15, 255), rgb(30, 30, 30) 75%)";
    }
}

function openModal(modalId) {
    var modal = document.getElementById(modalId);
    modal.style.display = "block";

    setTimeout(function() {
        modal.style.backgroundColor = "rgba(0, 0, 0, 0.75)";
        modal.getElementsByClassName('modal-content')[0].style.bottom = "0";
    }, 50);
}

function closeModal(modalId) {
    var modal = document.getElementById(modalId);
    var modalContent = modal.getElementsByClassName('modal-content')[0];

    modalContent.style.bottom = "-80%";
    modal.style.backgroundColor = "rgba(0, 0, 0, 0)";

    modalContent.addEventListener("transitionend", function() {
        modalContent.removeEventListener("transitionend", arguments.callee);
        
        modal.style.display = "none";
    });
}




setInterval(function() {
    if (energy < 100) {
        energy += 1;
        updateUI();
    }
}, 1000);
