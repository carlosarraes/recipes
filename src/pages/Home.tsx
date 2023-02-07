import { ToastContainer } from 'react-toastify'
import CategoryButtons from '../components/CategoryButtons'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Recipes from '../components/Recipes'
import 'react-toastify/dist/ReactToastify.css'

interface HomeProps {
  type: string
}

const Home = ({ type }: HomeProps) => {
  return (
    <main className="relative w-full">
      <Header type={type} />
      <ToastContainer />
      <CategoryButtons type={type} />
      <Recipes type={type} />
      <Footer />
    </main>
  )
}

export default Home
