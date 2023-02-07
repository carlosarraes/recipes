import { useEffect, useState } from 'react'
import Card from '../components/Card'
import FilterOpts from '../components/FilterOpts'
import Header from '../components/Header'
import NavOpts from '../components/NavOpts'
import copy from 'clipboard-copy'
import type { Recipe } from './RecipeDetails'
import { toast, ToastContainer } from 'react-toastify'

const Done = () => {
  const [done, setDone] = useState([])
  const [filter, setFilter] = useState([])

  useEffect(() => {
    const doneRecipes = JSON.parse(localStorage.getItem('finishedRecipes') ?? '[]')
    setFilter(doneRecipes)
    setDone(doneRecipes)
  }, [])

  const handleCopy = (str: string) => {
    copy(str).catch((err) => console.log(err))
    toast.success('Link copiado com sucesso!')
  }

  const handleFilter = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { value } = e.currentTarget
    if (value === 'all') {
      setFilter(done)
    } else {
      const newFilter = done.filter((recipe: Recipe) => recipe.type === value)
      setFilter(newFilter)
    }
  }

  console.log(done)
  return (
    <section>
      <Header type="noSearch" />
      <NavOpts />
      <FilterOpts handleFilter={handleFilter} />
      <div className="flex flex-col items-center gap-2 m-4">
        {filter.map((recipe: Recipe, index: number) => (
          <Card key={index} recipe={recipe} handleCopy={handleCopy} />
        ))}
      </div>
      <ToastContainer />
    </section>
  )
}

export default Done
