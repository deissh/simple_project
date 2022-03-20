import { hot } from "react-hot-loader/root";
import { Routes, Route } from "react-router-dom";

import { CardInput } from "./views/card-input";
import { CompletedPayment } from './views/completed-payment';

const App = () => {
    return <Routes>
        <Route path="/" element={<CardInput/>}/>
        <Route path="/done" element={<CompletedPayment/>}/>
    </Routes>
}

export default process.env.NODE_ENV === "development" ? hot(App) : App;