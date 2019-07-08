import React from 'react';
import ClayTable from '@clayui/table';

import {IReviewMatrixProduct} from '../util/interfaces';

interface IDiscountInputProps {
	products: IReviewMatrixProduct[];
	product: IReviewMatrixProduct;
	index: number;
	setStateFn: React.Dispatch<React.SetStateAction<IReviewMatrixProduct[]>>;
}

const DiscountInput: React.FunctionComponent<IDiscountInputProps> = ({
	products,
	setStateFn,
	product,
	index,
}) => {
	const handleDiscountChange = (
		value: number,
		setStateFn: React.Dispatch<
			React.SetStateAction<IReviewMatrixProduct[]>
		>,
		product: IReviewMatrixProduct,
		products: IReviewMatrixProduct[],
		index: number
	) => {
		return setStateFn([
			...products.slice(0, index),
			Object.assign({}, product, {
				discount: value / 100,
			}),
			...products.slice(index + 1),
		]);
	};

	return (
		<ClayTable.Cell>
			<input
				className="form-control text-right"
				max={100}
				maxLength={3}
				min={0}
				onChange={e =>
					handleDiscountChange(
						Number(e.currentTarget.value),
						setStateFn,
						product,
						products,
						index
					)
				}
				type="number"
				value={product.discount * 100}
			/>

			<span className="percentage">%</span>
		</ClayTable.Cell>
	);
};

export default DiscountInput;
