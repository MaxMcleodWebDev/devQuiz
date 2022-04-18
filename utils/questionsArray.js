import { questionData } from "../data/questionData";

let array = [];

let questionToRender = [];
let answersToRender = [];

const createQuiz = () => {
	for (let i = 1; i <= 10; i++) {
		let randomIndex = Math.floor(Math.random() * questionData.length);

		if (!array.includes(randomIndex)) {
			array.push(randomIndex);

			let questions = questionData[randomIndex].question;
			let answers = questionData[randomIndex].answer;

			questionToRender.push(questions);
			answersToRender.push(answers);
		} else {
			i--;
		}
	}
};

createQuiz();

export { questionToRender, answersToRender };
