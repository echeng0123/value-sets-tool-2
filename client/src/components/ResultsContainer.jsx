/* eslint-disable react/jsx-key */
export default function ResultsContainer({ currentButton, valueSets }) {
	console.log("currentButton inside results container is: ", currentButton);
	console.log("valueSets in container:", valueSets);
	return (
		<section>
			<h3>Value Sets corresponding to search query</h3>
			<div id="results-container">
				{currentButton && valueSets.length > 0 ? (
					<div>
						{valueSets.map((response) => {
							return (
								<div>
									<h2>{response}</h2>
								</div>
							);
						})}
					</div>
				) : (
					<>
						<h3>
							Corresponding value sets will appear here once the
							search term is entered.
						</h3>
					</>
				)}
			</div>
		</section>
	);
}

// currentButton === "medication" &&
