import React from 'react'
import Card from '../components/Card'
import Navbar from '../components/Navbar'

export default function quizzList() {
	return (
		<div>
			<Navbar />
			<div className='flex justify-center'>
				<div className="grid grid-cols-3 gap-10 p-16">
					<Card subject='Maths' src='/img/maths.jpg' />
					<Card subject='Science' src='/img/science.jpg' />
					<Card subject='English' src='/img/english.jpg' />
				</div>
			</div>
		</div>
	)
}
