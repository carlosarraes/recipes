import {
  GiChickenOven,
  GiCupcake,
  GiShrimp,
  GiMeat,
  GiMeal,
  GiCoffeeCup,
  GiGlassShot,
  GiBeerStein,
  GiMartini,
} from 'react-icons/gi'
import { BiDrink } from 'react-icons/bi'
import { fetchByCategory } from '../utils/fetchService'
import { useContext } from 'react'
import UserContext from '../context/UserContext'

interface CategoryButtonsProps {
  type: string
}

const CategoryButtons = ({ type }: CategoryButtonsProps) => {
  const { setRecipeContext, resetRecipe } = useContext(UserContext)

  const meals = {
    Beef: <GiMeat className="text-2xl text-primary" />,
    Chicken: <GiChickenOven className="text-2xl text-primary" />,
    Seafood: <GiShrimp className="text-2xl text-primary" />,
    Dessert: <GiCupcake className="text-2xl text-primary" />,
  }

  const drinks = {
    Beer: <GiBeerStein className="text-2xl text-primary" />,
    Shot: <GiGlassShot className="text-2xl text-primary" />,
    Cocoa: <GiCoffeeCup className="text-2xl text-primary" />,
    Cocktail: <GiMartini className="text-2xl text-primary" />,
  }

  const handleTooltip = (key: string) => {
    if (key === 'Beer') return 'Cerveja'
    if (key === 'Shot') return 'Shot'
    if (key === 'Cocoa') return 'Café'
    if (key === 'Cocktail') return 'Coquetel'
    if (key === 'Beef') return 'Carne'
    if (key === 'Chicken') return 'Frango'
    if (key === 'Seafood') return 'Frutos do mar'
    if (key === 'Dessert') return 'Sobremesa'
  }

  const typeKind = type === 'meals' ? meals : drinks

  const handleClick = async (key: string): Promise<void> => {
    const { [type]: data } = await fetchByCategory(type, key)
    setRecipeContext(data)
  }

  return (
    <section className="flex justify-around my-4">
      <div className="tooltip hover:cursor-pointer" data-tip="Todos">
        <button
          className="p-1 ring-1 ring-secondary ring-offset-1 ring-offset-secondary rounded-full hover:scale-110"
          onClick={resetRecipe}
        >
          {type === 'meals' ? (
            <GiMeal className="text-2xl text-primary" />
          ) : (
            <BiDrink className="text-2xl text-primary" />
          )}
        </button>
      </div>
      {Object.values(typeKind).map((kind, index) => (
        <div
          key={index}
          className="tooltip hover:cursor-pointer"
          data-tip={handleTooltip(Object.keys(typeKind)[index])}
        >
          <button
            className="p-1 ring-1 ring-secondary ring-offset-1 ring-offset-secondary rounded-full hover:scale-110"
            onClick={async () => await handleClick(Object.keys(typeKind)[index])}
          >
            {kind}
          </button>
        </div>
      ))}
    </section>
  )
}

export default CategoryButtons
