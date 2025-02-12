import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Country from './components/Country';
import Meal from './components/Meal';
import Unknown from './components/Unknown';


function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path=':country' element={<Country/>}/>
      <Route path=':country/:mealId' element={<Meal/>}/>
      <Route path='*' element={<Unknown/>}/>
    </Routes>
    </>
  )
}

export default App;
