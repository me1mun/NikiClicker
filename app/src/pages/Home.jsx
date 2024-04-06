import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAppData } from '../AppContext';

import gameplayCoinImg from '../images/coin.png';
import giftImg from '../images/icons/gift.png';
import coinImg from '../images/icons/coin.png';
import nikiImg from '../images/icons/niki.png';
import rocketImg from '../images/icons/rocket.png';
import bateryImg from '../images/icons/batery.png';
import teamImg from '../images/teams/teamlogo_1.jpg';

import specialRocketImg from '../images/specials/rocket.png'
import specialBombImg from '../images/specials/bomb.png'
import specialShurikenImg from '../images/specials/shuriken.png'

export const Home = () => {
    const coinImage = useRef(null);
    const energyBar = useRef(null);
    const specialBackground = useRef(null);
    const { coins, handleEditCoins, energy, energyLimit, handleEditEnergy, clickCost, user, specialMode } = useAppData();

    const handleMouseDown = (event) => {
        const containerRect = coinImage.current.getBoundingClientRect();
        const centerX = (event.clientX - containerRect.left) / containerRect.width * 2 - 1;
        const centerY = (event.clientY - containerRect.top) / containerRect.height * 2 - 1;

        const rotateX = -centerY * 15;
        const rotateY = centerX * 15;

        coinImage.current.style.transform = "perspective(1000px) " +
            "rotateX(" + rotateX + "deg) " +
            "rotateY(" + rotateY + "deg) " +
            "scale3d(0.98, 0.98, 0.98)";

        earnCoins(clickCost, event);
    }

    function earnCoins(income, event) {
        if (specialMode) {
            let randomFactorOptions = [0.5, 1, 1.5];
            let randomFactor = randomFactorOptions[Math.floor(Math.random() * randomFactorOptions.length)];
            income += specialMode.bonus * randomFactor;
        } else {
            if (income > energy) {
                income = energy;
            }
        }

        if (income > 0) {
            handleEditCoins(income);
            showIncome(income, event);

            if (!specialMode) {
                handleEditEnergy(-income);
            }
        }
    }

    const onTransitionEnd = () => {
        coinImage.current.style.transition = "";
        coinImage.current.style.transform = "";
    }

    function showIncome(income, event) {
        var incomeElement = document.createElement('div');
        var cursorX = event.clientX;
        var cursorY = event.clientY;
        incomeElement.innerText = '+' + income;

        incomeElement.classList.add('income');
        incomeElement.style.left = (cursorX) + 'px';
        incomeElement.style.top = (cursorY - 24) + 'px';

        document.body.appendChild(incomeElement);

        setTimeout(function () {
            incomeElement.style.top = (cursorY - 128) + 'px';
        }, 10);

        setTimeout(function () {
            incomeElement.style.opacity = "0";
        }, 250);

        setTimeout(function () {
            incomeElement.remove();
        }, 1000);
    }

    useEffect(() => {
        if (energyBar.current) {
            energyBar.current.style.width = (energy / energyLimit * 100) + '%';
        }
    }, [energy, energyLimit]);

    const specialData = {
        "rocket": {
            spanImage: `url(${specialRocketImg})`,
            background: 'rgba(255, 150, 26, 1)'
        },
        "bomb": {
            spanImage: `url(${specialBombImg})`,
            background: 'rgba(39, 151, 255, 1)'
        },
        "shuriken": {
            spanImage: `url(${specialShurikenImg})`,
            background: 'rgba(167, 25, 255, 1)'
        }
        };
      

        useEffect(() => {
            if (specialMode) {
                specialBackground.current.style.display = 'block';
                specialBackground.current.style.opacity = 1;
        
                const specialInfo = specialData[specialMode.mode];
                const specialBackgroundElement = specialBackground.current.querySelector('.special-background');
                const specialSpans = specialBackground.current.querySelectorAll('.special-background span');
                
                specialBackgroundElement.style.background = 'radial-gradient(circle at center bottom, ' + specialInfo.background + ', rgb(12, 12, 12) 75%)';
        
                specialSpans.forEach((span, index) => {
                    span.style.backgroundImage = specialInfo.spanImage;
                });
            } else {
                specialBackground.current.style.opacity = 0;
                specialBackground.current.addEventListener('transitionend', function() {
                    specialBackground.current.style.display = 'none';
                }, { once: true });
            }
        }, [specialMode]);
        
    

    return (
        <div>
            <div className="effect-background" ref={specialBackground}>
                <div className="special-background">
                    <span style={{'--i': 16}}></span>
                    <span style={{'--i': 11}}></span>
                    <span style={{'--i': 19}}></span>
                    <span style={{'--i': 13}}></span>
                    <span style={{'--i': 15}}></span>
                    <span style={{'--i': 20}}></span>
                    <span style={{'--i': 12}}></span>
                    <span style={{'--i': 17}}></span>
                </div>
            </div>

            <div className="container">
                <div className="header">
                    {user && user.team ? (
                        <Link to={`/team/${user.team}`} div className="player-team-info">
                            <img src={teamImg} alt="Photo" className="player-team-logo" draggable="false" />
                            <div>
                                <div className="player-name">{user.team}</div>
                                <div className="player-team-stats">
                                    <div className="player-team-coins"><img src={coinImg} className="coin-icon" alt="Coin icon" />5,500</div>
                                    <div className="player-team-league">🥇 Gold League</div>
                                </div>
                            </div>
                        </Link>
                    ) : (
                        <Link to="/team-explorer" className="player-team-info player-team-join">
                            <span>Join team  ›</span>
                        </Link>
                    )}
                </div>

                <div className="main-content">
                    <div className="stats">
                        <img src={coinImg} className="stats-coin" alt="Coin-icon" />
                        <div id="balance" className="coin-count">{coins}</div>
                    </div>
                    <div id="playZone" className="play-zone">
                    <div className='gameplay-coin-glow'></div>
                        <div className="gameplay-coin">
                            <img src={gameplayCoinImg} alt="Coin" draggable="false" ref={coinImage}
                                onMouseDown={(event) => handleMouseDown(event)} onTransitionEnd={onTransitionEnd} />
                        </div>
                        <div id="pet" className="pet">
                            <img src="images/pets/pet_dog.png" />
                        </div>

                        <div id="special" className="special">
                            <img src="images/pets/pet_dog.png" />
                        </div>
                    </div>
                    <div className="energy-wrapper">
                        <img className="energy-icon" src={bateryImg} />
                        <div className="energy-counter">{energy}</div>
                        <div className="energy-bar">
                            <div className="energy" ref={energyBar}></div>
                        </div>
                    </div>
                </div>

                <footer className="footer">
                    <div className="menu">
                        <Link to="/tasks" className="menu-button">
                            <img src={coinImg} alt="Coin" />
                            <span className="button-text">TASKS</span>
                        </Link>
                        <div className="divider"></div>
                        <Link to="/frens" className="menu-button">
                            <img src={giftImg} alt="Gift" />
                            <span className="button-text">FRIENDS</span>
                        </Link>
                        <div className="divider"></div>
                        <Link to="/games" className="menu-button">
                            <img src={nikiImg} alt="Niki" />
                            <span className="button-text">PLAY</span>
                        </Link>
                        <div className="divider"></div>
                        <Link to="/shop" className="menu-button">
                            <img src={rocketImg} alt="Rocket" />
                            <span className="button-text">BOOSTS</span>
                        </Link>
                    </div>
                </footer>
            </div>
        </div>
    )
}
