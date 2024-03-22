let coins = 0;
let energyMax = 1000;
let energy = energyMax;

initializeProfile('skvortsovddd', 1, 992, 1000);
disableContextMenu();
gameplayInit();

function initializeProfile(playerName, leagueNumber, coinCount, energyCount) {
    const playerNameElement = document.querySelector('.player-name');
    playerNameElement.textContent = playerName;

    coins = coinCount;
    energy = energyCount;

    setLeague(leagueNumber);
    updateBalance();
    updateEnergy()
}

function setLeague(leagueNumber) {
    const leagueName = document.getElementById("player-league");
    
    if (leagueNumber === 1) {
        leagueName.innerHTML = "🥇 Gold League";
    } else if (leagueNumber === 2) {
        leagueName.innerHTML = "🥈 Silver League";
    } else if (leagueNumber === 3) {
        leagueName.innerHTML = "🥉 Bronze League";
    } else {
        leagueName.innerHTML = "Unknown League";
    }
}

function gameplayInit() {
    var coinImage = document.getElementById('gameplay-coin');

    coinImage.addEventListener('mousedown', function (event) {
        var containerRect = coinImage.getBoundingClientRect();
        var centerX = (event.clientX - containerRect.left) / containerRect.width * 2 - 1;
        var centerY = (event.clientY - containerRect.top) / containerRect.height * 2 - 1;
        
        console.log("Distance from center to cursor (X): " + centerX);
        console.log("Distance from center to cursor (Y): " + centerY);

        var rotateX = -centerY * 20;
        var rotateY = centerX * 20;

        coinImage.style.transform = "perspective(1000px) " +
        "rotateX(" + rotateX + "deg) " +
        "rotateY(" + rotateY + "deg) " +
        "scale3d(0.98, 0.98, 0.98)";
    });

    coinImage.addEventListener('transitionend', function() {
        coinImage.style.transition = ""; // Сбрасываем анимацию
        coinImage.style.transform = ""; // Возвращаем монету в исходное положение
    }, { once: false });
}

function clickCoin() {
    let coinsEarned = Math.floor(Math.random() * 5) + 1;

    if (coinsEarned > energy) {
        coinsEarned = energy;
    }

    coins += coinsEarned;
    energy -= coinsEarned;
    
    if (coinsEarned > 0) {
        showIncome(coinsEarned);
        updateBalance();
        updateEnergy()
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
    incomeElement.style.top = (cursorY - 24) + 'px';

    document.body.appendChild(incomeElement);
    
    setTimeout(function() {
        incomeElement.style.top = (cursorY - 96) + 'px';
    }, 10);

    setTimeout(function() {
        incomeElement.style.opacity = "0";
    }, 250);

    setTimeout(function() {
        incomeElement.remove();
    }, 1000);
}

function updateEnergy() {
    document.querySelector('.energy').style.width = (energy / energyMax * 100) + '%';
    document.querySelector('.energy-counter').textContent = energy;
}

function updateBalance() {
    var balanceElements = document.querySelectorAll('#balance');

    balanceElements.forEach(function(element) {
        element.textContent = coins.toLocaleString('en-EN');
    });
}

function updateUIBackground() {
    if (coins < 1000) {
        
    } else {
        
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

function disableContextMenu() {
    var images = document.querySelectorAll('img');

    images.forEach(function(image) {
        image.addEventListener('contextmenu', function(event) {
            event.preventDefault();
        });
    });
}

function flipCoin() {
    let coinElement = document.querySelector('.gameplay-coin');
    let angle = 0;
    angle += 45;
    coinElement.style.transform = `rotateY(${angle}deg)`;
    setTimeout(() => {
        coinElement.style.transform = `rotateY(${angle - 45}deg)`;
    }, 500);
}


setInterval(function() {
    if (energy < energyMax) {
        energy += 1;
        updateEnergy();
    }
}, 1000);
