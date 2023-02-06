import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import UserContext from '../context/UserContext'
import type { RecipeContextType } from '../context/UserProvider'
import { fetchData } from '../utils/fetchService'

interface RecipesProps {
  type: string
}

const Recipes = ({ type }: RecipesProps) => {
  const { recipeContext, setRecipeContext, setLocalRecipe } = useContext(UserContext)

  useEffect(() => {
    async function getRecipes() {
      const { [type]: data } = await fetchData(type)
      setLocalRecipe(data)
      setRecipeContext(data)
    }

    getRecipes().catch((err) => console.log(err))
  }, [type, setRecipeContext])

  const slicedRecipe = recipeContext.slice(0, 12) ?? []

  return (
    <section className="flex flex-wrap justify-evenly items-center w-full mt-2 mb-14 gap-2">
      {slicedRecipe.map((recipe: RecipeContextType) => (
        <Link
          key={recipe.idMeal ?? recipe.idDrink}
          to={`/${type}/${(recipe.idMeal as string) ?? (recipe.idDrink as string)}`}
        >
          <div className="w-40 border border-secondary rounded-lg shadow-lg">
            <img
              src={recipe.strMealThumb ?? recipe.strDrinkThumb}
              alt={recipe.strMeal ?? recipe.strDrink}
              className="rounded-t-lg"
            />
            <h3 className="text-center font-medium p-1">{recipe.strMeal ?? recipe.strDrink}</h3>
          </div>
        </Link>
      ))}
    </section>
  )
}

export default Recipes
