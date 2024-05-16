export function chunkArray(array, size) {
	const chunkedArray = []
	for (let i = 0; i < array.length; i += size) {
		chunkedArray.push(array.slice(i, i + size))
	}
	return chunkedArray
}

export function formatDateStr(dateString) {
	const parts = dateString.split("-")
	if (parts.length !== 3) {
		return "Invalid date format"
	}
	const [year, month, day] = parts
	return `${day}.${month}.${year}`
}