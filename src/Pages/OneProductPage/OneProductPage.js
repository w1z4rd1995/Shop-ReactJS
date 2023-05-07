import { useParams } from "react-router-dom";
import { store } from "../../stores/AppStore";
import Rating from "@mui/material/Rating";
import ReactImageMagnify from "react-image-magnify";
import { NavLink } from "react-router-dom";
import { observer } from "mobx-react-lite";
import "./OneProductPage.css";
import { useEffect } from "react";

export const OneProductPage = observer(() => {
    const params = useParams();
    const productId = Number(params.productId);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    }, []);

    return (
        <div>
            {store.ApiData.map((item) => {
                if (item.id === productId) {
                    return (
                        <div key={item.id} className="oneProductContainer">
                            <div className="oneProductTitle">
                                <h1>{item.title}</h1>
                            </div>
                            <div className="oneProductImage">
                                <ReactImageMagnify
                                    {...{
                                        smallImage: {
                                            // isFluidWidth: true,
                                            width: 500,
                                            height: 500,
                                            src: item.image,
                                        },
                                        largeImage: {
                                            src: item.image,
                                            width: 1500,
                                            height: 1500,
                                        },
                                        isHintEnabled: true,
                                    }}
                                />
                            </div>
                            <div className="oneProductInfo">
                                <div className="oneProductCategory">
                                    <h3>Категория</h3>
                                    {item.category}
                                </div>
                                <div className="oneProductDescr">
                                    <h3>Описание</h3>
                                    {item.description}
                                </div>
                                <div className="oneProductRating">
                                    <h3>Рейтинг</h3>
                                    <div className="oneProductRatingStyle">
                                        <div>
                                            <Rating
                                                value={item.rating}
                                                readOnly
                                            />
                                        </div>
                                        <div>{item.rating}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="oneProductPriceContainer">
                                <div className="oneProductPriceStyle">
                                    {item.price} $
                                </div>
                                <div className="oneProductAddButton">
                                    {item.isCart === false ? (
                                        <input
                                            type="button"
                                            value="В корзину"
                                            onClick={() => {
                                                store.addCart(item.id);
                                                store.findCartCount();
                                            }}
                                        />
                                    ) : (
                                        <>
                                            <div className="cartLink">
                                                <NavLink to="/cart">
                                                    Добавлено
                                                </NavLink>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                }
            })}
        </div>
    );
});
