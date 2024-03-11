import React,{useState} from 'react'
import {  useNavigate } from 'react-router-dom';

const WelcomeScreen = () => {

  const [playerName,setPlayerName] = useState(''); 
  const [showErrMsg,setShowErrMsg] = useState("false"); 
  const navigate = useNavigate();
  
  const handleNameSubmit = (event) => {
        event.preventDefault();

        if (playerName === '') {
            setShowErrMsg("true");
        }
        else{
          localStorage.setItem("playerName",playerName)
          navigate("/game")
        }
  }

  return (
    <div className='main-container'>
        <div className='main-content-container'>
            <h1> React Tiles</h1>
            <div className='name-container'>
                <h1>Enter your Name</h1>
                <input type = "text" value ={playerName}
                onChange = {(e) => setPlayerName(e.target.value)}/>
                <p className='error-msg'>{showErrMsg === "true" && playerName === '' ? '*Please Enter Your Name': ''}</p>
                <button type = "submit" onClick = {handleNameSubmit} className='btn'>Play</button>
            </div>
        </div>
      
    </div>
  )
}

export default WelcomeScreen
