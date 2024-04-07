const URL = process.env.REACT_APP_API_URL;
const USER_ID = "1"


const fetchData = async (request) => {
  try {
    const response = await fetch(`${URL + request}`, {
      method: "get",
      headers: new Headers({
        "ngrok-skip-browser-warning": "69420",
      }),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log('data:', request, data);
    return data;
  } catch (error) {
    //console.error('Error fetching:', error);
    return null;
  }
};

const sendData = async (request, data) => {
  try {
    const formattedRequest = request.endsWith('/') ? request : `${request}/`;
    const formData = new URLSearchParams(data).toString();
    const response = await fetch(`${URL}${formattedRequest}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData,
    });
    const result = await response.json();
    console.log('post:', request, result);
    return result;
  } catch (error) {
    console.error('Error fetching:', error);
    return null;
  }
};

export const sendCoinsAndEnergy = async (coins, energy) => {
  const response = await sendData("update_coins_and_energy", {user_id: USER_ID, coins_count: coins, energy_count: energy});
  return response;
};

export const sendUpgrade = async (upgradeId) => {
  const response = await sendData("buy_upgrade", {user_id: USER_ID, upgrade: upgradeId});
  return response;
};

export const sendSpecial = async (specialId) => {
  const response = await sendData("use_boost", {user_id: USER_ID, boost: specialId});
  return response;
};

export const sendJoinTeam = async (teamId) => {
  const response = await sendData("join_team", {user_id: USER_ID, team_id: teamId});
  return response;
};

export const sendLeaveTeam = async (teamId) => {
  const response = await sendData("leave_team", {user_id: USER_ID, team_id: teamId});
  return response;
};

export const getUserInfo = async () => {
  const response = await fetchData("initialize_user" + "?user_id=" + USER_ID)  
  return response;
};

export const getUserUpgrades = async () => {
  const response = await fetchData("get_user_upgrades" + "?user_id=" + USER_ID)
  return response;
}

export const getUserSpecials = async () => {
  const response = await fetchData("get_user_boosts" + "?user_id=" + USER_ID)
  return response;
}

export const getUserTasks = async () => {
  const response = await fetchData("get_user_tasks" + "?user_id=" + USER_ID)
  return response;
}

export const getUserRefferedCount = async () => {
  const response = await fetchData("friends_reffered_count" + "?user_id=" + USER_ID)
  return response;
}

export const getUserFriends = async () => {
  const response = await fetchData("friends_list" + "?user_id=" + USER_ID)
  return response;
}

export const getSearchTeams = async (searchQuery) => {
  const response = await fetchData(`get_teams?search_query=${searchQuery}`);
  return response;
};

export const getTeam = async (team_id) => {
  const response = await fetchData(`get_team?team_id=${team_id}`);
  return response;
};

export const getTopTeams = async () => {
  const response = await fetchData(`get_top5_teams`);
  return response;
};