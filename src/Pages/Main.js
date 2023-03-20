import { observer } from "mobx-react-lite";
import { store } from "../Stores/AppStore";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "antd";

export const Main = observer(() => {
    const contentStyle = {
        display: "flex",
        height: "600px",
        color: "#fff",
        lineHeight: "160px",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        // background: "#364d79",
    };
    //     return (
    //         store.allImages && (
    //             <div className="imageSliderContainer">
    //                 <Carousel
    //                     slides={slides}
    //                     autoplay={true}
    //                     interval={4000}
    //                     arrows={true}
    //                 />
    //             </div>
    //         )
    //     );
    // });
    return (
        store.allImages && (
            <div className="imageSliderContainer">
                <Carousel autoplay autoplaySpeed={5000} effect="fade">
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
