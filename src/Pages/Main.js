import { observer } from "mobx-react-lite";
import { store } from "../Stores/AppStore";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
        if (store.IsReady === false) {
            store.fetchData();
            console.log("зашел фетч");
            store.setIsReady(true);
        }
        store.setSliderValue([store.minPrice, store.maxPrice]);
    }, [store.minPrice]);

    return (
        store.allImages && (
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
