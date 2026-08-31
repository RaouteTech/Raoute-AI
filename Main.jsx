import React, { useContext } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../../context/Context'

const Main = () => {

    const {onSent, recentPrompt, showResult, loading, resultData, setInput, input} = useContext(Context);

    return(
        <div className='main'>
            <div className="nav">
                <p>Raoute</p>
            </div>
            <div className="main-container">
                    {!showResult
                    ?<>
                        <div className="greet">
                            <p><span>Nice To Meet You</span></p>
                            <p>Let's explore Raoute with me!</p>
                        </div>
                        <div className="cards">
                            <div className="card">
                                <p>Suggest destinations for your journey</p>
                                <img src={assets.location_icon} alt="" />
                            </div>
                            <div className="card">
                                <p>Find out your travel plan with Raoute</p>
                                <img src={assets.bulb_icon} alt="" />
                            </div>
                            <div className="card">
                                <p>Discuss for your optimism intinerary</p>
                                <img src={assets.discuss_icon} alt="" />
                            </div>
                            <div className="card">
                                <p>Create your intinerary with Raoute</p>
                                <img src={assets.create_icon} alt="" />
                            </div>
                        </div>
                    </>
                    :<div className='result'>
                        <div className="result-title">
                            <img src={assets.user_icon} alt="" />
                            <p>{recentPrompt}</p>
                        </div>
                        <div className="result-data">
                            <img src={assets.logo_icon} alt="" />
                            {loading
                            ?<div className='loader'>
                                <hr />
                                <hr />
                                <hr />
                            </div>
                            :<p dangerouslySetInnerHTML={{__html:resultData}}></p>
                            }
                        </div>
                    </div>
                    }
                <div className="main-bottom">
                    <div className="search-box">
                        <input onChange={(e)=>setInput(e.target.value)} value={input} type="text" placeholder='Enter your question here'/>
                        <div>
                            <img 
                           onClick={()=>onSent()} src={assets.send_icon} alt="" />
                        </div>
                    </div>
                    <p className="bottom-info">
                        *Raoute may display inaccurate information.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Main