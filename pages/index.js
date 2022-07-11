import { useState, useEffect } from "react"
import { supabase } from '../utils/supabaseClient'
import Auth from '../components/Auth'
import Account from '../components/Account'
import RenderQuiz from "../components/RenderQuiz";

export async function getStaticProps() {

	let { data: questions, error } = await supabase.from('questions').select('*')

	if (error) {
		throw error;
	}

	return {
		props: {
			questions,
		}
	}
}

export default function home({ questions }) {

	console.log(questions)

	// const [session, setSession] = useState(null)

	// useEffect(() => {
	// 	setSession(supabase.auth.session())

	// 	supabase.auth.onAuthStateChange((_event, session) => {
	// 		setSession(session)
	// 	})
	// }, [])

	return (
		<div>
			{/* <div className="container" style={{ padding: '50px 0 100px 0' }}>
				{!session ? <Auth /> : <Account key={session.user.id} session={session} />}
			</div> */}
			{/* <RenderQuiz /> */}
			<pre>{JSON.stringify(questions)}</pre>
		</div>
	);
}

