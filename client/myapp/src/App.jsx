import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './Login' // Import the Login component
import Signup from './Signup' // Import the Signup component
import NewsCards from './NewsCards';


function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/login' element = {<Login/>}></Route>
      <Route path='/register' element={<Signup/>} ></Route>
      <Route path='/newscards' element={<NewsCards/>}></Route>
    </Routes>
    </BrowserRouter>

    </>
  
  )
}

export default App;
