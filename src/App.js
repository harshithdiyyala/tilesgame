
import './App.css';
import WelcomeScreen from './components/welcome';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import GameScreen from './components/GameScreen';

function App() {
  return (
    <BrowserRouter>
        
          <Routes>
          
            <Route exact path = '/game' element={<GameScreen/>}/> 
            
          
          <Route exact path = '/' element={<WelcomeScreen/>}/> 
            
        </Routes>
        
      
    </BrowserRouter>
  );
}

export default App;
