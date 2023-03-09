import { useParams } from "react-router-dom";
import { store } from "../Stores/AppStore";
import Rating from "@mui/material/Rating";

export const OneProductPage = () => {
    const params = useParams();
    const productId = Number(params.productId);
    console.log(productId);
    return (
        store.ApiData && (
            <div>
                {store.ApiData.map((item) => {
                    if (item.id === productId) {
                        console.log(item.rating);
                        return (
                            <div key={item.id} className="oneProductContainer">
                                <div className="oneProductTitle">
                                    <h1>{item.title}</h1>
                                </div>
                                <div className="oneProductImage">
                                    <img src={item.image} />
                                </div>
                                <div className="oneProductDescr">
                                    <h3>Описание</h3>
                                    {item.description}
                                </div>
                                <div className="oneProductRating">
                                    <h3>Рейтинг</h3>
                                    <Rating value={item.rating} readOnly />
                                    {item.rating}
                                </div>
                                <div className="oneProductPriceContainer">
                                    <h3>Цена</h3>
                                    {item.price} $
                                </div>
                                {/* <div></div> */}
                            </div>
                        );
                    }
                })}
            </div>
        )
    );
};
