import { useEffect } from "react";
import { store } from "../Stores/AppStore";
import { observer } from "mobx-react-lite";
import { User } from "../components/User";
import streetMap from "../components/images/StreetMap.PNG";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CallIcon from "@mui/icons-material/Call";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

export const Contacts = observer(() => {
    useEffect(() => {
        store.fetchDataUsers();
    }, []);

    return (
        store.users && (
            <div className="contactsContainer">
                <div className="users">
                    {store.users.map((item, index) => {
                        if (index < 4) {
                            return (
                                <div key={item.id}>
                                    <User user={item} />
                                </div>
                            );
                        }
                    })}
                </div>
                <div className="map">
                    <img src={streetMap} />
                </div>
                <div className="addresses">
                    <div>
                        <div>
                            <h2>Адрес</h2>
                        </div>
                        <div className="footerContactsInfo">
                            <div className="footerLocation">
                                <div>
                                    <LocationOnIcon />
                                </div>
                                <div>
                                    123456, Россия, г. Москва, ул. Степанова, д.
                                    100{" "}
                                </div>
                            </div>
                            <div className="footerPhone">
                                <div>
                                    <CallIcon />
                                </div>
                                <div>+7(495)4958800</div>
                            </div>
                            <div className="footerMail">
                                <div>
                                    <MailOutlineIcon />
                                </div>
                                <div>sobaka@mail.ru</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="feedback">
                    <div>
                        <div>
                            <h2>Обратная связь</h2>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
});
