import "./Question.css";
import { sanitize } from "dompurify";

const Question = ({ question, onSelectAnswer, showResult }) => {
    const renderedAnswers = question.shuffledAnswers.map((answer) => (
        <button
            key={answer.id}
            className={`answer-btn
            ${
                answer.id !== question.shuffledAnswers[0].id
                    ? " margin-left-14px"
                    : ""
            }
            ${answer.selected ? " selected-ans" : ""}
            ${
                showResult &&
                answer.selected & (answer.value !== question.correct_answer)
                    ? " incorrect-ans"
                    : ""
            }
            ${
                showResult && answer.value === question.correct_answer
                    ? " correct-ans"
                    : ""
            }`}
            dangerouslySetInnerHTML={{
                __html: sanitize(answer.value),
            }}
            disabled={showResult}
            onClick={() => onSelectAnswer(question.id, answer.id)}
        ></button>
    ));

    return (
        <div className="question-container">
            <p
                dangerouslySetInnerHTML={{
                    __html: sanitize(question.question),
                }}
                className="question-container_q"
            ></p>
            <div className="question-container_ans">{renderedAnswers}</div>
            <hr />
        </div>
    );
};

export default Question;
