export const getSelectOptions = (records) => (option) => {
	const options = records.flatMap((record) => {
		if (record[option].length > 1) {
			return record[option].split(' | ')
		} else {
			return record[option]
		}
	})
	return [...new Set(options)]
}
