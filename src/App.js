import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Player from './pages/Player';

import './css/main.css';
import './css/fonts.css';

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route exact path='/' element={ <Player src="./about_video.mp4" muted={false} autoPlay={false} /> } />
            <Route path='*' element={ <Navigate to='/' /> }/>
        </Routes>
    </BrowserRouter>
);
}

export default App;
