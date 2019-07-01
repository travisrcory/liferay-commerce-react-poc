import React from 'react';
import ClayTable from '@clayui/table';

import LanguageKeys from '../util/language';

import {
	IReviewMatrixAccount,
	IReviewMatrixItem,
	IReviewMatrixProduct,
} from '../util/interfaces';

interface IReviewMatrixTotalProps {
	demandCaptureOrderProductId: number;
	price: number;
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
		let shouldComponentUpdate = false;
		for (
			let index = 0;
			index < this.props.reviewMatrixItems.length;
			index++
		) {
			if (
				this.props.reviewMatrixItems[index].quantity !==
				nextProps.reviewMatrixItems[index].quantity
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
		return (
			<ClayTable.Cell className="bg-transparent">
				{this.getProductTotal()}
			</ClayTable.Cell>
		);
	}
}

export default ReviewMatrixTotal;
