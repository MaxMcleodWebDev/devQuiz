import React from "react";

export default function Item({ index, activeIndex, children }) {
	const offset = (index - activeIndex) / 4;
	const direction = Math.sign(index - activeIndex);
	const absOffset = Math.abs(offset);

	const cssTransformProperties = `
    rotateY(calc(${offset} * -55deg))
    scaleY(calc(1 + ${absOffset} * -0.5))
    translateX(calc(${direction} * 5.3rem))
    translateZ(calc(${absOffset} * -45rem))
  `;

	const cssOpacity = `${Math.abs(index - activeIndex) >= 3 ? "0" : "1"}`;
	const cssDisplay = `${Math.abs(index - activeIndex) >= 3 ? "none" : "block"}`;

	return (
		<div
			className="carousel-item bg-indigo-500"
			style={{
				transform: cssTransformProperties,
				opacity: cssOpacity,
				display: cssDisplay,
				zIndex: 1,
			}}
		>
			{children}
		</div>
	);
}
