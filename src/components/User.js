import { store } from "../Stores/AppStore";
import { observer } from "mobx-react-lite";

export const User = observer((props) => {
    return (
        <div className="userContainer">
            <div className="userAvatar">
                <img src={props.user.avatar} />
            </div>
            <div className="userName">
                {props.user.first_name} {props.user.last_name}{" "}
            </div>
            <div className="userMail">{props.user.email}</div>
            <div></div>
        </div>
    );
});
