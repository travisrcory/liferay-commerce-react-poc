import React, {useContext, useEffect} from 'react';
import ClayTable from '@clayui/table';

import ReviewMatrixItemCells from './ReviewMatrixItemCells';
import ReviewMatrixItemContext from '../context/ReviewMatrixItemContext';
import ReviewMatrixAccountContext from '../context/ReviewMatrixAccountContext';

import ReviewMatrixAccountStatus from './ReviewMatrixAccountStatus';
import {AccountType} from '../util/constants';
import {IReviewMatrixAccount} from '../util/interfaces';

interface IReviewMatrixProps {
	status: number;
}

const ReviewMatrix: React.FunctionComponent<IReviewMatrixProps> = ({
	status,
}) => {
	const [accounts, setAccounts] = useContext(ReviewMatrixAccountContext);
	const [reviewMatrixItems, setReviewMatrixItems] = useContext(
		ReviewMatrixItemContext
	);

	useEffect(() => {
		return () => {
			const demandCaptureOrderAccountIds = accounts.map(account => {
				if (account.type === AccountType.NRS) {
					return account.demandCaptureOrderAccountId;
				}
			});

			setReviewMatrixItems(
				reviewMatrixItems.map(reviewMatrixItem => {
					if (
						demandCaptureOrderAccountIds.includes(
							reviewMatrixItem.demandCaptureOrderAccountId
						)
					) {
						reviewMatrixItem.quantity = 0;
					}

					return reviewMatrixItem;
				})
			);
		};
	}, [accounts]);

	const renderMatrixCells = (account: IReviewMatrixAccount) =>
		reviewMatrixItems.map((reviewMatrixItem, index) => {
			if (
				reviewMatrixItem.demandCaptureOrderAccountId ===
				account.demandCaptureOrderAccountId
			) {
				return (
					<ReviewMatrixItemCells
						key={`reviewMatrixItemCells-${reviewMatrixItem.demandCaptureOrderAccountId}-${reviewMatrixItem.demandCaptureOrderProductId}`}
						account={account}
						index={index}
						reviewMatrixItem={reviewMatrixItem}
						reviewMatrixItems={reviewMatrixItems}
						setStateFn={setReviewMatrixItems}
						status={status}
					/>
				);
			}
		});

	return (
		<>
			{accounts.map((account, index) => {
				return (
					<ClayTable.Row
						key={`accountRow
								${account.demandCaptureOrderAccountId}`}
					>
						<ClayTable.Cell headingTitle>
							{account.name}
						</ClayTable.Cell>

						<ReviewMatrixAccountStatus
							account={account}
							accounts={accounts}
							setStateFn={setAccounts}
							index={index}
						/>

						{renderMatrixCells(account)}
					</ClayTable.Row>
				);
			})}
		</>
	);
};

export default ReviewMatrix;
