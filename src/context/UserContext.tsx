import { createContext } from 'react'
import type { RecipeContextType } from './UserProvider'

export interface UserContextType {
  user: {
    email: string
    name: string
  }
  setUser: (user: UserContextType['user']) => void
  recipeContext: RecipeContextType[]
  setRecipeContext: (recipeContext: RecipeContextType[]) => void
  setLocalRecipe: (localRecipe: RecipeContextType[]) => void
  resetRecipe: () => void
}

const UserContext = createContext<UserContextType>({
  user: {
    email: '',
    name: '',
  },
  recipeContext: [],
  setUser: () => {},
  setRecipeContext: () => {},
  setLocalRecipe: () => {},
  resetRecipe: () => {},
})

export default UserContext
