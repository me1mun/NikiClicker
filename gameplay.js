let coins = 0;
let energyMax = 1000;
let energy = energyMax;

initializeProfile('skvortsovddd', 1, 992, 1000);
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

        var rotateX = -centerY * 20;
        var rotateY = centerX * 20;

        coinImage.style.transform = "perspective(1000px) " +
        "rotateX(" + rotateX + "deg) " +
        "rotateY(" + rotateY + "deg) " +
        "scale3d(0.98, 0.98, 0.98)";
    });

    coinImage.addEventListener('transitionend', function() {
        coinImage.style.transition = "";
        coinImage.style.transform = "";
    }, { once: false });
}

function clickCoin() {
    let coinsEarned = Math.floor(Math.random() * 5) + 1;

    earnCoins(coinsEarned);
}

function earnCoins(value) {
    if (value > energy) {
        value = energy;
    }
    
    if (value > 0) {
        editBalance(value);
        editEnergy(-value);
        showIncome(value);
    }
}

function editBalance(value) {
    coins += value;

    updateBalance();
}

function editEnergy(value) {
    energy += value;

    updateEnergy();
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
        editEnergy(1);
    }
}, 1000);

const bonuses = [
    { image: 'images/pets/pet_dog.png', points: 10, chance: 0.19 },
    { image: 'images/pets/pet_cat.png', points: 14, chance: 0.17 },
    { image: 'images/pets/pet_monkey.png', points: 16, chance: 0.15 },
    { image: 'images/pets/pet_bear.png', points: 18, chance: 0.13 },
    { image: 'images/pets/pet_shiba.png', points: 20, chance: 0.11 },
    { image: 'images/pets/pet_frog.png', points: 22, chance: 0.09 },
    { image: 'images/pets/pet_pig.png', points: 24, chance: 0.06 },
    { image: 'images/pets/pet_pinguin.png', points: 26, chance: 0.04 },
    { image: 'images/pets/pet_shark.png', points: 28, chance: 0.03 },
    { image: 'images/pets/pet_sheep.png', points: 30, chance: 0.02 },
    { image: 'images/pets/pet_niki.png', points: 100, chance: 0.01 }
];

function getRandomBonus() {
    const random = Math.random();
    let cumulativeChance = 0;

    for (const bonus of bonuses) {
        cumulativeChance += bonus.chance;
        if (random <= cumulativeChance) {
            return bonus;
        }
    }
}

function displayBonus() {
    const bonus = getRandomBonus();
    const bonusElement = document.getElementById('bonus');
    const imgElement = bonusElement.querySelector('img');
    imgElement.src = bonus.image;

    bonusElement.style.display = 'block';
    bonusElement.dataset.points = bonus.points;

    const randomX = Math.random() * 80 + 10;
    const randomY = Math.random() * 80 + 10;

    bonusElement.style.left = randomX + '%';
    bonusElement.style.top = randomY + '%';
}



function handleBonusClick() {
    if (energy > 0) {
        const bonusElement = document.getElementById('bonus');
        const bonusCoins = parseInt(bonusElement.dataset.points);
        const min = bonusCoins * 0.5;
        const max = bonusCoins * 1.5;
        const randomBonus = Math.floor(Math.random() * (max - min + 1)) + min;
        earnCoins(randomBonus);

        bonusElement.style.display = 'none';

        setTimeout(displayBonus, 1000);
    }
}

document.getElementById('bonus').addEventListener('click', handleBonusClick);

setTimeout(displayBonus, 1000);