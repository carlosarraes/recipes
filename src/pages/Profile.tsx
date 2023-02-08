import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import NavOpts from '../components/NavOpts'
import UserContext from '../context/UserContext'

const Profile = () => {
  const [data, setData] = useState({
    preparando: 0,
    feitas: 0,
    favoritas: 0,
    link: '',
  })

  const navigate = useNavigate()

  const {
    user: { name, email },
    setUser,
  } = useContext(UserContext)

  useEffect(() => {
    const doneRecipes = JSON.parse(localStorage.getItem('finishedRecipes') ?? '[]')
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes') ?? '{}')
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes') ?? '[]')
    const { type, idMeal, idDrink } = inProgressRecipes[0]
    const id = idMeal ?? idDrink
    setData({
      preparando: Object.keys(inProgressRecipes).length,
      feitas: doneRecipes.length,
      favoritas: favoriteRecipes.length,
      link: `/${type as string}/${id as string}/in-progress`,
    })
  }, [])

  const handleClick = () => {
    setUser({ email: '', name: '' })
    navigate('/')
  }

  return (
    <section>
      <Header type="noSearch" />
      <NavOpts />
      <section className="flex flex-col items-center justify-center mt-4">
        <div className="flex flex-col items-center gap-2 w-full">
          <h1 className="text-2xl text-secondary-focus">Profile</h1>
          <div className="divider w-full"></div>
          <div className="tooltip mb-4" data-tip={email}>
            <p className="text-lg text-secondary-focus underline">{name}</p>
          </div>
        </div>
        <h2>Informações do usuário:</h2>
        <div className="stats shadow-2xl scale-75">
          <div className="stat place-items-center">
            <Link to={data.link} className="text-center">
              <div className="stat-title">Preparando</div>
              <div className="stat-value">{data.preparando}</div>
            </Link>
          </div>
          <div className="stat place-items-center">
            <div className="stat-title">Favoritos</div>
            <div className="stat-value text-secondary">{data.favoritas}</div>
          </div>
          <div className="stat place-items-center">
            <div className="stat-title">Preparados</div>
            <div className="stat-value">{data.feitas}</div>
          </div>
        </div>
        <div className="divider"></div>
        <div className="flex m-2 justify-center items-center w-full">
          <button className="btn btn-secondary w-full mx-4" onClick={handleClick}>
            Sair
          </button>
        </div>
      </section>
    </section>
  )
}

export default Profile
