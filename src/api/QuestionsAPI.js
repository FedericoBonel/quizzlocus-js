import { nanoid } from "nanoid";

const QUESTIONS_URL = "https://opentdb.com/api.php";

// Fetches the passed number of questions
export const getAllQuestions = async (numberOfQuestions) => {
    try {
        const response = await fetch(
            `${QUESTIONS_URL}?amount=${numberOfQuestions}`,
            {
                method: "GET",
                headers: {
                    Accept: "application/json",
                },
            }
        );
        const data = await response.json();

        // Shuffle the answers and give it an id
        const questions = data.results.map((question) => ({
            ...question,
            id: nanoid(),
            shuffledAnswers: shuffleAnswers(question),
        }));
        return questions;
    } catch (error) {
        console.log(error);
    }
};

// Shuffles all answers of the given question (correct and incorrect) and returns them as an array
const shuffleAnswers = (question) => {
    let answers = [];
    // Generate a random index for the correct answer
    const numberOfAnswers = question.incorrect_answers.length + 1;
    const correctAnswerIndex = Math.floor(Math.random() * numberOfAnswers);
    answers[correctAnswerIndex] = createNewAnswer(question.correct_answer);
    // Assign the rest of the answers skipping the correct answer index (To avoid overriding)
    let incAnswerIndex = 0;
    for (let answer = 0; answer < numberOfAnswers; answer++) {
        if (answer === correctAnswerIndex) {
            continue;
        }
        answers[answer] = createNewAnswer(
            question.incorrect_answers[incAnswerIndex]
        );
        incAnswerIndex++;
    }
    return answers;
};

const createNewAnswer = (value) => {
    return {
        id: nanoid(),
        value,
        selected: false,
    };
};
