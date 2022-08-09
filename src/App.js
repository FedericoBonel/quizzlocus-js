import { useState } from "react";
import "./App.css";
import MainMenu from "./components/MainMenu/MainMenu";
import Quizz from "./components/Quizz/Quizz";

function App() {
    const [screen, setScreen] = useState("mainmenu");

    const onStartQuizz = () => {
        setScreen("quizz");
    };

    return (
        <div className="App">
            {screen === "mainmenu" && <MainMenu onClickStart={onStartQuizz} />}
            {screen === "quizz" && <Quizz />}
        </div>
    );
}

export default App;
