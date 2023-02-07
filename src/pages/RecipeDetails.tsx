import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { fetchById } from '../utils/fetchService'
import Carousel from './Carousel'
import { AiOutlineHeart, AiFillHeart, AiFillCopy } from 'react-icons/ai'
import copy from 'clipboard-copy'
import { toast, ToastContainer } from 'react-toastify'
import { BiArrowBack } from 'react-icons/bi'

export interface Recipe {
  idMeal?: string
  strMeal?: string
  strMealThumb?: string
  idDrink?: string
  strDrink?: string
  strDrinkThumb?: string
  strAlcoholic?: string
  strCategory?: string
  strArea?: string
  strInstructions?: string
  strTags?: string
  ingredients?: string[]
  measure?: string[]
  tags?: string[]
  type?: string
  doneDate?: string
}

const RecipeDetails = () => {
  const [showRecipe, setShowRecipe] = useState<Recipe>()
  const [started, setStarted] = useState(false)
  const [favorite, setFavorite] = useState(false)
  const location = useLocation()

  const [, type, id] = location.pathname.split('/')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchRecipe = async () => {
      const { [type]: data } = await fetchById(type, id)
      const [recipe] = data
      const ingredients = Object.entries(recipe)
        .filter(([key, value]) => {
          if (key.includes('strIngredient') && value !== null) {
            return value
          }
          return false
        })
        .map(([, value]) => value)
      const measure = Object.entries(recipe)
        .filter(([key, value]) => {
          if (key.includes('strMeasure') && value !== null) {
            return value
          }
          return false
        })
        .map(([, value]) => value)
      const tags = recipe.strTags?.split(',') ?? []

      const newRecipe = {
        ...recipe,
        ingredients,
        measure,
        tags,
        type,
      }
      setShowRecipe(newRecipe)
    }

    fetchRecipe().catch((err) => console.log(err))
  }, [type, id])

  useEffect(() => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes') ?? '[]')
    const found = inProgressRecipes.find((recipe: Recipe) => {
      const idLookup = recipe.idMeal ?? recipe.idDrink
      return idLookup === id
    })
    if (found != null) setStarted(true)
  }, [started])

  useEffect(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes') ?? '[]')
    const found = favoriteRecipes.find((recipe: Recipe) => {
      const idLookup = recipe.idMeal ?? recipe.idDrink
      return idLookup === id
    })
    if (found != null) setFavorite(true)
  }, [favorite])

  const handleStart = () => {
    const { idMeal, idDrink } = showRecipe ?? {}
    const id = idMeal ?? idDrink
    if (localStorage.getItem('inProgressRecipes') === null) {
      localStorage.setItem('inProgressRecipes', JSON.stringify([showRecipe]))
    } else {
      const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes') ?? '[]')
      const newInProgressRecipes = [...inProgressRecipes, showRecipe]
      localStorage.setItem('inProgressRecipes', JSON.stringify(newInProgressRecipes))
    }
    navigate(`/${type}/${id as string}/in-progress`)
  }

  const handleContinue = () => {
    const { idMeal, idDrink } = showRecipe ?? {}
    const id = idMeal ?? idDrink
    navigate(`/${type}/${id as string}/in-progress`)
  }

  const handleFavorite = () => {
    if (localStorage.getItem('favoriteRecipes') === null) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([showRecipe]))
    } else {
      const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes') ?? '[]')
      const newFavoriteRecipes = [...favoriteRecipes, showRecipe]
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes))
    }
    setFavorite(true)
  }

  const handleUnfavorite = () => {
    const { idMeal, idDrink } = showRecipe ?? {}
    const id = idMeal ?? idDrink
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes') ?? '[]')
    const newFavoriteRecipes = favoriteRecipes.filter((recipe: Recipe) => {
      const idLookup = recipe.idMeal ?? recipe.idDrink
      return idLookup !== id
    })
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes))
    setFavorite(false)
  }

  const handleCopy = () => {
    copy(`http://localhost:3000/${type}/${id}`).catch((err) => console.log(err))
    toast.success('Link copiado com sucesso!')
  }

  const handleGoBack = () => {
    navigate(`/${type}`)
  }

  return (
    <section className="flex flex-col">
      <ToastContainer />
      <div className="relative">
        <img
          src={showRecipe?.strMealThumb ?? showRecipe?.strDrinkThumb}
          alt={showRecipe?.strMeal ?? showRecipe?.strDrink}
          className="h-48 w-full object-cover"
        />
        <div className="absolute bottom-0 w-full h-11 bg-white opacity-40"></div>
        <h1 className="text-2xl pl-2 text-slate-800 font-bold opacity-100 absolute bottom-4">
          {showRecipe?.strMeal ?? showRecipe?.strDrink}
        </h1>
        <p className="text-sm text-slate-800 absolute bottom-0 pl-2">
          {showRecipe?.strCategory} - {showRecipe?.strArea ?? showRecipe?.strAlcoholic}
        </p>
        <div className="absolute top-0 right-0 flex">
          <AiFillCopy
            className="text-red-500 text-4xl m-1 cursor-pointer drop-shadow-lg"
            onClick={handleCopy}
          />
          {favorite ? (
            <AiFillHeart
              className="text-red-500 text-4xl m-1 cursor-pointer drop-shadow-lg"
              onClick={handleUnfavorite}
            />
          ) : (
            <AiOutlineHeart
              className="text-red-500 text-4xl m-1 cursor-pointer drop-shadow-lg"
              onClick={handleFavorite}
            />
          )}
        </div>
        <div className="absolute top-0 left-0">
          <BiArrowBack
            className="text-red-500 text-4xl m-1 cursor-pointer drop-shadow-lg"
            onClick={handleGoBack}
          />
        </div>
      </div>
      <div className="flex flex-col p-2 border border-slate-700 rounded-md m-2">
        <h2 className="text-xl font-bold text-slate-800">Ingredients</h2>
        <ul className="flex flex-col ">
          {showRecipe?.ingredients?.map((ingredient, index) => {
            return showRecipe?.measure !== undefined ? (
              <li key={index} className="flex flex-row">
                <p className="text-slate-800 text-sm">{ingredient}</p>
                <p className="text-slate-800 text-sm ml-2">{showRecipe.measure[index]}</p>
              </li>
            ) : (
              <li key={index} className="flex flex-row">
                <p className="text-slate-800 text-sm">{ingredient}</p>
              </li>
            )
          })}
        </ul>
        <div className="divider w-3/4 self-center"></div>
        <Carousel ingredients={showRecipe?.ingredients} />
      </div>
      <div className="flex flex-col p-2">
        <h2 className="text-xl font-bold text-slate-800">Instructions</h2>
        <p className="text-slate-800 text-sm border border-slate-700 rounded-md p-2 mt-1">
          {showRecipe?.strInstructions}
        </p>
      </div>
      {(showRecipe?.tags?.length as number) >= 1 && (
        <div className="flex flex-col p-2">
          <h2 className="text-xl font-bold text-slate-800">Tags</h2>
          <p className="text-slate-800 text-sm border border-slate-700 rounded-md p-2 mt-1">
            {showRecipe?.tags?.map((tag) => (
              <span key={tag} className="mr-2 badge badge-secondary badge-outline">
                {tag}
              </span>
            ))}
          </p>
        </div>
      )}
      <button className="btn btn-secondary m-2" onClick={started ? handleContinue : handleStart}>
        {started ? 'Continuar receita' : 'Iniciar Receita'}
      </button>
    </section>
  )
}

export default RecipeDetails
