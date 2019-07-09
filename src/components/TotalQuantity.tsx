import React from 'react';
import ClayTable from '@clayui/table';

import {IReviewMatrixItem, IReviewMatrixStore} from '../util/interfaces';
import {StoreType} from '../util/constants';

interface ITotalQuantityProps {
	stores: IReviewMatrixStore[];
	demandCaptureOrderProductId: number | string;
	index: number;
	currentPhase: number;
	reviewMatrixItems: IReviewMatrixItem[];
}

// TODO: Implement as FunctionComponent
// Using class to make use of shouldComponentUpdate to improve performance

class TotalQuantity extends React.Component<ITotalQuantityProps> {
	shouldComponentUpdate(nextProps: ITotalQuantityProps) {
		if (
			this.props.currentPhase !== nextProps.currentPhase ||
			this.props.reviewMatrixItems.length !==
				nextProps.reviewMatrixItems.length ||
			this.props.stores.length !== nextProps.stores.length
		) {
			return true;
		}

		let shouldComponentUpdate = false;
		for (
			let index = 0;
			index < this.props.reviewMatrixItems.length;
			index++
		) {
			if (
				this.props.reviewMatrixItems[index].quantity !==
					nextProps.reviewMatrixItems[index].quantity ||
				nextProps.stores[index].type == StoreType.NRS
			) {
				shouldComponentUpdate = true;
				break;
			}
		}

		return shouldComponentUpdate;
	}

	getProductTotalQuantity = () => {
		return this.props.reviewMatrixItems.reduce(
			(accumulator, reviewMatrixItem) => {
				return accumulator + Number(reviewMatrixItem.quantity);
			},
			0
		);
	};

	render() {
		return (
			<ClayTable.Cell className="text-right">
				{this.getProductTotalQuantity()}
			</ClayTable.Cell>
		);
	}
}

export default TotalQuantity;
