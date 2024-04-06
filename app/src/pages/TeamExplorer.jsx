import React, { useState, useEffect } from 'react';
import gratsImg from '../images/icons/grats.png';
import teamDefaultImg from '../images/teams/teamlogo_1.jpg';
import { Link } from 'react-router-dom';
import { getTopTeams, getSearchTeams } from '../http';

export const TeamExplorer = () => {
    const [teamList, setTeamList] = useState([
        { id: 1, name: 'Team A', logo: null, league: 'Diamond', coins: '572392', participants: '2505' },
        { id: 2, name: 'Team B', logo: null, league: 'Gold', coins: '43255', participants: '1380' },
        { id: 3, name: 'Team C', logo: null, league: 'Silver', coins: '3210', participants: '247' }
    ]);
    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        const fetchTeams = async () => {
            const teamsData = await getTopTeams();
            if (teamsData) {
                setTeamList(teamsData);
            }
        };

        fetchTeams();
    }, []);

    const handleSearchInputChange = async (event) => {
        const searchTerm = event.target.value;
        setSearchInput(searchTerm);

        if (searchTerm === '') {
            const teamsData = await getTopTeams();
            if (teamsData) {
                setTeamList(teamsData);
            }
        } else {
            const searchResults = await getSearchTeams(searchTerm);
            if (searchResults) {
                setTeamList(searchResults);
            }
        }
    };

    return (
        <div className="tab">
            <div className="tab-container">
                <div className="tab-content">
                    <div className="tab-header">
                        <div className="tab-header-background teamexplorer-header-background"></div>
                        <img src={gratsImg} className="tab-img" draggable="false" />
                        <h2 className="tab-title">How TEAM works?</h2>
                        <div className="tab-subtitle">Choose team and win tournaments</div>
                    </div>
                    <button className="button-long button-orange">Create your Team</button>
                    <div className="search-input-container">
                        <input
                            type="text"
                            className="button-long button-purple teamexplorer-search-input"
                            placeholder="Find team..."
                            value={searchInput}
                            onChange={handleSearchInputChange}
                        />
                    </div>
                    <div className="tab-block teamexplorer-list">
                        {teamList.map((team) => (
                            <div className="teamexplorer-item" key={team.id}>
                                <img src={team.logo || teamDefaultImg} className="teamexplorer-logo" />
                                <div className="teamexplorer-details">
                                    <div className="teamexplorer-name">{team.name}</div>
                                    <div className="teamexplorer-league">{team.league}</div>
                                </div>
                                <Link to={`/team/${team.id}`} className="tab-button-arrow">›</Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
