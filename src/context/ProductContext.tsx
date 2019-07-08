import {createContext, Dispatch, SetStateAction} from 'react';
import {IReviewMatrixProduct} from '../util/interfaces';

const ProductContext = createContext<
	[IReviewMatrixProduct[], Dispatch<SetStateAction<IReviewMatrixProduct[]>>]
>([[], state => state]);

export default ProductContext;
