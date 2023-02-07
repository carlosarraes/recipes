import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import UserContext from '../context/UserContext'
import logo from '../images/recipeHub.png'

const Login = () => {
  const [data, setData] = useState({
    email: '',
    name: '',
  })

  const { setUser } = useContext(UserContext)
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setData({ ...data, [name]: value })
  }

  const validateBtn = () => {
    const { email, name } = data
    const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i
    if (regex.test(email) && name.length >= 3) {
      return false
    }
    return true
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    navigate('/meals')
    setUser(data)
  }

  const { email, name } = data

  return (
    <main className="w-full h-full">
      <div className="flex justify-center items-center w-full h-1/2 bg-purple-100">
        <img src={logo} alt="Logo Foodeita" />
      </div>
      <h1 className="text-center text-2xl font-medium text-secondary mt-4">Login</h1>
      <form className="h-2/3 p-4" onSubmit={handleSubmit}>
        <input
          className="w-full border rounded-md p-2 mb-4 border-primary"
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          placeholder="E-mail"
        />
        <input
          className="w-full border rounded-md p-2 mb-4 border-primary"
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          placeholder="Usuário"
        />
        <button className="btn btn-secondary w-full mt-8" disabled={validateBtn()}>
          Entrar
        </button>
      </form>
    </main>
  )
}

export default Login
