interface CarouselProps {
  ingredients?: string[]
}

const Carousel = ({ ingredients }: CarouselProps) => {
  return (
    <div className="carousel rounded-box mt-4">
      {ingredients?.map((ingredient) => (
        <div className="carousel-item flex flex-col w-1/3" key={ingredient}>
          <img
            src={`https://www.thecocktaildb.com/images/ingredients/${ingredient}-Small.png`}
            alt={ingredient}
          />
          <p className="text-center">{ingredient}</p>
        </div>
      ))}
    </div>
  )
}

export default Carousel
