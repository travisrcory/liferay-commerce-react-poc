import {createContext, Dispatch, SetStateAction} from 'react';
import {IReviewMatrixStore} from '../util/interfaces';

const StoreContext = createContext<
	[IReviewMatrixStore[], Dispatch<SetStateAction<IReviewMatrixStore[]>>]
>([[], state => state]);

export default StoreContext;
