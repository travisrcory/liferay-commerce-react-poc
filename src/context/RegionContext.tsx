import {createContext, Dispatch, SetStateAction} from 'react';

const RegionContext = createContext<
	[number | string, Dispatch<SetStateAction<number | string>>]
>(['', state => state]);

export default RegionContext;
