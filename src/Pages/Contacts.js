import { useEffect } from "react";
import { store } from "../Stores/AppStore";
import { observer } from "mobx-react-lite";
import { User } from "../components/User";
import streetMap from "../components/images/StreetMap.PNG";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CallIcon from "@mui/icons-material/Call";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { FeedBack } from "../components/FeedBack";
import mapboxgl, { Map } from "mapbox-gl";
import { useRef, useState } from "react";
// import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken =
    "pk.eyJ1IjoidzF6NHJkMTk5NSIsImEiOiJjbGgwbG15cDMwdXM2M25xYzJ6bDJlYnU4In0.zNpuXxeBit4wbXd1h-550Q";

export const Contacts = observer(() => {
    useEffect(() => {
        store.fetchDataUsers();

        let map = new mapboxgl.Map({
            container: "map",
            style: "mapbox://styles/mapbox/streets-v12",
            center: [37.66901257795662, 55.73036160636285],
            zoom: 16,
        });

        let marker = new mapboxgl.Marker({ color: "blue" })
            .setLngLat([37.66901257795662, 55.73036160636285])
            .addTo(map);
    }, []);

    // const mapContainer = useRef(null);
    // const map = useRef(null);

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
                    <div id="map" className="map-container" />
                </div>
                <div className="addresses">
                    <div>
                        <h2>Адрес</h2>
                    </div>
                    <div className="footerContactsInfo">
                        <div className="footerLocation">
                            <div>
                                <LocationOnIcon />
                            </div>
                            <div>
                                123456, Россия, г. Москва, ул. Степанова, д. 100{" "}
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
                <div className="feedback">
                    <div>
                        <div>
                            <h2>Обратная связь</h2>
                        </div>
                        <div>
                            <FeedBack />
                        </div>
                    </div>
                </div>
            </div>
        )
    );
});
