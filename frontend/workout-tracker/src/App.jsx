import { Routes, Route } from "react-router";
import "./App.css";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />}></Route>
            </Routes>
        </>
    );
}

export default App;
