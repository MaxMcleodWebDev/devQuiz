import React from "react";
import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import Item from "./Item";

export default function Carousel({ resultDetails }) {
	const [activeIndex, setActiveIndex] = useState(0);

	console.log(resultDetails);

	const handleNextItemBtn = () => {
		setActiveIndex((prev) => {
			return prev + 1 < resultDetails.length ? prev + 1 : prev;
		});
	};

	const handlePrevItemBtn = () => {
		setActiveIndex((prev) => {
			return prev - 1 >= 0 ? prev - 1 : prev;
		});
	};

	return (
		<div className="carousel-container">
			{activeIndex > 0 && (
				<button className="carousel-btn-switch-card-left carousel-btn-switch-card" onClick={handlePrevItemBtn}>
					<IoIosArrowBack />
				</button>
			)}
			{resultDetails.map((item, index) => {
				return (
					<Item key={index} index={index} activeIndex={activeIndex}>
						<div className="flex w-full flex-col items-center justify-center mt-10 px-20 text-center">
							<p className="mb-2 font-bold text-2xl">Question {index + 1}</p>
							<p className="font-bold">{item.questionTitle}</p>
						</div>
						<div className="bg-slate-100 absolute w-full bottom-0">
							<p className="m-5 text-gray-900 ">You answered: {item.answer}</p>
							<div className={item.result == true ? 'bg-green-600 p-1' : 'bg-red-600 p-1'}>
								<p>{item.result == true ? 'Correct' : 'Incorrect'}</p>
							</div>
						</div>
					</Item>
				);
			})}
			{activeIndex < 10 - 1 && (
				<button className="carousel-btn-switch-card-right carousel-btn-switch-card" onClick={handleNextItemBtn}>
					<IoIosArrowBack style={{ transform: "rotate(180deg)" }} />
				</button>
			)}
		</div>
	);
}
