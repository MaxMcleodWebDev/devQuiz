import { supabase } from '../utils/supabaseClient'
import RenderQuiz from "../components/RenderQuiz";

export async function getStaticProps() {

	let { data: questions, error } = await supabase
		.from('questions')
		.select('*')

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
		<div className='container-question'>
			<div>
				<a href="/quizzes/Maths">
					<button>Maths</button>
				</a>
				<a href="/quizzes/Science">
					<button>Science</button>
				</a>
				<a href="/quizzes/English">
					<button>English</button>
				</a>
			</div>
			<div>
				<a href="/create-question">
					<button>
						Add a Question
					</button>
				</a>
			</div>
		</div>
	);
}

