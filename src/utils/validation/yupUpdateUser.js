import * as yup from "yup"

export const postUserSchema = (formatMessage) => {
	return yup.object().shape({
		nameUser: yup
			.string()
			.required(formatMessage ({id: "nameUserRequired"})),
		dateBirth: yup
			.string()
			.required(formatMessage ({id: "dateBirth"})),
		idnp: yup
			.string()
			.length(13, formatMessage ({id: "idnp"}))
			.required(formatMessage ({id: "idnp"})),
	})
}