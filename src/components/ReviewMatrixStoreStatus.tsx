import React, {SetStateAction, OptionHTMLAttributes} from 'react';
import ClayTable from '@clayui/table';
import ClaySelect from '@clayui/select';

import LanguageKeys from '../util/language';

import {IReviewMatrixStore} from '../util/interfaces';
import {getString} from '../util/util';
import {Status} from '../util/constants';

const options: OptionHTMLAttributes<HTMLOptionElement>[] = [
	{
		label: getString(LanguageKeys.PROGRAM),
		value: '0',
	},
	{
		label: getString(LanguageKeys.LOCAL_SELL),
		value: '1',
	},
	{
		label: getString(LanguageKeys.NRS),
		value: '2',
	},
];

interface IReviewMatrixStoreStatusProps {
	store: IReviewMatrixStore;
	stores: IReviewMatrixStore[];
	index: number;
	setStateFn: React.Dispatch<SetStateAction<IReviewMatrixStore[]>>;
	currentPhase: number;
}

// TODO: Implement as FunctionComponent
// Using class to make use of shouldComponentUpdate to improve performance

class ReviewMatrixStoreStatus extends React.Component<
	IReviewMatrixStoreStatusProps
> {
	constructor(props: IReviewMatrixStoreStatusProps) {
		super(props);
	}

	handleStatusChange = (
		type: string,
		store: IReviewMatrixStore,
		stores: IReviewMatrixStore[],
		setStateFn: React.Dispatch<React.SetStateAction<IReviewMatrixStore[]>>,
		index: number
	) => {
		return setStateFn([
			...stores.slice(0, index),
			Object.assign({}, store, {type}),
			...stores.slice(index + 1),
		]);
	};

	shouldComponentUpdate(nextProps: IReviewMatrixStoreStatusProps) {
		return this.props.store.type !== nextProps.store.type;
	}

	render() {
		return (
			<ClayTable.Cell>
				<div className="form-group">
					<label htmlFor={'statusSelect' + this.props.index}>
						{LanguageKeys.STORE_STATUS}
					</label>

					{this.props.currentPhase === Status.RUNNING ? (
						<ClaySelect
							aria-label={getString(LanguageKeys.STORE_STATUS)}
							id={'statusSelect' + this.props.index}
							onChange={e =>
								this.handleStatusChange(
									e.currentTarget.value,
									this.props.store,
									this.props.stores,
									this.props.setStateFn,
									this.props.index
								)
							}
							value={this.props.store.type}
						>
							{options.map(item => (
								<ClaySelect.Option
									key={`${item.value}`}
									label={item.label}
									value={item.value}
								/>
							))}
						</ClaySelect>
					) : (
						<span>{this.props.store.type}</span>
					)}
				</div>
			</ClayTable.Cell>
		);
	}
}

export default ReviewMatrixStoreStatus;
