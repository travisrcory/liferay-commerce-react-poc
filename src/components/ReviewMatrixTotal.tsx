import React from 'react';
import ClayTable from '@clayui/table';

import {IReviewMatrixItem, IReviewMatrixStore} from '../util/interfaces';
import {StoreType} from '../util/constants';

interface IReviewMatrixTotalProps {
	stores: IReviewMatrixStore[];
	demandCaptureOrderProductId: number | string;
	price: number;
	currentPhase: number;
	index: number;
	reviewMatrixItems: IReviewMatrixItem[];
}

// TODO: Implement as FunctionComponent
// Using class to make use of shouldComponentUpdate to improve performance

class ReviewMatrixTotal extends React.Component<IReviewMatrixTotalProps> {
	constructor(props: IReviewMatrixTotalProps) {
		super(props);
	}

	shouldComponentUpdate(nextProps: IReviewMatrixTotalProps) {
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

	getProductTotal = () => {
		return this.props.reviewMatrixItems
			.reduce((accumulator, reviewMatrixItem) => {
				return (
					accumulator +
					Number(reviewMatrixItem.quantity) * this.props.price
				);
			}, 0)
			.toFixed(2);
	};

	render() {
		return <ClayTable.Cell>${this.getProductTotal()}</ClayTable.Cell>;
	}
}

export default ReviewMatrixTotal;
