import React, {useState, OptionHTMLAttributes} from 'react';
import ClayTable from '@clayui/table';
import ClayButton from '@clayui/button';
import ClaySelect from '@clayui/select';

import ReviewMatrix from './ReviewMatrix';
import ReviewMatrixTotals from './ReviewMatrixTotals';

import ReviewMatrixItemContext from '../context/ReviewMatrixItemContext';
import StoreContext from '../context/StoreContext';

import LanguageKeys from '../util/language';

import {
	IReviewMatrixStore,
	IReviewMatrixProduct,
	IReviewMatrixItem,
} from '../util/interfaces';

import {getString} from '../util/util';
import RegionContext from '../context/RegionContext';
import {Status} from '../util/constants';

interface IDemandCaptureTableProps {
	stores: IReviewMatrixStore[];
	demandCaptureEntryId: number;
	portletNamespace: string;
	products: IReviewMatrixProduct[];
	reviewMatrixItems: IReviewMatrixItem[];
	status: number;
	currentPhase: number;
	updateOrderActionURL: string;
}

const DemandCaptureTable: React.FunctionComponent<IDemandCaptureTableProps> = ({
	stores: initialReviewMatrixAccountProp,
	demandCaptureEntryId,
	portletNamespace,
	products,
	reviewMatrixItems: initialReviewMatrixItemsProp,
	status,
	currentPhase,
	updateOrderActionURL,
}) => {
	const stores = useState(initialReviewMatrixAccountProp);
	const reviewMatrixItems = useState(initialReviewMatrixItemsProp);
	const [regionId, setRegionId] = useState<string | number>('all');

	const options: any = Array.from(
		new Set(
			initialReviewMatrixAccountProp.map(
				({demandCaptureOrderRegionId}) => demandCaptureOrderRegionId
			)
		)
	).map(demandCaptureOrderRegionId => ({
		label: demandCaptureOrderRegionId,
		value: demandCaptureOrderRegionId,
	}));

	const tableHeaderTitles = [
		LanguageKeys.STORE_NAME,
		LanguageKeys.STATUS,
		...products.map(product => product.name),
	];

	const shouldShowRegionSelect = () =>
		status !== Status.RUNNING && status !== Status.IN_REVIEW;

	return (
		<div>
			{shouldShowRegionSelect() ? (
				<div className="form-group">
					<label htmlFor={'regionSelect'}>
						{LanguageKeys.REGION}
					</label>

					<ClaySelect
						aria-label={getString(LanguageKeys.REGION)}
						id={'regionSelect'}
						onChange={e => setRegionId(e.currentTarget.value)}
						value={regionId}
					>
						<ClaySelect.Option
							key={'all'}
							label={getString(LanguageKeys.ALL)}
							value={'all'}
						/>

						{options.map((item: {value: any; label: any}) => (
							<ClaySelect.Option
								key={`${item.value}`}
								label={item.label}
								value={item.value}
							/>
						))}
					</ClaySelect>
				</div>
			) : null}

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
						<StoreContext.Provider value={stores}>
							<RegionContext.Provider
								value={[regionId, setRegionId]}
							>
								<ReviewMatrix currentPhase={currentPhase} />

								<ReviewMatrixTotals
									products={products}
									currentPhase={currentPhase}
								/>
							</RegionContext.Provider>
						</StoreContext.Provider>
					</ReviewMatrixItemContext.Provider>
				</ClayTable.Body>
			</ClayTable>

			<form
				action={updateOrderActionURL}
				className="form"
				data-fm-namespace={portletNamespace}
				id={`${portletNamespace}fm`}
				method="post"
				name={`${portletNamespace}fm`}
			>
				<input
					id={`${portletNamespace}reviewMatrixItemsJson`}
					name={`${portletNamespace}reviewMatrixItemsJson`}
					type="hidden"
					value={JSON.stringify(reviewMatrixItems[0])}
				/>

				<input
					id={`${portletNamespace}reviewMatrixstores`}
					name={`${portletNamespace}reviewMatrixstores`}
					type="hidden"
					value={JSON.stringify(stores[0])}
				/>

				<input
					id={`${portletNamespace}demandCaptureEntryId`}
					name={`${portletNamespace}demandCaptureEntryId`}
					type="hidden"
					value={`${demandCaptureEntryId}`}
				/>

				<ClayButton type="submit">{LanguageKeys.SUBMIT}</ClayButton>
			</form>
		</div>
	);
};

export default DemandCaptureTable;
