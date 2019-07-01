import React, {useState} from 'react';
import ClayTable from '@clayui/table';
import ClayButton from '@clayui/button';

import ReviewMatrix from './ReviewMatrix';
import ReviewMatrixTotals from './ReviewMatrixTotals';

import ReviewMatrixItemContext from '../context/ReviewMatrixItemContext';

import LanguageKeys from '../util/language';

import {
	IReviewMatrixAccount,
	IReviewMatrixProduct,
	IReviewMatrixItem,
} from '../util/interfaces';
import ReviewMatrixAccountContext from '../context/ReviewMatrixAccountContext';

interface IDemandCaptureTableProps {
	accounts: IReviewMatrixAccount[];
	portletNamespace: string;
	products: IReviewMatrixProduct[];
	reviewMatrixItems: IReviewMatrixItem[];
	status: number;
	updateOrderActionURL: string;
}

const DemandCaptureTable: React.FunctionComponent<IDemandCaptureTableProps> = ({
	accounts: initialReviewMatrixAccountProp,
	products,
	reviewMatrixItems: initialReviewMatrixItemsProp,
	portletNamespace,
	status,
	updateOrderActionURL,
}) => {
	const accounts = useState(initialReviewMatrixAccountProp);
	const reviewMatrixItems = useState(initialReviewMatrixItemsProp);

	const tableHeaderTitles = [
		LanguageKeys.STORE_NAME,
		LanguageKeys.STATUS,
		...products.map(product => product.name),
	];

	return (
		<div>
			<ClayTable hover={false}>
				<ClayTable.Head>
					<ClayTable.Row>
						{tableHeaderTitles.map((tableHeaderTitle, index) => (
							<ClayTable.Cell
								key={`tableHeaderTitle${index}`}
								expanded
								headingCell
							>
								{tableHeaderTitle}
							</ClayTable.Cell>
						))}
					</ClayTable.Row>
				</ClayTable.Head>
				<ClayTable.Body>
					<ReviewMatrixItemContext.Provider value={reviewMatrixItems}>
						<ReviewMatrixAccountContext.Provider value={accounts}>
							<ReviewMatrix status={status} />
						</ReviewMatrixAccountContext.Provider>

						<ReviewMatrixTotals
							products={products}
							status={status}
						/>
					</ReviewMatrixItemContext.Provider>
				</ClayTable.Body>
			</ClayTable>

			<form action={updateOrderActionURL} name={`${portletNamespace}fm1`}>
				<input
					id={`${portletNamespace}reviewMatrixItems`}
					name={`${portletNamespace}reviewMatrixItems`}
					type="hidden"
					value={`${reviewMatrixItems[0]}`}
				/>
				<input
					id={`${portletNamespace}reviewMatrixAccounts`}
					name={`${portletNamespace}reviewMatrixAccounts`}
					type="hidden"
					value={`${accounts[0]}`}
				/>

				<ClayButton type="submit">{LanguageKeys.SUBMIT}</ClayButton>
			</form>
		</div>
	);
};

export default DemandCaptureTable;
