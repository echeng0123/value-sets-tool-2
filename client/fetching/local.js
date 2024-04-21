// This file allows the client side (front end ) to access the database links we set up on the backend

const base_url = "http://localhost:8080/api";

// BETA BLOCKER VALUE SET ROUTES ============== //
export const fetchAllBetaBlockerValueSets = async () => {
	try {
		const response = await fetch(`${base_url}/beta_blocker_value_sets`);
		const result = await response.json();
		return result;
	} catch (error) {
		console.error(error);
	}
};

export const fetchBetaBlockerValueSetsByValueSetId = async (value_set_id) => {
	try {
		const response = await fetch(
			`${base_url}/beta_blocker_value_sets/${value_set_id}`
		);
		const result = await response.json();
		return result;
	} catch (error) {
		console.error(error);
	}
};

export const fetchBetaBlockerValueSetsByValueSetName = async (
	value_set_name
) => {
	try {
		console.log("current search input in FBBVSBVSN", value_set_name);
		const response = await fetch(
			`${base_url}/beta_blocker_value_sets/value_set_name/${value_set_name}`
		);
		const result = await response.json();
		console.log("result here", result);
		return result;
	} catch (error) {
		console.error(error);
	}
};

export const fetchBetaBlockerValueSetsByMedicationId = async (
	medication_id
) => {
	try {
		const response = await fetch(
			`${base_url}/beta_blocker_value_sets/medication_id/${medication_id}`
		);
		const result = await response.json();
		return result;
	} catch (error) {
		console.error(error);
	}
};

export const fetchBetaBlockerValueSetsBySimpleGenericName = async (
	simple_generic_name
) => {
	try {
		const response = await fetch(
			`${base_url}/beta_blocker_value_sets/simple_generic_name/${simple_generic_name}`
		);
		const result = await response.json();
		return result;
	} catch (error) {
		console.error(error);
	}
};

export const fetchBetaBlockerValueSetsByRoute = async (route) => {
	try {
		const response = await fetch(
			`${base_url}/beta_blocker_value_sets/route/${route}`
		);
		const result = await response.json();
		return result;
	} catch (error) {
		console.error(error);
	}
};

// END BETA BLOCKER VALUE SET ROUTES ============== //

// MEDICATIONS TABLE ROUTES ======================= //
export const fetchAllMedications = async () => {
	try {
		const response = await fetch(`${base_url}/medications`);
		const result = await response.json();
		return result;
	} catch (error) {
		console.error(error);
	}
};

export const fetchMedicationsByMedicationId = async (medication_id) => {
	try {
		const response = await fetch(
			`${base_url}/medications/${medication_id}`
		);
		const result = await response.json();
		return result;
	} catch (error) {
		console.error(error);
	}
};

export const fetchMedicationsBySimpleGenericName = async (
	simple_generic_name
) => {
	try {
		const response = await fetch(
			`${base_url}/medications/simple_generic_name/${simple_generic_name}`
		);
		const result = await response.json();
		return result;
	} catch (error) {
		console.error(error);
	}
};

export const fetchMedicationsByRoute = async (route) => {
	try {
		const response = await fetch(`${base_url}/medications/route/${route}`);
		const result = await response.json();
		return result;
	} catch (error) {
		console.error(error);
	}
};
