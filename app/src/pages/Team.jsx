import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getTeam } from '../http';
import { useAppData } from '../AppContext';

import coinImg from '../images/icons/coin.png';
import defaultLogoImg from '../images/teams/teamlogo_1.jpg';

export const Team = () => {
    const { teamId } = useParams();
    const [ team, setTeam] = useState({
        id: teamId,
        name: "Test Team",
        logo: '',
        league: "Test League",
        coins: 1000,
        participants: 100
    });
    const { user, joinTeam, exitTeam } = useAppData();

    useEffect(() => {
        const fetchTeam = async () => {
            const fetchedTeam = await getTeam(teamId);
            if (fetchedTeam) {
                setTeam(fetchedTeam);
            }
        };
        fetchTeam();
    }, []);

    const handleExitTeam = () => {
        exitTeam();
    };

    const handleJoinTeam = () => {
        joinTeam(teamId);
    };

    return (
        <div className='tab team-tab'>
            <div className="tab-container">
                <div className="tab-content">
                    {team ? (
                        <div className="team-info">
                            <img className='team-logo' src={team.logo ? team.logo : defaultLogoImg} alt={team.name} />
                            <h1 className='team-title'>{team.name}</h1>
                            <div className="team-details">
                                <div className='team-details-case'>
                                    <h2><img src={coinImg} className="coin-icon" alt="Coin-icon"/> {team.coins}</h2>
                                    <p>Total score</p>
                                </div>
                                <div className='team-details-case'>
                                    <h2>{team.participants}</h2>
                                    <p>Participants</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p>Loading...</p>
                    )}
                    <div className='team-buttons'>
                        {user.team === teamId ? (
                            <button className='button-long button-orange' onClick={handleExitTeam}>Exit team</button>
                        ) : (
                            <button className='button-long button-purple' onClick={handleJoinTeam}>{user.team ? ('Change team') : ('Join team')}</button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
