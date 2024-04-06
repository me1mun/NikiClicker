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
    return data;
  } catch (error) {
    //console.error('Error fetching:', error);
    return null;
  }
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
  const response = await fetchData(`get_teams?search_query=${encodeURIComponent(searchQuery)}`);
  return response;
};

export const getTeam = async (team_id) => {
  const response = await fetchData(`get_teams?team_id=${team_id}`);
  return response;
};

export const getTopTeams = async () => {
  const response = await fetchData(`get_top_teams`);
  return response;
};