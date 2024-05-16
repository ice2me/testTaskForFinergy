import { createApi } from "@reduxjs/toolkit/query/react"

export const usersAPi = createApi({
	reducerPath: "usersAPi",
	baseQuery: '/',
	endpoints: (builder) => ({
		getCategories: builder.mutation({
			query: (link) => ({
				url: `/client/${link}`,
				method: "GET"
			})
		}),
	})
})

export const {
	useGetCategoriesMutation,
} = usersAPi
