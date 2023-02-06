import { Link } from 'react-router-dom'

interface NavProps {
  search: boolean
  setSearch: (search: boolean) => void
}

const Nav = ({ search, setSearch }: NavProps) => {
  const handleSearch = () => {
    setSearch(!search)
  }

  return (
    <nav className="shadow-2xl">
      <ul className="flex justify-evenly items-center text-sm text-center">
        <li
          onClick={handleSearch}
          className="text-xs bg-accent py-2 px-1 w-1/3 font-bold opacity-90 duration-200 hover:opacity-100 hover:text-red-700 hover:cursor-pointer"
        >
          <button>Pesquisar</button>
        </li>
        <Link
          to="/favoritos"
          className="text-xs bg-accent py-2 px-1 w-1/3 font-bold opacity-90 duration-200 hover:opacity-100 hover:text-red-700 hover:cursor-pointer"
        >
          <li>
            <button>Favoritos</button>
          </li>
        </Link>
        <Link
          to="/preparados"
          className="text-xs bg-accent py-2 px-1 w-1/3 font-bold opacity-90 duration-200 hover:opacity-100 hover:text-red-700 hover:cursor-pointer"
        >
          <li>
            <button>Preparados</button>
          </li>
        </Link>
      </ul>
    </nav>
  )
}

export default Nav
