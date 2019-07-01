import {createContext, Dispatch, SetStateAction} from 'react';
import {IReviewMatrixAccount} from '../util/interfaces';

const ReviewMatrixAccountContext = createContext<
	[IReviewMatrixAccount[], Dispatch<SetStateAction<IReviewMatrixAccount[]>>]
>([[], state => state]);

export default ReviewMatrixAccountContext;
