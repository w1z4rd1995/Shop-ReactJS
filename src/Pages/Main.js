import { observer } from "mobx-react-lite";
import { store } from "../Stores/AppStore";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "antd";
import { useEffect } from "react";

export const Main = observer(() => {
    useEffect(() => {
        if (store.IsReady === false) {
            store.fetchData();
            console.log("зашел фетч");
            store.setIsReady(true);
        }
        store.setSliderValue([store.minPrice, store.maxPrice]);
    }, [store.minPrice]);

    const contentStyle = {
        display: "flex",
        height: "600px",
        color: "#fff",
        lineHeight: "160px",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
    };

    return (
        store.allImages && (
            <div className="imageSliderContainer">
                <Carousel autoplay autoplaySpeed={3000} effect="fade">
                    {store.allImages.map((item, i) => (
                        <div className="hui" key={i}>
                            <img className="imageSlider" src={item} />
                        </div>
                    ))}
                </Carousel>
            </div>
        )
    );
});
