import React from 'react';
import ClayTable from '@clayui/table';

import {IReviewMatrixItem, IReviewMatrixStore} from '../util/interfaces';
import {StoreType} from '../util/constants';

interface IItemTotalProps {
	currentPhase: number;
	demandCaptureOrderProductId: number | string;
	discount?: number;
	index: number;
	price: number;
	reviewMatrixItems: IReviewMatrixItem[];
	stores: IReviewMatrixStore[];
}

// TODO: Implement as FunctionComponent
// Using class to make use of shouldComponentUpdate to improve performance

class ItemTotal extends React.Component<IItemTotalProps> {
	constructor(props: IItemTotalProps) {
		super(props);
	}

	shouldComponentUpdate(nextProps: IItemTotalProps) {
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
				this.props.discount !== nextProps.discount ||
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

	getProductTotal = () => {
		let total = this.props.reviewMatrixItems.reduce(
			(accumulator, reviewMatrixItem) => {
				return (
					accumulator +
					Number(reviewMatrixItem.quantity) * this.props.price
				);
			},
			0
		);

		if (this.props.discount) {
			total = total * (1 - this.props.discount);
		}

		return total.toFixed(2);
	};

	render() {
		return (
			<ClayTable.Cell className="text-right">
				${this.getProductTotal()}
			</ClayTable.Cell>
		);
	}
}

export default ItemTotal;
