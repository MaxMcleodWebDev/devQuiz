import NavButton from "../components/NavButton";
import { useEffect, useState } from 'react'
import { supabase } from "../utils/supabaseClient";
import Navbar from "../components/Navbar";

export default function Home({ session }) {

	// const [loading, setLoading] = useState(true)

	// useEffect(() => {
	// 	getProfile()
	// }, [session])

	// async function getProfile() {
	// 	try {
	// 		setLoading(true)
	// 		const user = supabase.auth.user()

	// 		let { data, error, status } = await supabase
	// 			.from('profiles')
	// 			.select(`*`)
	// 			.eq('id', user.id)
	// 			.single()

	// 		if (error && status !== 406) {
	// 			throw error
	// 		}

	// 		if (data) {
	// 			if (data.role == true) {
	// 				document.getElementById('admin-content').className = ''
	// 			}
	// 			toggleSession()
	// 		}
	// 	} catch (error) {
	// 		console.log(error.message)
	// 	} finally {
	// 		setLoading(false)
	// 	}
	// }

	// const toggleSession = () => {
	// 	document.getElementById('loggin-content').className = 'container-question'
	// }

	return (
		<div>
			<Navbar />
			<div className='py-32 flex justify-center'>
				<h2 className='font-extrabold text-4xl pr-2'>Welcome to</h2>
				<h2 className='font-extrabold text-4xl bg-gradient-to-r from-cyan-500 to-blue-500 text-transparent bg-clip-text'>BrainQuest.</h2>
			</div>
			<div className="flex justify-center">
				<h3 className="max-w-3xl">
					Hi and welcome to BrainQuest! Thank you for visiting and checking out my work in progress project. I'd like to dedicate this section to talk more about the project itself, what it's objectives are and how I feel I can achive those.
					<br />
					<br />
					The core principle of this project is to be a learning platform that adapts to a users performance in quizzes, or tests if you will. In short, the better the user performs in these quizzes, the harder the questions will become, and vis versa should a user not be performing well.
					<br />
					<br />
					There are many more features that I have planned for this project, but first let's talk about how far along the project is.
				</h3>
				<br />
				<br />
			</div >
			<div>
				{/* <div id="admin-content">
					<NavButton href='/student-list' nav='view students' />
					<NavButton href='/question-list' nav='view questions' />
					<NavButton href='/create-question' nav='add a question' />
				</div> */}
			</div>
		</div >
	);
}