export function formatDate(timestamp) {
	const date = new Date(timestamp);
	const day = date.getDate().toString().padStart(2, '0');
	const month = (date.getMonth() + 1).toString().padStart(2, '0');
	const year = date.getFullYear() - 3;
	return `${day}.${month}.${year}`;
}