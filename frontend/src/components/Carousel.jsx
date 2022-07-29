import { useState, useEffect, useReducer } from "react";


const Carousel = ({ slides, interval = 5000 }) => {

  const initialCarouselState = {
    offset: 0,
    desired: 0,
    active: 0,
  };


  const [state, dispatch] = useReducer(carouselReducer, initialCarouselState);
  const [current, setCurrent] = useState(0);
  const transitionTime = 400;
const elastic = `transform ${transitionTime}ms cubic-bezier(0.68, -0.55, 0.265, 1.55)`;
const smooth = `transform ${transitionTime}ms ease`;

  useEffect(() => {
    const next = (current + 1) % slides.length;
    const id = setTimeout(() => setCurrent(next), time);
    return () => clearTimeout(id);
  }, [current]);

  

  function carouselReducer(state, action) {
    switch (action.type) {
      case "jump":
        return {
          ...state,
          desired: action.desired,
        };
      case "next":
        return {
          ...state,
          desired: next(action.length, state.active),
        };
      case "prev":
        return {
          ...state,
          desired: previous(action.length, state.active),
        };
      case "done":
        return {
          ...state,
          offset: NaN,
          active: state.desired,
        };
      case "drag":
        return {
          ...state,
          offset: action.offset,
        };
      default:
        return state;
    }
  }

  useEffect(() => {
    const id = setTimeout(() => dispatch({ type: "next", length }), interval);
    return () => clearTimeout(id);
  }, [state.offset, state.active]);
  
  useEffect(() => {
    const id = setTimeout(() => dispatch({ type: "done" }), transitionTime);
    return () => clearTimeout(id);
  }, [state.desired]);

  
    const length = slides.length;
    const [active, setActive, handlers, style] = useCarousel(length, interval);
  
    return (
      length > 0 && (
        <div className="carousel">
          <ol className="carousel-indicators">
            {slides.map((_, index) => (
              <li
                onClick={() => setActive(index)}
                key={index}
                className={`${active === index ? "active" : ""}`}
              >{_}</li>
            ))}
          </ol>
          <div className="carousel-content" {...handlers} style={style}>
            <div className="carousel-item">{slides[slides.length - 1]}</div>
            {slides.map((slide, index) => (
              <div className="carousel-item" key={index}>
                {slide}
              </div>
            ))}
            <div className="carousel-item">{slides[0]}</div>
          </div>
        </div>
      )
    );
  };


  export default Carousel
