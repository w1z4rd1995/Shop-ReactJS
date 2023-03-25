// import { useParams } from "react-router-dom";
// import { store } from "../Stores/AppStore";
// import { OneProduct } from "../components/OneProduct";
// import { observer } from "mobx-react-lite";
// import { useState } from "react";
// import { Checkbox } from "@mui/material";
// import Slider from "@mui/material/Slider";

// export const CategoryProducts = observer(() => {
//     const params = useParams();
//     const [isChecked, setIsChecked] = useState({
//         price: false,
//         name: false,
//         rating: false,
//     });

//     const [sliderValue, setSliderValue] = useState([0, 100]);
//     const onSliderChange = (event, newValue) => {
//         setSliderValue(newValue);
//     };
//     return (
//         <div className="productContainer">
//             <div className="filters">
//                 <div>
//                     <h4>Фильтры</h4>
//                 </div>
//                 <div>Цена</div>
//                 <div className="inputStyle">
//                     <input className="inputMin" type="number" />
//                     <input className="inputMax" type="number" />
//                 </div>
//                 <div>
//                     <div>от</div>

//                     <div>
//                         <div>до</div>
//                     </div>
//                 </div>

//                 <div className="sliderStyle">
//                     <Slider
//                         value={sliderValue}
//                         valueLabelDisplay="auto"
//                         onChange={onSliderChange}
//                         disableSwap
//                     />
//                 </div>
//                 <div className="filterButtonStyle">
//                     <input
//                         className="filterButton"
//                         type="button"
//                         value="Применить"
//                     />
//                 </div>
//             </div>

//             <div className="sorting">
//                 {" "}
//                 Сортировать по:
//                 <div>
//                     <Checkbox
//                         checked={isChecked.price}
//                         onChange={() => {
//                             if (!isChecked.price) {
//                                 store.sortingByPrice();
//                             }
//                             setIsChecked({
//                                 price: !isChecked.price,
//                                 name: false,
//                                 rating: false,
//                             });
//                         }}
//                     />
//                     Цене
//                 </div>
//                 <div>
//                     <Checkbox
//                         checked={isChecked.name}
//                         onChange={() => {
//                             setIsChecked({
//                                 name: !isChecked.name,
//                                 price: false,
//                                 rating: false,
//                             });
//                             if (!isChecked.name) {
//                                 store.sortingByName();
//                             }
//                         }}
//                     />
//                     Наименованию
//                 </div>
//                 <div>
//                     <Checkbox
//                         checked={isChecked.rating}
//                         onChange={() => {
//                             setIsChecked({
//                                 rating: !isChecked.rating,
//                                 name: false,
//                                 price: false,
//                             });
//                             if (!isChecked.rating) {
//                                 store.sortingByRating();
//                             }
//                         }}
//                     />
//                     Рейтингу
//                 </div>
//             </div>
//             <div className="products">
//                 {store.ApiData.map((item) => {
//                     if (item.category === params.categoryName) {
//                         return (
//                             <div key={item.id}>
//                                 <OneProduct Item={item} />
//                             </div>
//                         );
//                     }
//                 })}
//             </div>
//         </div>
//     );
// });
