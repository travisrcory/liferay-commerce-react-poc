const getString = (item: any | unknown): string => item as string;

const getNewArray = (array: any[], condition: boolean): any[] => {
	const newArray: any[] = [];

	let index = 0;

	while (array[index]) {
		if (condition) {
			newArray.push(array[index]);
		}
		index++;
	}

	return newArray;
};

export {getString, getNewArray};
