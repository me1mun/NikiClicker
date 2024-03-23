let pets;
let upgrades;

let coins = 0;
let energyMax = 1000;
let energy = energyMax;

gameplayInit();
initializeProfile('skvortsovddd', 1);

function initializeProfile(playerName, leagueNumber) {
    const playerNameElement = document.querySelector('.player-name');
    playerNameElement.textContent = playerName;

    setLeague(leagueNumber);
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
    upgrades = [
        { name: "multitap", level: 1 },
        { name: "rechargingSpeed", level: 1 },
        { name: "energyLimit", level: 1 }
    ];

    pets = [
        { image: 'images/pets/pet_dog.png', coins: 10, chance: 0.19 },
        { image: 'images/pets/pet_cat.png', coins: 14, chance: 0.17 },
        { image: 'images/pets/pet_monkey.png', coins: 16, chance: 0.15 },
        { image: 'images/pets/pet_bear.png', coins: 18, chance: 0.13 },
        { image: 'images/pets/pet_shiba.png', coins: 20, chance: 0.11 },
        { image: 'images/pets/pet_frog.png', coins: 22, chance: 0.09 },
        { image: 'images/pets/pet_pig.png', coins: 24, chance: 0.06 },
        { image: 'images/pets/pet_pinguin.png', coins: 26, chance: 0.04 },
        { image: 'images/pets/pet_shark.png', coins: 28, chance: 0.03 },
        { image: 'images/pets/pet_sheep.png', coins: 30, chance: 0.02 },
        { image: 'images/pets/pet_niki.png', coins: 100, chance: 0.01 }
    ];

    coins = 99990;
    updateEnergyLimit();
    energy = energyMax;

    refreshUI();
    setTimeout(rechargeEnergy, 1000);

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
    let coinsEarned = getUpgradeLevel("multitap");

    earnCoins(coinsEarned);
}

function pay(value) {
    coins -= value;

    refreshBalanceUI();
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

    refreshBalanceUI();
}

function editEnergy(value) {
    energy += value;

    refreshEnergyUI();
}

function updateEnergyLimit() {
    energyMax = 1000 + (getUpgradeLevel("energyLimit") - 1) * 500;

    refreshEnergyUI();
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

function refreshUI() {
    refreshEnergyUI();
    refreshBalanceUI();
    refreshUpgradeUI();
}

function refreshEnergyUI() {
    document.querySelector('.energy').style.width = (energy / energyMax * 100) + '%';
    document.querySelector('.energy-counter').textContent = energy;
}

function refreshBalanceUI() {
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

function rechargeEnergy() {
    if (energy < energyMax) {
        editEnergy(1);
    }

    setTimeout(rechargeEnergy, 1000 / getUpgradeLevel("rechargingSpeed"));
}

function getRandomPet() {
    const random = Math.random();
    let cumulativeChance = 0;

    for (const pet of pets) {
        cumulativeChance += pet.chance;
        if (random <= cumulativeChance) {
            return pet;
        }
    }
}

function displayPet() {
    const pet = getRandomPet();
    const petElement = document.getElementById('pet');
    const imgElement = petElement.querySelector('img');
    imgElement.src = pet.image;

    petElement.style.display = 'block';
    petElement.dataset.coins = pet.coins;

    const center = { x: 50, y: 50 };
    const radius = 45;

    const angle = Math.random() * 2 * Math.PI;
    
    const randomX = center.x + radius * Math.cos(angle);
    const randomY = center.y + radius * Math.sin(angle);

    petElement.style.left = randomX + '%';
    petElement.style.top = randomY + '%';
}

function handlePetClick() {
    if (energy > 0) {
        const petElement = document.getElementById('pet');
        const petCoins = parseInt(petElement.dataset.coins);
        const min = petCoins * 0.5;
        const max = petCoins * 1.5;
        const randomBonus = Math.floor(Math.random() * (max - min + 1)) + min;
        earnCoins(randomBonus);

        petElement.style.display = 'none';

        setTimeout(displayPet, 2000);
    }
}

document.getElementById('pet').addEventListener('click', handlePetClick);

setTimeout(displayPet, 1000);



function getUpgradeLevel(characteristic) {
    const upgrade = upgrades.find(upgrade => upgrade.name === characteristic);
    return upgrade ? upgrade.level : null;
}

function refreshUpgradeUI() {
    upgrades.forEach(upgrade => {
        const upgradeElement = document.getElementById(`upgrade-${upgrade.name}`);
        const levelElement = upgradeElement.querySelector(`#shop-upgrade-level`);
        const costElement = upgradeElement.querySelector(`#shop-upgrade-cost`);
        
        let cost = getUpgradeCost(upgrade.level);

        levelElement.querySelector(`span`).textContent = upgrade.level;
        costElement.querySelector(`span`).textContent = cost;
        
        if (cost == null) {
            costElement.style.display = "none";
        }
    });
}

function getUpgradeCost(level) {
    level -=1;
    const levelCosts = [1000, 2000, 5000, 10000];
    if (level >= levelCosts.length) {
        return null;
    }
    return levelCosts[level];
}

function upgrade(upgradeName) {
    const upgrade = upgrades.find(upgrade => upgrade.name === upgradeName);
    const cost = getUpgradeCost(upgrade.level);

    if (cost !== null && coins >= cost) {
        upgrade.level++;
        
        pay(cost);

        refreshUpgradeUI();
    }

    if(upgradeName == "energyLimit") {
        updateEnergyLimit();
    }
}

