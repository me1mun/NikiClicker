import React, {useEffect} from 'react';
import {Link} from 'react-router-dom'

import nikiImg from '../images/icons/niki.png'
import coinImg from '../images/icons/coin.png'

import gameBoomImg from '../images/games/nikiboom.png'
import gameSoonImg from '../images/games/soon.png'

export const Games = () => {
    return (
        <div id="nikiboomModal" className="tab">
            <div className="tab-container">
                <div className="tab-content">
                    <div className="tab-header">
                        <div className="tab-header-background"></div>
                        <img src={nikiImg} className="tab-img" draggable="false"/>
                        <h2 className="tab-title">Play our games 😉</h2>
                    </div>
                    <div className="nikiboom-gamelist">
                        <div className="tab-block">
                            <div className="nikiboom-game-info">
                                <img src={gameBoomImg}/>
                                <p>NIKI BOOM<br/>Merge PEPE, BOBO, SHIBA - earn coins<img src={coinImg} className="coin-icon" alt="Coin-icon"/></p>
                            </div>
                            <button className="button-long button-purple">Play</button>
                        </div>

                        <div className="tab-block">
                            <div className="nikiboom-game-info">
                                <img src={gameSoonImg}/>
                                <p>MEME Guys (Coming Soon)<br/>Multiplayer online competitive game</p>
                            </div>
                            <button className="button-long button-orange">Coming soon</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}