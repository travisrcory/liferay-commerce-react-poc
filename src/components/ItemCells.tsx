import React from 'react';
import ClayTable from '@clayui/table';
import classNames from 'classnames';

import LanguageKeys from '../util/language';

import {IReviewMatrixStore, IReviewMatrixItem} from '../util/interfaces';
import {StoreType, Status} from '../util/constants';

interface IItemCellsProps {
	store: IReviewMatrixStore;
	index: number;
	reviewMatrixItem: IReviewMatrixItem;
	reviewMatrixItems: IReviewMatrixItem[];
	setStateFn: React.Dispatch<React.SetStateAction<IReviewMatrixItem[]>>;
	currentPhase: number;
	readOnly: boolean;
}

// TODO: Implement as FunctionComponent
// Using class to make use of shouldComponentUpdate to improve performance

class ItemCells extends React.Component<IItemCellsProps> {
	constructor(props: IItemCellsProps) {
		super(props);
	}

	shouldComponentUpdate(nextProps: IItemCellsProps) {
		if (this.props.currentPhase !== nextProps.currentPhase) {
			return true;
		}

		return (
			(this.props.currentPhase === Status.RUNNING
				? this.props.reviewMatrixItem.coverage !==
				  nextProps.reviewMatrixItem.coverage
				: this.props.reviewMatrixItem.quantity !==
				  nextProps.reviewMatrixItem.quantity) ||
			this.props.reviewMatrixItem.quantity !==
				nextProps.reviewMatrixItem.quantity ||
			this.props.store.type === StoreType.NRS
		);
	}

	handleQuantityChange = (
		value: number,
		setStateFn: React.Dispatch<React.SetStateAction<IReviewMatrixItem[]>>,
		reviewMatrixItem: IReviewMatrixItem,
		reviewMatrixItems: IReviewMatrixItem[],
		index: number
	) => {
		return setStateFn([
			...reviewMatrixItems.slice(0, index),
			Object.assign(
				{},
				reviewMatrixItem,
				this.props.currentPhase === Status.RUNNING
					? {
							coverage: value / 100,
							quantity: Math.ceil(
								(value / 100) * this.props.store.storesNumber
							),
					  }
					: {quantity: value}
			),
			...reviewMatrixItems.slice(index + 1),
		]);
	};

	render() {
		return (
			<ClayTable.Cell
				key={`reviewMatrixItemCell-${this.props.reviewMatrixItem.demandCaptureOrderStoreId}-${this.props.reviewMatrixItem.demandCaptureOrderProductId}`}
			>
				<div
					className={classNames('form-group', {
						'coverage-container':
							this.props.currentPhase === Status.RUNNING,
					})}
				>
					{/* <label
						className='text-truncate'
						htmlFor={`reviewMatrixItem-${this.props.reviewMatrixItem.demandCaptureOrderStoreId}-${this.props.reviewMatrixItem.demandCaptureOrderProductId}`}
					>
						{this.props.currentPhase === Status.RUNNING
							? LanguageKeys.STORE_COVERAGE
							: LanguageKeys.QUANTITY}
					</label> */}

					<input
						className="form-control text-right"
						id={`reviewMatrixItem-${this.props.reviewMatrixItem.demandCaptureOrderStoreId}-${this.props.reviewMatrixItem.demandCaptureOrderProductId}`}
						max={
							this.props.currentPhase === Status.RUNNING
								? 100
								: undefined
						}
						maxLength={
							this.props.currentPhase === Status.RUNNING
								? 3
								: undefined
						}
						min={0}
						onChange={e =>
							this.handleQuantityChange(
								Number(e.currentTarget.value),
								this.props.setStateFn,
								this.props.reviewMatrixItem,
								this.props.reviewMatrixItems,
								this.props.index
							)
						}
						readOnly={this.props.readOnly}
						type="number"
						value={
							this.props.currentPhase === Status.RUNNING
								? this.props.reviewMatrixItem.coverage
									? this.props.reviewMatrixItem.coverage * 100
									: 0
								: this.props.reviewMatrixItem.quantity
						}
					/>

					{this.props.currentPhase === Status.RUNNING ? (
						<span className="percentage">%</span>
					) : null}
				</div>
			</ClayTable.Cell>
		);
	}
}

export default ItemCells;
