import React, {useEffect} from 'react';
import {Link} from 'react-router-dom'
import { useAppData } from '../AppContext';

import giftImg from '../images/icons/gift.png'
import coinImg from '../images/icons/coin.png'
import premiumImg from '../images/icons/premium.png'

export const Frens = () => {
    const { refferedCount } = useAppData();

    return (
        <div id="frensModal" className="tab">
        <div className="tab-container">
            <div className="tab-content">
                <div className="tab-header">
                    <div className="tab-header-background frens-header-background"></div>
                    <img src={giftImg} className="tab-img" draggable="false"/>
                    <h2 className="tab-title">FRIENDS</h2>
                </div>
                <div className="tab-block">
                    <div className="tab-subblock">
                        <div className="frens-coins-earned">+1000<img src={coinImg} className="coin-icon" alt="Coin-icon"/></div>
                        <div>{refferedCount} Friends added</div>
                        <button className="tab-button-arrow">›</button>
                    </div>
                </div>
                <div className="tab-block">
                    <div className="tab-subblock">
                        <img src={coinImg} className="frens-mainblock-img"/>
                        <div>
                            <div className="tab-block-title">Add a friend:</div>
                            <div>+2,000<img src={coinImg} className="coin-icon" alt="Coin-icon"/></div>
                        </div>
                    </div>
                    <div className="tab-subblock">
                        <img src={premiumImg} className="frens-mainblock-img"/>
                        <div>
                            <div className="tab-block-title">Add a friend with Telegram premium:</div>
                            <div>+25,000<img src={coinImg} className="coin-icon" alt="Coin-icon"/> *each friend</div>
                        </div>
                    </div>
                    <button className="button-long button-purplr">More info</button>
                </div>
                <div className="tab-block">
                    <div className="tab-subblock">
                        <div>
                            <div className="tab-block-title">👥 Add 10 friends</div>
                            <div>+50,000<img src={coinImg} className="coin-icon" alt="Coin-icon"/></div>
                        </div>
                    </div>
                </div>
                <div className="tab-block">
                    <div className="tab-subblock">
                        <div>
                            <div className="tab-block-title">👥 Add 25 friends</div>
                            <div>+200,000<img src={coinImg} className="coin-icon" alt="Coin-icon"/></div>
                        </div>
                    </div>
                </div>
                <div className="tab-block">
                    <div className="tab-subblock">
                        <div>
                            <div className="tab-block-title">👥 Add 50 friends</div>
                            <div>+500,000<img src={coinImg} className="coin-icon" alt="Coin-icon"/> + 🥈SILVER LEAGUE</div>
                        </div>
                    </div>
                </div>
                <div className="tab-block">
                    <div className="tab-subblock">
                        <div>
                            <div className="tab-block-title">👥 Add 100 friends</div>
                            <div>+1,000,000<img src={coinImg} className="coin-icon" alt="Coin-icon"/> + 🥇GOLD LEAGUE</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}