/* eslint-disable react/jsx-key */
export default function ResultsContainer({ currentButton, valueSets }) {
	// console.log("currentButton inside results container is: ", currentButton);
	// console.log("valueSets in container:", valueSets);
	return (
		<section>
			<div id="results-container">
				<h2>
					<u>Value Sets corresponding to search query</u>
				</h2>
				{currentButton && valueSets.length > 0 ? (
					<div>
						{valueSets.map((response) => {
							return (
								<div>
									<h3>{response}</h3>
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
