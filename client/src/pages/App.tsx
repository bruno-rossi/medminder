import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import Home from './Home';
import './App.css';
import { Outlet } from 'react-router-dom';

function App() {
  
  return (
    <div className="app">
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
