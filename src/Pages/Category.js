import { useParams } from "react-router-dom";
import { store } from "../Stores/AppStore";

export const Category = () => {
    const params = useParams();
    console.log(params);
    return (
        <div>
            <h1> {`Category ${params.categoryName}`} </h1>
        </div>
    );
};
