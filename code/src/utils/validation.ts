interface ErrorValidate {
	type: string;
	field: string;
	message: string;
}

type ValidateResponse = ErrorValidate | null;

const validateNeedLowerThan = (
	fieldNeedLower: string,
	fieldNeedGreater: string,
	type = "number",
	data: any,
): ValidateResponse => {
	if (typeof(data[fieldNeedLower]) !== "undefined" && typeof(data[fieldNeedGreater]) !== "undefined") {
		if (type === "date") {
			if (new Date(data[fieldNeedLower]) > new Date(data[fieldNeedGreater])) {
				return {
					type: "lowerThan",
					field: fieldNeedGreater,
					message: `The '${fieldNeedGreater}' field must greater than '${fieldNeedLower}' field`,
				};
			}
		}

		if (data[fieldNeedLower] > data[fieldNeedGreater]) {
			return {
				type: "greaterThan",
				field: fieldNeedLower,
				message: `The '${fieldNeedLower}' field must lower than '${fieldNeedGreater}' field`,
			};
		}
	}

	return null;
};

const validateFieldDependOn = (
	fieldOne: string,
	fieldTwo: string,
	data: any
): ValidateResponse => {
	if (data[fieldOne]) {
		if (typeof(data[fieldTwo]) === "undefined") {
			return {
				type: "required",
				field: fieldTwo,
				message: `The '${fieldTwo}' field is required when '${fieldOne}' field exists`,
			};
		}
	}

	if (data[fieldTwo]) {
		if (typeof(data[fieldOne]) === "undefined") {
			return {
				type: "required",
				field: fieldOne,
				message: `The '${fieldOne}' field is required when '${fieldTwo}' field exists`,
			};
		}
	}

	return null;
};

const validateValueHaveIn = (
	field: string,
	valuesNeedIn: any,
	data: any
): ValidateResponse => {
	if (typeof(data[field]) === "undefined" || data[field] in valuesNeedIn) {
		return null;
	}

	return {
		type: "notIn",
		field,
		message: `The '${field}' field is must in ${valuesNeedIn}`,
	};
};

export default {
	validateNeedLowerThan,
	validateFieldDependOn,
	validateValueHaveIn,
};
