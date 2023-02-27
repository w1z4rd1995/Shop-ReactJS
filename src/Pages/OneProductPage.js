import { useParams } from "react-router-dom";

export const OneProductPage = () => {
    const params = useParams();
    console.log(params);
    return (
        <div>
            <h1>productPage</h1>
        </div>
    );
};
