let background;

let pets, upgrades, specials;
let specialPrice = 1000;

const specialElement = document.getElementById('special');
const petElement = document.getElementById('pet');

let activeSpecial = { name: 'none', factor: 10};
let displaySpecial = 'none';
let specialDislpayTimer;
let specialModeTimer;

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
    background = document.getElementById('effectBackground');

    upgrades = [
        { name: "multitap", level: 1 },
        { name: "rechargingSpeed", level: 1 },
        { name: "energyLimit", level: 1 }
    ];

    specials = [
        { name: "rocket", icon: 'images/specials/rocket.png', available: 3 },
        { name: "bomb", icon: 'images/specials/bomb.png', available: 2 },
        { name: "shuriken", icon: 'images/specials/shuriken.png', available: 1 },
        { name: "energy", icon: 'images/specials/energy.png', available: 1 }
    ];

    pets = [
        { image: 'images/pets/pet_dog.png', coins: 10, chance: 0.15 },
        { image: 'images/pets/pet_cat.png', coins: 14, chance: 0.15 },
        { image: 'images/pets/pet_monkey.png', coins: 16, chance: 0.1 },
        { image: 'images/pets/pet_bear.png', coins: 18, chance: 0.1 },
        { image: 'images/pets/pet_shiba.png', coins: 20, chance: 0.1 },
        { image: 'images/pets/pet_frog.png', coins: 22, chance: 0.1 },
        { image: 'images/pets/pet_pig.png', coins: 24, chance: 0.1 },
        { image: 'images/pets/pet_pinguin.png', coins: 26, chance: 0.1 },
        { image: 'images/pets/pet_shark.png', coins: 28, chance: 0.04 },
        { image: 'images/pets/pet_sheep.png', coins: 30, chance: 0.04 },
        { image: 'images/pets/pet_niki.png', coins: 200, chance: 0.02 }
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
    let isSpecialMode = activeSpecial.name !== "none";

    if (isSpecialMode) {
        let randomFactorOptions = [0.5, 1, 1.5];
        let randomFactor = randomFactorOptions[Math.floor(Math.random() * randomFactorOptions.length)];
        value *= activeSpecial.factor * randomFactor;
    } else {
        if (value > energy) {
            value = energy;
        }
    }
    
    if (value > 0) {
        editBalance(value);
        showIncome(value);

        if (!isSpecialMode) {
            editEnergy(-value);
        }

        vibrate();
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
    incomeElement.style.left = (cursorX) + 'px';
    incomeElement.style.top = (cursorY - 24) + 'px';

    document.body.appendChild(incomeElement);
    
    setTimeout(function() {
        incomeElement.style.top = (cursorY - 128) + 'px';
    }, 10);

    setTimeout(function() {
        incomeElement.style.opacity = "0";
    }, 250);

    setTimeout(function() {
        incomeElement.remove();
    }, 1000);
}

function vibrate(duratin) {
    
    if ("vibrate" in navigator) {
      navigator.vibrate(100);
    } else {
      
    }
  }

function refreshUI() {
    refreshEnergyUI();
    refreshBalanceUI();
    refreshUpgradeUI();
    refreshSpecialUI();
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

let petTimer;
let petIsActive = false;

function displayPet() {
    petIsActive = true;

    const pet = getRandomPet();
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

    petTimer = setTimeout(() => {
        respawnPet(petElement);
    }, 2500);
}

function handlePetClick() {
    if (petIsActive && energy > 0) {
        petIsActive = false;

        const petCoins = parseInt(petElement.dataset.coins);
        const min = petCoins * 0.5;
        const max = petCoins * 1.5;
        const randomBonus = Math.floor(Math.random() * (max - min + 1)) + min;
        earnCoins(randomBonus);

        clearTimeout(petTimer);
        respawnPet();

        vibrate();
    }
}

function respawnPet() {
    petElement.style.animation = 'scaleDown 0.2s forwards';
    let spawnDelay = Math.floor(15000 + Math.random() * 5000);

    setTimeout(() => {
        petElement.style.animation = '';
        petElement.style.display = 'none';
        setTimeout(displayPet, spawnDelay);
    }, 200);
}

document.getElementById('pet').addEventListener('click', handlePetClick);

setTimeout(displayPet, 5000);



function getUpgradeLevel(characteristic) {
    const upgrade = upgrades.find(upgrade => upgrade.name === characteristic);
    return upgrade ? upgrade.level : null;
}

function getUpgradeCost(level) {
    level -=1;
    const levelCosts = [1000, 2000, 5000, 10000];
    if (level >= levelCosts.length) {
        return null;
    }
    return levelCosts[level];
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

function refreshSpecialUI() {
    specials.forEach(special => {
        const specialElement = document.getElementById(`special-${special.name}`);
        const countElement = specialElement.querySelector(`#shop-special-count`);
        const costElement = specialElement.querySelector(`#shop-special-cost`);

        if (special.available > 0) {
            countElement.querySelector(`span`).textContent = special.available;
            countElement.style.display = "block";
            costElement.style.display = "none";
        } else {
            costElement.querySelector(`span`).textContent = specialPrice;
            countElement.style.display = "none";
            costElement.style.display = "block";
        }
    });
}

let specialIsActivated = false;

function activateSpecial(specialName) {
    const special = specials.find(special => special.name === specialName);
    
    if (activeSpecial.name == 'none' && displaySpecial == 'none') {
        if ( special.available > 0 || coins >= specialPrice) {
            if (special.available > 0) {
                special.available--;
            } else {
                pay(specialPrice);
            }

            closeModal("shopModal");

            specialIsActivated = false;

            clearTimeout(specialDislpayTimer);
            specialDislpayTimer = setTimeout(() => {
                removeSpecial();
            }, 3000);
            
            const specialElement = document.getElementById('special');
            const imgElement = specialElement.querySelector('img');
            imgElement.src = special.icon;

            specialElement.style.display = 'block';
            specialElement.dataset.special = special.name;

            const center = { x: 50, y: 50 };
            const radius = 45;

            const angle = Math.random() * 2 * Math.PI;
            
            const randomX = center.x + radius * Math.cos(angle);
            const randomY = center.y + radius * Math.sin(angle);

            specialElement.style.left = randomX + '%';
            specialElement.style.top = randomY + '%';
            
            refreshSpecialUI();
        }
    }
}

function applySpecialEffects() {
    const specialName = specialElement.dataset.special;

    specialIsActivated = true;
    removeSpecial();

    if (specialName == "energy")
    {
        editEnergy(energyMax - energy);
    } else if (specialName === "rocket") {
        activateSpecialMode(specialName, 10, 10, 'images/specials/rocket.png', 'rgba(255, 150, 26, 1)');
    } else if (specialName === "bomb") {
        activateSpecialMode(specialName, 50, 10, 'images/specials/bomb.png', 'rgba(39, 151, 255, 1)');
    } else if (specialName === "shuriken") {
        activateSpecialMode(specialName, 100, 10, 'images/specials/shuriken.png', 'rgba(167, 25, 255, 1)');
    }

    vibrate();
}

function activateSpecialMode(specialName, factor, duration, imageUrl, backgroundColor) {
    
    activeSpecial.name = specialName;
    activeSpecial.factor = factor;

    showSpecialBackground(imageUrl, backgroundColor);

    clearTimeout(specialModeTimer);
    specialModeTimer = setTimeout(() => {
        activeSpecial.name = 'none';
        hideSpecialBackground();
    }, duration * 1000);
}

function removeSpecial() {
    displaySpecial = 'none';

    specialElement.style.animation = 'scaleDown 0.2s forwards';
    setTimeout(() => {
        specialElement.style.animation = '';
        specialElement.style.display = 'none';
    }, 200);
}

function showSpecialBackground(imageUrl, backgroundColor) {
    const backgroundInner = background.querySelector('div');
    background.style.display = 'block';
    if (backgroundColor) {
        backgroundInner.style.background = 'radial-gradient(circle at center bottom, ' + backgroundColor + ', rgb(12, 12, 12) 75%)';
    }
    if (imageUrl) {
        const spans = backgroundInner.querySelectorAll('span');
        spans.forEach(span => {
            span.style.backgroundImage = `url('${imageUrl}')`;
        });
    }
    setTimeout(() => {
        background.style.opacity = 1;
    }, 1);
}


function hideSpecialBackground() {
    background.style.opacity = 0;

    background.addEventListener('transitionend', function() {
        background.style.display = 'none';
    }, { once: true });
}

document.getElementById('special').addEventListener('click', applySpecialEffects);