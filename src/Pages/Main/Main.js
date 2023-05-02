import { observer } from "mobx-react-lite";
import { store } from "../../stores/AppStore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Carousel } from "antd";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Main.css";

export const Main = observer(() => {
    const navigate = useNavigate();
    const [isImageHover, setIsImageHover] = useState(false);

    const onMouseEnter = () => {
        setIsImageHover(true);
    };

    const onMouseLeave = () => {
        setIsImageHover(false);
    };

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });

        if (store.IsReady === false) {
            store.fetchData();
            store.setIsReady(true);
        }
        store.setSliderValue([store.minPrice, store.maxPrice]);
    }, [store.minPrice]);

    return (
        store.ApiData && (
            <div className="imageSliderContainer">
                <Carousel autoplay autoplaySpeed={2000} effect="fade">
                    {store.ApiData.map((item, i) => (
                        <div className="imageContainer" key={i}>
                            <div
                                className="hoverImage"
                                onMouseEnter={onMouseEnter}
                                onMouseLeave={onMouseLeave}
                                onClick={() => navigate(`/products/${item.id}`)}
                            >
                                <img className="imageSlider" src={item.image} />

                                {isImageHover && (
                                    <div className="imageDesc">
                                        {item.description}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </Carousel>
            </div>
        )
    );
});
