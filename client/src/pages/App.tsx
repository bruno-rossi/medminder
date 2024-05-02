import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import './App.css';
import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { UserData, NavBarProps } from '../types/types';

function App(): JSX.Element {

  const [ user, setUser ] = useState<UserData | null>(null);

  useEffect(() => {
    fetch("http://127.0.0.1:5555/check_session", {
      credentials: 'include',
    })
    .then(response => {
      if (response.ok) {
        return response.json()
      }
    })
    .then(data => setUser(data))
    .catch(error => console.error('Error:', error));
  }, []);
  
  return (
    <div className="app">
      <NavBar user={user} setUser={setUser} />
      <Outlet context={{user: user, setUser: setUser}}/>
      <Footer />
    </div>
  );
}

export default App;
