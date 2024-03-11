import React,{useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';

const tiles = []

for(let i = 0;i < 32;i++){
    tiles[i] = Math.floor(Math.random() * 12);
}


class TileItem extends React.Component {
     
    state = {clicked : false}

    handleItemChange = () => {
        const { handleScore, item } = this.props;
        const {clicked} = this.state;
        
        if(!clicked) {
        this.setState({ clicked: true }, () => {
         
            handleScore(item);
        });
    }
        
    }
    
       
    render() {
    const {item} = this.props;
    const {clicked} = this.state;
    return(<button onClick = {this.handleItemChange} disabled = {clicked}>
        {clicked && item}
    </button>)
    }
}

const GameScreen = () => {
    const [score,setScore] = useState(0);
    const  [secs,setSecs] = useState(0);
    const [min,setMin] = useState(0);
    const [count,setCount] = useState(0);

    const [prev,setPrev] = useState('');
    const handleScore = (index) => {

        if (prev === '') setPrev(tiles[index])
        else{
            setScore(prev === tiles[index] ? score+1 : score-1);
            setPrev('')
        }
        setCount(count+1);
            
    }
    const navigate = useNavigate();
    const handleChange = () => {
        localStorage.removeItem("playerName");
        navigate("/")
    }
    
    useEffect(() => {
        let seconds = 0;
        let uniqueId = setInterval(() => {
            seconds++;
            
            if (seconds ===  59){
                seconds = 0;
                setSecs(0);
                setMin(min => min+1);
            }
            else{
                setSecs(seconds);
            }
        }, 1000);
    
        if (count === 32) clearInterval(uniqueId);
    
        return () => clearInterval(uniqueId); // Clean up the interval on component unmount
    }, [count === 32]);
    

    

   
  return (
    <div className='main-container'>
        <div className='main-content-container'>
        <h1>{count === 32 ? 'React Tiles': 'Mahajong Game'}</h1>
        <div className='score-time-container'>
            <p>Score: {score}</p>
            <p>Time: {min}:{secs} secs</p>
        </div>
        <div className='game-container'>
            <h1 className='name'>Welcome {localStorage.getItem("playerName")}</h1>

            {count === 32 ?  
            <div>
                <h1>Game Finished</h1>
                <h1>Score: {score}</h1>
                <h1>Time Taken: {secs} secs</h1>
                <button onClick = {handleChange}  className='btn'>Play a New Game</button>
            </div>
            : 
            <ul className='tiles-container'>
                { tiles.map( (item,index) =>  
                <li key = {index}> 
                <TileItem item = {tiles[item]} handleScore={handleScore}/>
                </li>)
                }
            </ul> }
        </div>
       </div>  
    </div>
 )
}

export default GameScreen
