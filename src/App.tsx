import { Route, Routes } from 'react-router-dom'
import Done from './pages/Done'
import Favorites from './pages/Favorites'
import Home from './pages/Home'
import InProgress from './pages/InProgress'
import Login from './pages/Login'
import Profile from './pages/Profile'
import RecipeDetails from './pages/RecipeDetails'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/meals" element={<Home type="meals" />} />
      <Route path="/drinks" element={<Home type="drinks" />} />
      <Route path="/meals/:id" element={<RecipeDetails />} />
      <Route path="/drinks/:id" element={<RecipeDetails />} />
      <Route path="/perfil" element={<Profile />} />
      <Route path="/favoritos" element={<Favorites />} />
      <Route path="/preparados" element={<Done />} />
      <Route path="/meals/:id/in-progress" element={<InProgress />} />
      <Route path="/drinks/:id/in-progress" element={<InProgress />} />
    </Routes>
  )
}

export default App
