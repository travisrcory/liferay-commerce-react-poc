import React from 'react';
import ClayTable from '@clayui/table';

import {IReviewMatrixItem} from '../util/interfaces';

interface INextPriceBreakProps {
	reviewMatrixItems: IReviewMatrixItem[];
}

const NextPriceBreak: React.FunctionComponent<INextPriceBreakProps> = ({
	reviewMatrixItems,
}) => {
	return (
		<ClayTable.Cell className="text-right">
			{reviewMatrixItems[0].quantity}
		</ClayTable.Cell>
	);
};

export default NextPriceBreak;
