import { useState } from 'react'
import UserContext from './UserContext'

interface UserProviderProps {
  children: React.ReactNode
}

export interface UserType {
  email: string
  name: string
}

export interface RecipeContextType {
  idMeal?: string
  idDrink?: string
  strMeal?: string
  strMealThumb?: string
  strDrink?: string
  strDrinkThumb?: string
}

const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<UserType>({
    email: '',
    name: '',
  })
  const [recipeContext, setRecipeContext] = useState<RecipeContextType[]>([])
  const [localRecipe, setLocalRecipe] = useState<RecipeContextType[]>([])

  const resetRecipe = () => {
    setRecipeContext(localRecipe)
  }

  return (
    <UserContext.Provider
      value={{ user, setUser, recipeContext, setRecipeContext, resetRecipe, setLocalRecipe }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
