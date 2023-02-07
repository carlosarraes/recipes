import { useEffect, useState } from 'react'
import { AiFillCopy, AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { BiArrowBack } from 'react-icons/bi'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import type { Recipe } from './RecipeDetails'
import copy from 'clipboard-copy'

const InProgress = () => {
  const [showRecipe, setShowRecipe] = useState<Recipe>()
  const [controls, setControls] = useState<boolean[]>([])
  const [favorite, setFavorite] = useState(false)
  const [finished, setFinished] = useState(true)

  const { pathname } = useLocation()
  const id = pathname.split('/')[2]
  const type = pathname.split('/')[1]
  const navigate = useNavigate()

  useEffect(() => {
    const recipes = JSON.parse(localStorage.getItem('inProgressRecipes') ?? '{}')
    const found = recipes?.find((recipe: Recipe) => {
      const idLookup = recipe.idMeal ?? recipe.idDrink
      return idLookup === id
    })
    if (found != null) setShowRecipe(found)
  }, [])

  useEffect(() => {
    const verifyFinished = () => {
      const finished = controls?.every((control) => control)
      if (finished != null && controls?.length === showRecipe?.ingredients?.length) {
        setFinished(!finished)
      }
    }
    verifyFinished()
  }, [controls, finished])

  useEffect(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes') ?? '[]')
    const found = favoriteRecipes.find((recipe: Recipe) => {
      const idLookup = recipe.idMeal ?? recipe.idDrink
      return idLookup === id
    })
    if (found != null) setFavorite(true)
  }, [favorite])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { checked } = e.target
    const newControls = [...(controls ?? [])]
    newControls[index] = checked
    const localControl = JSON.parse(localStorage.getItem('localCheckbox') ?? '{}')
    const newLocal = {
      [id]: newControls,
    }
    const merged = { ...localControl, ...newLocal }
    localStorage.setItem('localCheckbox', JSON.stringify(merged))
    setControls(newControls)
  }

  const handleFinish = () => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes') ?? '[]')
    const newInProgress = inProgressRecipes.filter((recipe: Recipe) => {
      const idLookup = recipe.idMeal ?? recipe.idDrink
      return idLookup !== id
    })
    const date = new Date()
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    localStorage.setItem('inProgressRecipes', JSON.stringify(newInProgress))
    const finishedRecipes = JSON.parse(localStorage.getItem('finishedRecipes') ?? '[]')
    const newShowRecipe = { ...showRecipe, doneDate: `${day}/${month}/${year}` }
    const newFinished = [...(finishedRecipes ?? []), newShowRecipe]
    localStorage.setItem('finishedRecipes', JSON.stringify(newFinished))
    navigate('/preparados')
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
    navigate(`/${type}/${id}`)
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
        <h2 className="text-xl font-bold text-slate-800 mb-2">Ingredients</h2>
        <ul className="flex flex-col gap-1 mb-1">
          {showRecipe?.ingredients?.map((ingredient, index) => {
            return showRecipe?.measure !== undefined ? (
              <li key={index} className="flex flex-row">
                <input
                  type="checkbox"
                  className="mr-2 checkbox checkbox-accent checkbox-sm"
                  value={String(controls[index])}
                  onChange={(e) => handleChange(e, index)}
                />
                <p
                  className={`text-slate-800 text-sm ${
                    controls[index] ? 'line-through italic' : ''
                  }`}
                >
                  {ingredient}
                </p>
                <p
                  className={`text-slate-800 text-sm ml-2 ${
                    controls[index] ? 'line-through italic' : ''
                  }`}
                >
                  {showRecipe.measure[index]}
                </p>
              </li>
            ) : (
              <li key={index} className="flex flex-row">
                <input
                  type="checkbox"
                  className="mr-2 checkbox checkbox-accent checkbox-sm"
                  value={String(controls[index])}
                  onChange={(e) => handleChange(e, index)}
                />
                <p className="text-slate-800 text-sm">{ingredient}</p>
              </li>
            )
          })}
        </ul>
      </div>
      <div className="flex flex-col p-2">
        <h2 className="text-xl font-bold text-slate-800">Instructions</h2>
        <p className="text-slate-800 text-sm border border-slate-700 rounded-md p-2 mt-1">
          {showRecipe?.strInstructions}
        </p>
      </div>
      <button className="btn btn-accent m-2" disabled={finished} onClick={handleFinish}>
        Finalizar Receita
      </button>
    </section>
  )
}

export default InProgress
