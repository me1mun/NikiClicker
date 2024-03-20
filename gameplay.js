let coins = 0;
let energyMax = 100;
let energy = energyMax;

function initializeProfile(playerName, gender, leagueNumber, coinCount, energyCount) {
    const playerNameElement = document.querySelector('.player-name');
    playerNameElement.textContent = playerName;

    coins = coinCount;
    energy = energyCount;

    setGender(gender);
    setLeague(leagueNumber);
    updateUI();
}

function setGender(gender) {
    const profileButton = document.querySelector('.menu-button');
    const buttonIcon = profileButton.querySelector('.button-icon');

    if (gender === 'male') {
        buttonIcon.textContent = '👱‍♂️';
    } else if (gender === 'female') {
        buttonIcon.textContent = '👩';
    }
    else {
        buttonIcon.textContent = '👤';
    }
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

initializeProfile('Michael Jackson', 'male', 1, 15, 100);

function clickCoin() {
    let coinsEarned = Math.floor(Math.random() * 5) + 1;

    if (energy >= coinsEarned && coinsEarned > 0) {
        coins += coinsEarned;
        energy -= coinsEarned;
    } else if (energy < coinsEarned) {
        coins += energy;
        energy = 0;
    }
    
    updateUI();
}


function updateUI() {
    document.querySelector('.coin-count').textContent = coins;
    document.querySelector('.energy').style.width = energy + '%';
    document.querySelector('.energy-counter').textContent = energy + '/' + energyMax;
}

function openProfile() {
    document.getElementById("profileModal").style.display = "block";
}

function openReferralProgram() {
    document.getElementById("referralModal").style.display = "block";
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

setInterval(function() {
    if (energy < 100) {
        energy += 1;
        updateUI();
    }
}, 1000);
