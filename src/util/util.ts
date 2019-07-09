import {useState, useEffect} from 'react';

const getString = (item: any | unknown): string => item as string;

function getNewArray<T, K extends keyof T>(
	array: T[],
	originalArray: T[],
	propertyKey: K
): T[] {
	function getProperty<T, K extends keyof T>(obj: T, key: K) {
		return obj[key];
	}

	const newArray: T[] = [];

	let index = 0;

	while (array[index]) {
		if (
			getProperty(array[index], propertyKey) !==
			getProperty(originalArray[index], propertyKey)
		) {
			newArray.push(array[index]);
		}

		index++;
	}

	return newArray;
}

function useUpdatedItems<T, K extends keyof T>(
	initialState: T[],
	updatedState: T[],
	propertyKey: K
): T[] {
	const [state, setState] = useState<T[]>([]);

	useEffect(() => {
		setState(getNewArray(updatedState, initialState, propertyKey));
	}, [updatedState]);

	return state;
}

export {getString, getNewArray, useUpdatedItems};
