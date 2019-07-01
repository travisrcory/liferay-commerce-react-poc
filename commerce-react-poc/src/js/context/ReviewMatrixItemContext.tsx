import {createContext, Dispatch, SetStateAction} from 'react';
import {IReviewMatrixItem} from '../util/interfaces';

const ReviewMatrixItemContext = createContext<
	[IReviewMatrixItem[], Dispatch<SetStateAction<IReviewMatrixItem[]>>]
>([[], state => state]);

export default ReviewMatrixItemContext;
