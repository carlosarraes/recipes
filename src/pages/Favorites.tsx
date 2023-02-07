import { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import Card from '../components/Card'
import FilterOpts from '../components/FilterOpts'
import Header from '../components/Header'
import NavOpts from '../components/NavOpts'
import copy from 'clipboard-copy'
import type { Recipe } from './RecipeDetails'

const Favorites = () => {
  const [done, setDone] = useState([])
  const [filter, setFilter] = useState([])

  useEffect(() => {
    const doneRecipes = JSON.parse(localStorage.getItem('favoriteRecipes') ?? '[]')
    setFilter(doneRecipes)
    setDone(doneRecipes)
  }, [])

  const handleFilter = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { value } = e.currentTarget
    if (value === 'all') {
      setFilter(done)
    } else {
      const newFilter = done.filter((recipe: Recipe) => recipe.type === value)
      setFilter(newFilter)
    }
  }

  const handleCopy = (str: string) => {
    copy(str).catch((err) => console.log(err))
    toast.success('Link copiado com sucesso!')
  }

  const handleUnfavorite = (id: string) => {
    const newFavorites = done.filter((recipe: Recipe) => {
      const { idMeal, idDrink } = recipe
      const lookId = idMeal ?? idDrink
      return lookId !== id
    })
    setDone(newFavorites)
    setFilter(newFavorites)
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites))
  }

  return (
    <section>
      <Header type="noSearch" />
      <NavOpts />
      <FilterOpts handleFilter={handleFilter} />
      <div className="flex flex-col items-center gap-2 m-4">
        {filter.map((recipe: Recipe, index: number) => (
          <Card
            key={index}
            recipe={recipe}
            handleCopy={handleCopy}
            handleUnfavorite={handleUnfavorite}
            favorite
          />
        ))}
        {filter.length === 0 && <p className="text-xl mt-4">Não há receitas favoritas</p>}
      </div>
      <ToastContainer />
    </section>
  )
}

export default Favorites
