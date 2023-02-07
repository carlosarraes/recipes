import { GiHotMeal, GiBeerBottle } from 'react-icons/gi'
import { IoFastFoodOutline } from 'react-icons/io5'

interface FilterOptsProps {
  handleFilter: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const FilterOpts = ({ handleFilter }: FilterOptsProps) => {
  return (
    <section className="m-4 flex justify-around">
      <div className="tooltip" data-tip="Todos">
        <button
          value="all"
          onClick={handleFilter}
          className="p-1 ring-1 ring-secondary ring-offset-1 ring-offset-secondary rounded-full hover:scale-110"
        >
          <IoFastFoodOutline className="text-2xl" />
        </button>
      </div>
      <div className="tooltip" data-tip="Comidas">
        <button
          onClick={handleFilter}
          value="meals"
          className="p-1 ring-1 ring-secondary ring-offset-1 ring-offset-secondary rounded-full hover:scale-110"
        >
          <GiHotMeal className="text-2xl" />
        </button>
      </div>
      <div className="tooltip" data-tip="Bebidas">
        <button
          value="drinks"
          onClick={handleFilter}
          className="p-1 ring-1 ring-secondary ring-offset-1 ring-offset-secondary rounded-full hover:scale-110"
        >
          <GiBeerBottle className="text-2xl" />
        </button>
      </div>
    </section>
  )
}

export default FilterOpts
