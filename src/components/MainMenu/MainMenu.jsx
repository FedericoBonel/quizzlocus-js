import "./MainMenu.css";

const MainMenu = ({ onClickStart }) => {
    return (
        <header className="header-container">
            <h1 className="header-container_title">Quizzlocus</h1>
            <p className="header-container_desc">
                Are you ready to test your knowledge?
            </p>
            <button className="start-btn" onClick={onClickStart}>
                Start Quizz
            </button>
        </header>
    );
};

export default MainMenu;
