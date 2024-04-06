import React, { useState } from 'react';
import { useAppData } from '../AppContext';
import { useNavigate } from 'react-router-dom';

import coinImg from '../images/icons/coin.png';
import specialRocketImg from '../images/specials/rocket.png';
import specialShurikenImg from '../images/specials/shuriken.png';
import specialBombImg from '../images/specials/bomb.png';
import specialEnergyImg from '../images/specials/energy.png';

import upgradeMultitapImg from '../images/icons/finger.png';
import upgradeRechargingImg from '../images/icons/energy.png';
import upgradeEnergylimitImg from '../images/icons/batery.png';

export const Shop = () => {
    const { coins, upgrades, specials, handleEditCoins, purchaiseUpgrade, activateSpecial } = useAppData();
    const [selectedUpgrade, setSelectedUpgrade] = useState(null);
    const navigate = useNavigate();

    const handleUpgradeClick = (upgrade) => {
        setSelectedUpgrade(upgrade);
    };

    const handleCloseModal = () => {
        setSelectedUpgrade(null);
    };

    const handleActivateSpecial = (specialId) => {
        activateSpecial(specialId);
        navigate('/');
    };

    const handleUpgrade = () => {
        if (selectedUpgrade) {
            const upgradeCost = getUpgradeCost(selectedUpgrade.level);
            if (coins >= upgradeCost) {
                handleEditCoins(-upgradeCost);
                purchaiseUpgrade(selectedUpgrade.id);
            }
        }
    };

    const upgradeCostList = [1000, 2000, 5000, 10000, 25000, 50000];
    const getUpgradeCost = (upgradeLevel) => {
        upgradeLevel -= 1;
        if (upgradeLevel >= 0 && upgradeLevel < upgradeCostList.length) {
            return upgradeCostList[upgradeLevel];
        } else {
            return null;
        }
    };

    return (
        <div className="tab">
            <div className="tab-container">
                <div className="tab-content">
                    <div className="tab-header">
                        <div className="tab-header-background shop-header-background"></div>
                        <div className="shop-balance">
                            <img src={coinImg} className="stats-coin" alt="Coin-icon"/>
                            <div id="balance" className="coin-count">{coins}</div>
                        </div>
                        <div className="tab-title">BOOSTS</div>
                    </div>
                    <div className="tab-section-title">Specials</div>
                    <div className="shop-spcial-container">
                    {specials.map((special) => (
                        <div key={special.id} className="tab-block" onClick={() => handleActivateSpecial(special.id)}>
                            <img className="shop-special-image" src={getSpecialImage(special.id)} alt={special.id}/>
                            <p className="shop-special-name">{special.id}</p>
                            <div id={`shop-special-count-${special.id}`} className="shop-special-count"><span>{special.count}</span> Available</div>
                        </div>
                    ))}
                    </div>
                    <p className="tab-section-title">Upgrades</p>
                    <div className="tab-block">
                    {upgrades.map((upgrade) => (
                        <div key={upgrade.id} className="tab-subblock" onClick={() => handleUpgradeClick(upgrade)}>
                            <div className="shop-upgrade-img-case">
                                <img src={getUpgradeInfo(upgrade.id).icon} className="shop-upgrade-icon"/>
                            </div>
                            <div>
                                <div className="shop-upgrade-name">{getUpgradeInfo(upgrade.id).title}</div>
                                <div className="shop-upgrade-description">
                                    <div>Level: <span>{upgrade.level}</span></div>
                                    {getUpgradeCost(upgrade.level) !== null ? (
                                        <div>Cost: <span>{getUpgradeCost(upgrade.level)}</span> <img src={coinImg} className="coin-icon" alt="Coin-icon"/></div>
                                    ) : (
                                        <div>Max Level Reached</div>
                                    )}
                                </div>
                            </div>
                            {getUpgradeCost(upgrade.level) !== null && (
                                <button className="tab-button-arrow">›</button>
                            )}
                        </div>
                    ))}
                    </div>
                </div>
            </div>

            {selectedUpgrade && (
                <div className="modal">
                    <div className="modal-container">
                        <span className="close" onClick={handleCloseModal}>&times;</span>
                        <div className="modal-content">
                            <div className="modal-image">
                                <img src={getUpgradeInfo(selectedUpgrade.id).icon} className="upgrade-upgrade-icon"/>
                            </div>
                            <div className="modal-info">
                                <h2 className='modal-title'>{getUpgradeInfo(selectedUpgrade.id).title}</h2>
                                <p>{getUpgradeInfo(selectedUpgrade.id).description}</p>
                                <p>{getUpgradeInfo(selectedUpgrade.id).effect}</p>
                            </div>
                            {getUpgradeCost(selectedUpgrade.level) !== null && (
                                <button className='button-long button-purple modal-button' onClick={handleUpgrade}>{getUpgradeCost(selectedUpgrade.level)}<img src={coinImg} className="coin-icon" alt="Coin-icon"/></button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const getSpecialImage = (name) => {
    switch (name) {
        case "rocket":
            return specialRocketImg;
        case "bomb":
            return specialBombImg;
        case "shuriken":
            return specialShurikenImg;
        case "energy":
            return specialEnergyImg;
        default:
            return null;
    }
};

const getUpgradeInfo = (name) => {
    switch (name) {
        case "multitap":
            return {name: "Multitap", icon: upgradeMultitapImg, title: "Multitap - Fastest hand in the Wild West",
            description: "Increase amount of NIKI coins you can earn per one tap", effect: "+1/per tap each level"};
        case "rechargingSpeed":
            return {name: "Recharging Speed", icon: upgradeRechargingImg, title: "Recharging speed - Your girl dreams about it",
            description: "Recharging speed Increase the energy recharging speed", effect: "+1/sec for each level"};
        case "energyLimit":
            return {name: "Energy Limit", icon: upgradeEnergylimitImg, title: "Energy limit - Not coffee",
            description: " Increase your energy limit, more mine per session", effect: "+500🔋 points for each level"};
        default:
            return null;
    }
};
