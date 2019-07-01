import React from 'react';
import ClayTable from '@clayui/table';

import LanguageKeys from '../util/language';

import {IReviewMatrixAccount, IReviewMatrixItem} from '../util/interfaces';
import {AccountType} from '../util/constants';

interface IReviewMatrixItemCellsProps {
	account: IReviewMatrixAccount;
	index: number;
	reviewMatrixItem: IReviewMatrixItem;
	reviewMatrixItems: IReviewMatrixItem[];
	setStateFn: React.Dispatch<React.SetStateAction<IReviewMatrixItem[]>>;
	status: number;
}

// TODO: Implement as FunctionComponent
// Using class to make use of shouldComponentUpdate to improve performance

class ReviewMatrixItemCells extends React.Component<
	IReviewMatrixItemCellsProps
> {
	constructor(props: IReviewMatrixItemCellsProps) {
		super(props);
	}

	shouldComponentUpdate(nextProps: IReviewMatrixItemCellsProps) {
		return (
			this.props.reviewMatrixItem.quantity !==
				nextProps.reviewMatrixItem.quantity ||
			this.props.account.type === AccountType.NRS
		);
	}

	formatQuantity = (quantity: string | number) => {
		return this.props.status === 1
			? (Number(quantity) / this.props.account.storesNumber) * 100
			: Number(quantity);
	};

	handleQuantityChange = (
		value: string,
		setStateFn: React.Dispatch<React.SetStateAction<IReviewMatrixItem[]>>,
		reviewMatrixItem: IReviewMatrixItem,
		reviewMatrixItems: IReviewMatrixItem[],
		index: number
	) => {
		return setStateFn([
			...reviewMatrixItems.slice(0, index),
			Object.assign({}, reviewMatrixItem, {quantity: value}),
			...reviewMatrixItems.slice(index + 1),
		]);
	};

	render() {
		return (
			<ClayTable.Cell
				key={`reviewMatrixItemCell-${this.props.reviewMatrixItem.demandCaptureOrderAccountId}-${this.props.reviewMatrixItem.demandCaptureOrderProductId}`}
			>
				<div className="form-group">
					<label
						htmlFor={`reviewMatrixItem-${this.props.reviewMatrixItem.demandCaptureOrderAccountId}-${this.props.reviewMatrixItem.demandCaptureOrderProductId}`}
					>
						{LanguageKeys.QUANTITY}
					</label>

					<input
						className="form-control"
						id={`reviewMatrixItem-${this.props.reviewMatrixItem.demandCaptureOrderAccountId}-${this.props.reviewMatrixItem.demandCaptureOrderProductId}`}
						max={this.props.status === 1 ? 100 : ''}
						min={0}
						onChange={e =>
							this.handleQuantityChange(
								e.currentTarget.value,
								this.props.setStateFn,
								this.props.reviewMatrixItem,
								this.props.reviewMatrixItems,
								this.props.index
							)
						}
						placeholder=""
						readOnly={this.props.account.type === AccountType.NRS}
						type="number"
						value={this.formatQuantity(
							this.props.reviewMatrixItem.quantity
						)}
					/>
				</div>
			</ClayTable.Cell>
		);
	}
}

export default ReviewMatrixItemCells;
