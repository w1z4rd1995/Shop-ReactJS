import { observer } from "mobx-react-lite";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { Navigation } from "./navigation/Navigation";
import "./App.css";

const App = observer(() => {
    return (
        <div className="container">
            <Header />
            <Navigation />
            <Footer />
        </div>
    );
});

export default App;
