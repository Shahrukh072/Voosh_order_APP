import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Signin from './Signin';
import Signup from './Signup';


function App() {
  return (
    <div className="App">
      { 
      }
      
        <BrowserRouter>
            <Routes>
                <Route path = "/" element={<Signup/>} />
                <Route path = "/Signin" element={<Signin/>} />
            </Routes>
        </BrowserRouter>

      
    </div>
  );
}

export default App;
