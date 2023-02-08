import { AiFillCopy, AiFillHeart } from 'react-icons/ai'
import type { Recipe } from '../pages/RecipeDetails'

interface CardProps {
  recipe: Recipe
  handleCopy: (str: string) => void
  needDate?: boolean
  favorite?: boolean
  handleUnfavorite?: (id: string) => void
}

const Card = ({ recipe, handleCopy, handleUnfavorite, favorite }: CardProps) => {
  const handleLift = () => {
    const { idMeal, idDrink, type } = recipe
    const id = idMeal ?? idDrink
    handleCopy(`https://hubrecipe.netlify.app/${type as string}/${id as string}`)
  }

  return (
    <div className="flex w-full shadow-xl border border-slate-500 rounded-md text-center">
      <img
        src={recipe.strMealThumb ?? recipe.strDrinkThumb}
        alt={recipe.strMeal ?? recipe.strDrink}
        className="w-36 h-36 rounded-l-md"
      />
      <div className="flex flex-col justify-evenly text-left pl-2 w-full">
        <div>
          <h2 className="text-xl font-bold">{recipe.strMeal ?? recipe.strDrink}</h2>
          <p className="text-sm">
            {recipe.strCategory ?? recipe.strAlcoholic}{' '}
            {recipe.strArea != null && `- ${recipe.strArea}`}
          </p>
          <p>{recipe.doneDate}</p>
        </div>
        <div className="flex self-end">
          {favorite != null && handleUnfavorite != null && (
            <AiFillHeart
              id={recipe.idMeal ?? recipe.idDrink}
              className="text-red-500 text-3xl m-1 cursor-pointer drop-shadow-lg"
              onClick={(e) => handleUnfavorite(e.currentTarget.id)}
            />
          )}
          <AiFillCopy
            className="text-red-500 text-3xl m-1 cursor-pointer drop-shadow-lg"
            onClick={handleLift}
          />
        </div>
      </div>
    </div>
  )
}

export default Card
