/* eslint-disable react/jsx-key */
export default function ResultsContainer({ currentButton, valueSets }) {
	return (
		<section>
			<div id="results-container" className="single-card-container">
				<h2 className="single-card-title">
					Value Sets Corresponding to Search Query
				</h2>
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
