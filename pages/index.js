import { supabase } from '../utils/supabaseClient'
import RenderQuiz from "../components/RenderQuiz";

export async function getStaticProps() {

	const randomOrder = Math.floor(Math.random() * 4)

	let { data: questions, error } = await supabase
		.from('questions')
		.select('*')
	// .order({ id: randomOrder })

	if (error) {
		throw error;
	}

	return {
		props: {
			questions,
		}
	}
}

export default function Home({ questions }) {
	return (
		<div>

			<RenderQuiz questions={questions} />
			{/* <pre>{JSON.stringify(questions, null, 2)}</pre> */}

			{/* {questions[0].answers.map((a, i) => {
				return (
					<p>{a.answer}</p>
				)
			})} */}
		</div>
	);
}

