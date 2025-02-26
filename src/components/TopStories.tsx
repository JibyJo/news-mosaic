import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useTopNews from "../hooks/useTopStories";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const TopStories = () => {
  const topStoriesArr = useTopNews();
  const PrevArrow = (props: any) => {
    const { onClick } = props;
    return (
      <button
        onClick={onClick}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full z-10 hover:bg-gray-700 transition"
        aria-label="Previous"
      >
        <FaChevronLeft size={20} />
      </button>
    );
  };

  const NextArrow = (props: any) => {
    const { onClick } = props;
    return (
      <button
        onClick={onClick}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full z-10 hover:bg-gray-700 transition"
        aria-label="Next"
      >
        <FaChevronRight size={20} />
      </button>
    );
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 pt-24 relative">
      <h1 className="text-xl md:text-2xl font-bold text-center mb-6">
        Top Stories
      </h1>

      <div className="relative w-full">
        <Slider {...settings} className="w-full">
          {topStoriesArr?.news.map((story) => (
            <div key={story.id} className="flex flex-col items-center">
              <div className="w-full h-[350px] md:h-[400px] flex items-center justify-center">
                <img
                  src={story.imageUrl}
                  alt={story.title}
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
              <p className="text-gray-500 mt-2">
                {story.author || "Unknown Author"}
              </p>
              <h2 className="text-lg font-semibold text-center">
                {story.title}
              </h2>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default TopStories;
