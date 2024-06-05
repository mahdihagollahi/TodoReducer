import React,{useState,useEffect} from 'react'
import Navbar from './Compponent/Navbar'
import Todos from './Compponent/Todos'
import Footer from './Compponent/Footer';

function App() {

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

   
  const handleToggle = (e) => {
    if(e.target.checked) {
    setTheme ("dark");
    }
    else
    setTheme("light")
      }
    
    
    
    
      useEffect ( ()=> {
        localStorage. setItem("theme", theme);
        const localTheme = localStorage.getItem ("theme" );
        document.querySelector("html").setAttribute("data-theme", localTheme);
      }, [theme]);
  return (
    <div>
      <Navbar handleToggle={handleToggle}/>
      <Todos/>
      <Footer/>
    </div>
  )
}

export default App

