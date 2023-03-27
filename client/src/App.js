import { Routes, Route, useLocation } from 'react-router-dom'
import './App.css';

// Importamos nuestros componentes desde componentes
import {About, Detail, Form, Home, Landing, Nav, Footer } from './components'


function App() {

  const location = useLocation();

  return (
    <div className="App">

      {
        location.pathname === '/' ? <Landing/> : <Nav />
      }

      <Routes>
        {/* <Route exact path='/' component={Landing} /> */}

        {/* <Route path='/' element={<Landing/>} /> */}
        <Route path='/home' element={<Home/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/detail/:id' element={<Detail/>} />
        <Route path='/create' element={<Form/>} />
      </Routes>

      <Footer/>

      {/*Otras formas de enrutar mis componentes
      component={Landing}
      render={()=><Home/>}*/}

    </div>
  );
}

export default App;
