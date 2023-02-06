import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import UserContext from '../context/UserContext'
import { fetchWithSmartSearch } from '../utils/fetchService'

interface SearchBarProps {
  type: string
}

interface IDs {
  idMeal?: string
  idDrink?: string
}

const SearchBar = ({ type }: SearchBarProps) => {
  const [query, setQuery] = useState('')

  const { setRecipeContext } = useContext(UserContext)
  const navigate = useNavigate()

  const handleQuery = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const { [type]: data, error } = await fetchWithSmartSearch(type, query)
    if (error === 'Nope') {
      toast.error('Não foi possível encontrar o que você procura :(')
    }
    if (data.length === 1) {
      const { idMeal, idDrink }: IDs = data[0]
      navigate(`/${type}/${idMeal || idDrink}`)
    }
    setRecipeContext(data)
  }

  return (
    <form className="flex flex-col w-full justify-center items-center p-1">
      <div className="form-control">
        <div className="input-group">
          <input
            type="text"
            placeholder={`${type === 'meals' ? 'Comida' : 'Bebida'} ou Ingrediente`}
            value={query}
            name="query"
            onChange={(e) => setQuery(e.target.value)}
            className="input input-bordered input-sm focus:outline-none"
          />
          <button className="btn btn-square btn-sm" onClick={handleQuery}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </div>
    </form>
  )
}

export default SearchBar
