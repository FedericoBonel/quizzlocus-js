import "./Quizz.css";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import Question from "../Question/Question";
import { getAllQuestions } from "../../api/QuestionsAPI";

const Quizz = () => {
    const [questions, setQuestions] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        const fetchQuestions = async () => {
            const questions = await getAllQuestions(5);
            setQuestions(questions);
            setFetching(false);
        };

        if (!showResult) {
            fetchQuestions();
            setFetching(true);
        }
    }, [showResult]);

    const markAsSelected = (answers, answerId) =>
        answers.map((answer) => ({
            ...answer,
            selected: answer.id === answerId,
        }));

    const selectAnswer = (questionId, answerId) => {
        if (showResult) {
            return;
        }

        setQuestions((oldQuestions) =>
            oldQuestions.map((oldQuestion) =>
                oldQuestion.id === questionId
                    ? {
                          ...oldQuestion,
                          shuffledAnswers: markAsSelected(
                              oldQuestion.shuffledAnswers,
                              answerId
                          ),
                      }
                    : oldQuestion
            )
        );
    };

    const getNumberOfCorrectAnswers = () => {
        let numberOfAnswers = 0;
        questions.forEach((question) =>
            question.shuffledAnswers.forEach((answer) => {
                if (answer.value === question.correct_answer && answer.selected) {
                    numberOfAnswers++;
                }
            })
        );
        return numberOfAnswers;
    };

    const renderedQuestions = questions.map((question) => (
        <Question
            key={nanoid()}
            question={question}
            onSelectAnswer={selectAnswer}
            showResult={showResult}
        />
    ));

    return (
        <div className="questions-container">
            {fetching ? (
                <FontAwesomeIcon icon={faSpinner} spin size="6x" />
            ) : (
                <>
                    {renderedQuestions}
                    {showResult && (
                        <p className="score-par">
                            You scored {getNumberOfCorrectAnswers()}/5 correct
                            answers
                        </p>
                    )}
                    <button
                        className="check-answers-btn"
                        onClick={() => setShowResult((prev) => !prev)}
                    >
                        {showResult ? "Play again" : "Check Answers"}
                    </button>
                </>
            )}
        </div>
    );
};

export default Quizz;
