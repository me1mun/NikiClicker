let userId = "1";

function sendBalance(balance, energy) {
    fetch("https://cee0-84-54-153-174.ngrok-free.app/update_coins_and_energy", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            user_id: userId,
            coins_count: balance,
            energy_count: energy
        })
    })
    .then(response => console.log(response));
}

function getUser() {
    fetch("https://cee0-84-54-153-174.ngrok-free.app/initialize_user?user_id=" + userId)
        .then(response => response.json())
        .then(data => console.log(data));
}