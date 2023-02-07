import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import UserContext from '../context/UserContext'
import logo from '../images/recipeHub.png'
import Nav from './Nav'
import SearchBar from './SearchBar'

interface HeaderProps {
  type: string
}

const Header = ({ type }: HeaderProps) => {
  const [search, setSearch] = useState(false)
  const {
    user: { name },
  } = useContext(UserContext)

  return (
    <header className="bg-red-100">
      <div className="flex justify-between items-center p-2">
        <img src={logo} alt="Recipe Hub" className="w-36" />
        <Link to="/perfil">
          <p className="font-bold text-md text-red-500">{name}</p>
        </Link>
      </div>
      {!(type === 'noSearch') && (
        <>
          <Nav search={search} setSearch={setSearch} />
          {search && <SearchBar type={type} />}
        </>
      )}
    </header>
  )
}

export default Header
