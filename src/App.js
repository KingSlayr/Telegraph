import { useEffect, useState } from 'react';
import './App.css';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Register from './components/Register';
import Users from './components/Users';

function App() {
  const [route, setroute] = useState('/register')
  const [currentUser, setcurrentUser] = useState(null)

  useEffect(() => {
    const u = window.localStorage.getItem('telegraphuser')
    setcurrentUser(JSON.parse(u));
    if(u){
      setroute('/')
    }else{
      setroute('/register')
    }
  }, [])

  const logout = () =>{
    window.localStorage.removeItem("telegraphuser");
    setroute('/register')
  }

  const switchComponents = (param) => {
    switch (param) {
      case '/':
        return(<div><Users setroute={setroute}/></div>)
      case '/login':
        return(<div><Login setroute={setroute}/></div>)
      case '/register':
        return(<div><Register setroute={setroute}/></div>)
    }
  }

  return (
    <div className="App">
      <Navbar route={route} logout={logout}/>
      {
        switchComponents(route)
      }
    </div>
  );
}

export default App;
