import React, {useContext} from 'react';
import ClayTable from '@clayui/table';

import ReviewMatrixItemContext from '../context/ReviewMatrixItemContext';

import LanguageKeys from '../util/language';

import {IReviewMatrixProduct} from '../util/interfaces';
import ReviewMatrixTotal from './ReviewMatrixTotal';

interface IReviewMatrixTotalsProps {
	products: IReviewMatrixProduct[];
	status: number;
}

const ReviewMatrixTotals: React.FunctionComponent<IReviewMatrixTotalsProps> = ({
	products,
	status,
}) => {
	const [reviewMatrixItems] = useContext(ReviewMatrixItemContext);

	return status === 1 ? null : (
		<ClayTable.Row>
			<ClayTable.Cell headingTitle className="bg-transparent">
				{LanguageKeys.TOTAL}
			</ClayTable.Cell>

			<ClayTable.Cell className="bg-transparent"></ClayTable.Cell>

			{products.map(({demandCaptureOrderProductId, price}, index) => (
				<ReviewMatrixTotal
					reviewMatrixItems={reviewMatrixItems.filter(
						reviewMatrixItem =>
							reviewMatrixItem.demandCaptureOrderProductId ===
							demandCaptureOrderProductId
					)}
					demandCaptureOrderProductId={demandCaptureOrderProductId}
					price={price}
					index={index}
					key={`productTotal${demandCaptureOrderProductId}`}
				/>
			))}
		</ClayTable.Row>
	);
};

export default ReviewMatrixTotals;
