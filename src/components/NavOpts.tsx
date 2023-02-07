import { Link } from 'react-router-dom'

const NavOpts = () => {
  return (
    <nav className="shadow-2xl">
      <ul className="flex justify-evenly items-center text-sm text-center">
        <Link
          to="/meals"
          className="text-xs bg-accent py-2 px-1 w-1/4 font-bold opacity-90 duration-200 hover:opacity-100 hover:text-red-700 hover:cursor-pointer"
        >
          <li>
            <button>Comidas</button>
          </li>
        </Link>
        <Link
          to="/drinks"
          className="text-xs bg-accent py-2 px-1 w-1/4 font-bold opacity-90 duration-200 hover:opacity-100 hover:text-red-700 hover:cursor-pointer"
        >
          <li>
            <button>Bebidas</button>
          </li>
        </Link>
        <Link
          to="/favoritos"
          className="text-xs bg-accent py-2 px-1 w-1/4 font-bold opacity-90 duration-200 hover:opacity-100 hover:text-red-700 hover:cursor-pointer"
        >
          <li>
            <button>Favoritos</button>
          </li>
        </Link>
        <Link
          to="/preparados"
          className="text-xs bg-accent py-2 px-1 w-1/4 font-bold opacity-90 duration-200 hover:opacity-100 hover:text-red-700 hover:cursor-pointer"
        >
          <li>
            <button>Preparados</button>
          </li>
        </Link>
      </ul>
    </nav>
  )
}

export default NavOpts
