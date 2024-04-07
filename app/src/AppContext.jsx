import React, { createContext, useContext, useEffect, useState } from 'react';
import { getUserInfo, getUserUpgrades, getUserSpecials, getUserRefferedCount, sendSpecial, sendCoinsAndEnergy, sendUpgrade, sendJoinTeam, sendLeaveTeam } from './http';

export const AppContext = createContext({
    user: null,
    coins: 10,
    energy: 1000,
    clickCost: 1,
    energyLimit: 1000,
    energyRechargeDelay: 1,
    refferedCount: 0,
    upgrades: null,
    specials: null,
    specialMode: null
});

export const useAppData = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [coins, setCoins] = useState(10);
    const [refferedCount, setRefferedCount] = useState(0);
    const [energy, setEnergy] = useState(1000);
    const [clickCost, setClickCost] = useState(1);
    const [energyLimit, setEnergyLimit] = useState(1000);
    const [energyRechargeDelay, setEnergyRechargeDelay] = useState(1);
    const [upgrades, setUpgrades] = useState([
        { id: "multitap", level: 1 },
        { id: "rechargingSpeed", level: 1 },
        { id: "energyLimit", level: 1 }
    ]);
    const [specials, setSpecials] = useState([
        { id: "rocket", count: 1 },
        { id: "bomb", count: 1 },
        { id: "shuriken", count: 1 },
        { id: "full_energy", count: 1 }
    ]);
    const [specialMode, setSpecialMode] = useState(null);
    const [specialModeTimer, setSpecialModeTimer] = useState(null);

    useEffect(() => {
        if (!loading) {
            sendCoinsAndEnergy(coins, energy);
        }
    }, [coins]);

    const activateSpecial = async (specialId) => {
        const specialIndex = specials.findIndex(special => special.id === specialId);
        
        if (specials[specialIndex].count > 0) {
            const updatedSpecials = [...specials];
            updatedSpecials[specialIndex].count -= 1;
            setSpecials(updatedSpecials);

            console.log("abs");
            await sendSpecial(specialId);
    
            if (specialId === 'rocket') {
                enableSpecialMode(specialId, 10, 10);
            } else if (specialId === 'bomb') {
                enableSpecialMode(specialId, 50, 10);
            } else if (specialId === 'shuriken') {
                enableSpecialMode(specialId, 150, 10);
            } else if (specialId === 'full_energy') {
                setEnergy(energyLimit);
            }
        } else {
            console.log(`Special item ${specialId} is not available or out of stock.`);
        }
    }
    

    const enableSpecialMode = (mode, bonus, duration) => {
        disableSpecialMode();
        setSpecialMode({ mode, bonus });
        
        const timer = setTimeout(() => {
            disableSpecialMode();
        }, duration * 1000);
        setSpecialModeTimer(timer);
    };    

    const disableSpecialMode = () => {
        setSpecialMode(null);
        clearTimeout(specialModeTimer);
    };

    const handleEditCoins = (value) => {
        setCoins(prev => prev + value);
    }

    const handleEditEnergy = (value) => {
        setEnergy(prev => prev + value);
    }

    const updateUpgradesValue = () => {
        upgrades.forEach(upgrade => {
            if (upgrade.id === 'energyLimit') {
                setEnergyLimit(500 + (upgrade.level * 500));
            }
            if (upgrade.id === 'multitap') {
                setClickCost(upgrade.level);
            }
            if (upgrade.id === 'rechargingSpeed') {
                setEnergyRechargeDelay(1000 / upgrade.level);
            }
        });
        
    }

    useEffect(() => {
        const energyGenerationInterval = setInterval(() => {
            //console.log('energy', energy, energyLimit);
            if (energy < energyLimit) {
                handleEditEnergy(1);
                //console.log('+1');
            }
        }, energyRechargeDelay);
        return () => clearInterval(energyGenerationInterval);
    }, [energyRechargeDelay, loading]);

    const getUserInfoData = async () => {
        const data = await getUserInfo();
        if (data) {
            setUser(data);
            setCoins(data.coins_count);
            setEnergy(data.energy_count);
        } else {
            setUser({team: null});
            setCoins(100000);
            setEnergy(1000);
        }
    }

    const getUserUpgradesData = async () => {
        const data = await getUserUpgrades();
        if (data) {
            const formattedUpgrades = [];

            const { multitap_level, recharging_speed_level, energy_limit_level } = data;

            formattedUpgrades.push({ id: "multitap", level: multitap_level });
            formattedUpgrades.push({ id: "rechargingSpeed", level: recharging_speed_level });
            formattedUpgrades.push({ id: "energyLimit", level: energy_limit_level });

            setUpgrades(formattedUpgrades);
        }

    }

    const purchaiseUpgrade = (upgradeId) => {
        const upgradeIndex = upgrades.findIndex(upgrade => upgrade.id === upgradeId);
    
        const newUpgrades = [...upgrades];
        newUpgrades[upgradeIndex].level += 1;
        setUpgrades(newUpgrades);
            
        sendUpgrade(upgradeId);
    }

    const getUserRefferedCountData = async () => {
        const data = await getUserRefferedCount();
        if (data) {
            setRefferedCount(data.friends_reffered_count);
        }
    }

    const getUserSpecialsData = async () => {
        const data = await getUserSpecials();
        if (data) {
            const formattedSpecials = Object.entries(data).map(([key, value]) => ({
                id: key,
                count: value
            }));

            setSpecials(formattedSpecials);
        }
    }

    const joinTeam = (teamId) => {
        setUser(prevUser => ({
            ...prevUser,
            team: teamId
        }));

        sendJoinTeam(teamId);
    }
    
    const exitTeam = () => {
        setUser(prevUser => ({
            ...prevUser,
            team: null
        }));

        sendLeaveTeam();
    }

    useEffect(() => {
        const fetchData = async () => {
            await getUserInfoData();
            await getUserUpgradesData();
            await getUserSpecialsData();
            await getUserRefferedCountData();

            setLoading(false);
        };

        fetchData();
    }, []);

    useEffect(() => {
        updateUpgradesValue();
        
    }, [upgrades])

    return (
        <AppContext.Provider value={{ 
            user,
            coins,
            handleEditCoins,
            energy,
            handleEditEnergy,
            energyLimit,
            energyRechargeDelay,
            clickCost,
            upgrades,
            specials,
            purchaiseUpgrade,
            specialMode,
            activateSpecial,
            joinTeam,
            exitTeam
            }}>
            {children}
        </AppContext.Provider>
    );
};
