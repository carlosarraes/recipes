import { GiHotMeal, GiBeerBottle } from 'react-icons/gi'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="fixed bottom-0 p-2 bg-secondary flex justify-evenly w-[340px]">
      <Link to="/meals">
        <div className="tooltip" data-tip="Comidas">
          <GiHotMeal className="text-3xl text-white" />
        </div>
      </Link>
      <div className="divider divider-horizontal"></div>
      <Link to="/drinks">
        <div className="tooltip" data-tip="Bebidas">
          <GiBeerBottle className="text-3xl text-white" />
        </div>
      </Link>
    </footer>
  )
}

export default Footer
