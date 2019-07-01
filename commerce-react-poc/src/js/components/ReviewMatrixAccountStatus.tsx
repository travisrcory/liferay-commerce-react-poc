import React, {SetStateAction, OptionHTMLAttributes} from 'react';
import ClayTable from '@clayui/table';
import ClaySelect from '@clayui/select';

import LanguageKeys from '../util/language';

import {IReviewMatrixAccount} from '../util/interfaces';
import {getString} from '../util/util';

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

interface IReviewMatrixAccountStatusProps {
	account: IReviewMatrixAccount;
	accounts: IReviewMatrixAccount[];
	setStateFn: React.Dispatch<SetStateAction<IReviewMatrixAccount[]>>;
	index: number;
}

// TODO: Implement as FunctionComponent
// Using class to make use of shouldComponentUpdate to improve performance

class ReviewMatrixAccountStatus extends React.Component<
	IReviewMatrixAccountStatusProps
> {
	constructor(props: IReviewMatrixAccountStatusProps) {
		super(props);
	}

	handleStatusChange = (
		value: string,
		account: IReviewMatrixAccount,
		accounts: IReviewMatrixAccount[],
		setStateFn: React.Dispatch<
			React.SetStateAction<IReviewMatrixAccount[]>
		>,
		index: number
	) => {
		setStateFn([
			...accounts.slice(0, index),
			Object.assign({}, account, {type: value}),
			...accounts.slice(index + 1),
		]);
	};

	shouldComponentUpdate(nextProps: IReviewMatrixAccountStatusProps) {
		return this.props.account.type !== nextProps.account.type;
	}

	render() {
		return (
			<ClayTable.Cell>
				<div className="form-group">
					<label htmlFor={'statusSelect' + this.props.index}>
						{LanguageKeys.STORE_STATUS}
					</label>

					<ClaySelect
						aria-label={getString(LanguageKeys.STORE_STATUS)}
						id={'statusSelect' + this.props.index}
						onChange={e =>
							this.handleStatusChange(
								e.currentTarget.value,
								this.props.account,
								this.props.accounts,
								this.props.setStateFn,
								this.props.index
							)
						}
						value={this.props.account.type}
					>
						{options.map(item => (
							<ClaySelect.Option
								key={`${item.value}`}
								label={item.label}
								value={item.value}
							/>
						))}
					</ClaySelect>
				</div>
			</ClayTable.Cell>
		);
	}
}

export default ReviewMatrixAccountStatus;
