import { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

import { Navigation, EffectFade } from "swiper/modules";

import exterior1 from "/images/exterior/appearance1.jpg";
import exterior2 from "/images/exterior/appearance2.jpg";
import exterior3 from "/images/exterior/appearance3.jpg";
import interior1 from "/images/interior/interior1.jpg";
import interior2 from "/images/interior/interior2.jpg";
import interior3 from "/images/interior/interior3.jpg";

const exterior = [exterior1, exterior2, exterior3];
const interior = [interior1, interior2, interior3];

const imagesMap: Record<string, string[]> = {
  exterior,
  interior
};

interface SliderProps {
  name: keyof typeof imagesMap;
  className: string;
}

const Slider: React.FC<SliderProps> = ({ name, className = "" }) => {
  const [activeIndex, setActiveIndex] = useState(99);
  const [direction, setDirection] = useState("next");

  const activeImgs = imagesMap[name];

  useEffect(() => {
    const slider = document.querySelector(`.${name}.is-active`);

    if (!slider) return;

    const wrapper = slider.querySelector(".swiper-wrapper");

    if (!wrapper) return;

    const slides = Array.from(wrapper.children) as HTMLElement[];

    const firstSlide = slides[0];

    if (firstSlide?.classList.contains("swiper-prev-active-animation")) {
      const nextSlide = firstSlide.nextElementSibling as HTMLElement | null;
      if (nextSlide) {
        nextSlide.classList.add("isVisible");

        const timeout = setTimeout(() => {
          nextSlide.classList.remove("isVisible");
        }, 1200);

        return () => clearTimeout(timeout);
      }
    }
  }, [activeIndex, direction, name]);

  return (
    <div className={`${name} absolute top-0 left-0 size-full ${className}`}>
      <Swiper
        className="max-w-screen h-lvh w-full"
        loop={true}
        slidesPerView={1}
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.realIndex);
        }}
        effect={"fade"}
        centeredSlides
        modules={[EffectFade, Navigation]}
        navigation={{
          nextEl: ".swiper-maserati-slider-next-button",
          prevEl: ".swiper-maserati-slider-prev-button"
        }}>
        {activeImgs.map((img, idx) => (
          <SwiperSlide
            key={idx}
            className={
              activeIndex === idx
                ? direction === "prev"
                  ? "swiper-prev-active-animation"
                  : "swiper-next-active-animation"
                : ""
            }>
            <img src={img} className="size-full object-cover" />
          </SwiperSlide>
        ))}
      </Swiper>
      <button type="button" onClick={() => setDirection("prev")} className="swiper-maserati-slider-prev-button">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
          <path
            fillRule="evenodd"
            d="M9.78 4.22a.75.75 0 0 1 0 1.06L7.06 8l2.72 2.72a.75.75 0 1 1-1.06 1.06L5.47 8.53a.75.75 0 0 1 0-1.06l3.25-3.25a.75.75 0 0 1 1.06 0Z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <button type="button" onClick={() => setDirection("next")} className="swiper-maserati-slider-next-button">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
          <path
            fillRule="evenodd"
            d="M6.22 4.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 0 1 0-1.06Z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
};

export default Slider;
