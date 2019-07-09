import React, {useState} from 'react';
import ClayTable from '@clayui/table';
import ClayButton from '@clayui/button';
import ClaySelect from '@clayui/select';

import Matrix from './Matrix';
import Totals from './Totals';

import ProductContext from '../context/ProductContext';
import RegionContext from '../context/RegionContext';
import ReviewMatrixItemContext from '../context/ReviewMatrixItemContext';
import StoreContext from '../context/StoreContext';

import LanguageKeys from '../util/language';

import {Status} from '../util/constants';

import {
	IReviewMatrixStore,
	IReviewMatrixProduct,
	IReviewMatrixItem,
} from '../util/interfaces';

import {getString, useUpdatedItems} from '../util/util';

declare global {
	interface Window {
		submitForm: (formId: string) => void;
	}
}

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

const numberFormat = new Intl.NumberFormat('en-us');

const DemandCaptureTable: React.FunctionComponent<IDemandCaptureTableProps> = ({
	stores: initialReviewMatrixStoresProp,
	demandCaptureEntryId,
	portletNamespace,
	products: initialReviewMatrixProductsProp,
	reviewMatrixItems: initialReviewMatrixItemsProp,
	status,
	currentPhase,
	updateOrderActionURL,
}) => {
	const [stores, setStores] = useState(initialReviewMatrixStoresProp);
	const [products, setProducts] = useState(initialReviewMatrixProductsProp);
	const [reviewMatrixItems, setReviewMatrixItems] = useState(
		initialReviewMatrixItemsProp
	);

	const updatedProducts: IReviewMatrixProduct[] = useUpdatedItems(
		initialReviewMatrixProductsProp,
		products,
		'discount'
	);
	const updatedReviewMatrixItems: IReviewMatrixItem[] = useUpdatedItems(
		initialReviewMatrixItemsProp,
		reviewMatrixItems,
		status === Status.RUNNING ? 'coverage' : 'quantity'
	);
	const updatedStores: IReviewMatrixStore[] = useUpdatedItems(
		initialReviewMatrixStoresProp,
		stores,
		'type'
	);

	const [regionId, setRegionId] = useState<string | number>('all');
	const [rejectForm, setRejectForm] = useState(false);

	const options: any = Array.from(
		new Set(
			initialReviewMatrixStoresProp.map(
				({demandCaptureOrderRegionId}) => demandCaptureOrderRegionId
			)
		)
	).map(demandCaptureOrderRegionId => ({
		label: demandCaptureOrderRegionId,
		value: demandCaptureOrderRegionId,
	}));

	const handleRejectButtonClick = (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		event.preventDefault();

		setRejectForm(true);

		window.submitForm(`${portletNamespace}fm`);
	};

	const productHeaderTuple: [string, number][] = products.map(product => [
		product.name,
		product.price,
	]);

	const shouldBeReadOnly = () =>
		status === Status.FISCAL_APPROVER_1 ||
		status === Status.FISCAL_APPROVER_2 ||
		status === Status.DISCOUNT;

	const shouldShowRegionSelect = () =>
		status === Status.REVIEW_VALIDATION ||
		status === Status.FISCAL_APPROVER_1 ||
		status === Status.FISCAL_APPROVER_2 ||
		status === Status.DISCOUNT;

	const shouldShowRejectButton = () =>
		status === Status.FISCAL_APPROVER_1 ||
		status === Status.FISCAL_APPROVER_2 ||
		status === Status.DISCOUNT;

	return (
		<div className="demand-capture-table">
			{shouldShowRegionSelect() ? (
				<div className="form-group mb-4">
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

			<ClayTable
				className="table-max-height-780"
				hover={false}
				bordered={true}
				headingNoWrap={true}
			>
				<ClayTable.Head>
					<ClayTable.Row>
						<ClayTable.Cell
							className="border-right sticky-left-data sticky-top-data"
							headingCell
						>
							{`${LanguageKeys.SEGMENT} - ${LanguageKeys.STORE_NAME} (${LanguageKeys.NUMBER_OF_STORES})`}
						</ClayTable.Cell>

						<ClayTable.Cell
							className="table-cell-expand store-status-header sticky-top-data"
							headingCell
						>
							{LanguageKeys.STORE_STATUS}
						</ClayTable.Cell>

						{productHeaderTuple.map(([name, price], index) => (
							<ClayTable.Cell
								key={`tableHeaderTitle${index}`}
								className="table-cell-expand text-right sticky-top-data"
								headingCell
							>
								{name} ${numberFormat.format(price)}
							</ClayTable.Cell>
						))}
					</ClayTable.Row>
				</ClayTable.Head>
				<ClayTable.Body>
					<ReviewMatrixItemContext.Provider
						value={[reviewMatrixItems, setReviewMatrixItems]}
					>
						<StoreContext.Provider value={[stores, setStores]}>
							<RegionContext.Provider
								value={[regionId, setRegionId]}
							>
								<Matrix
									currentPhase={currentPhase}
									readOnly={shouldBeReadOnly()}
								/>

								<ProductContext.Provider
									value={[products, setProducts]}
								>
									<Totals
										currentPhase={currentPhase}
										showDiscountBox={
											status === Status.DISCOUNT
										}
									/>
								</ProductContext.Provider>
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
					value={JSON.stringify(updatedReviewMatrixItems)}
				/>

				<input
					id={`${portletNamespace}rejectForm`}
					name={`${portletNamespace}rejectForm`}
					type="hidden"
					value={`${rejectForm}`}
				/>

				<input
					id={`${portletNamespace}reviewMatrixStores`}
					name={`${portletNamespace}reviewMatrixStores`}
					type="hidden"
					value={JSON.stringify(updatedStores)}
				/>

				<input
					id={`${portletNamespace}reviewMatrixProducts`}
					name={`${portletNamespace}reviewMatrixProducts`}
					type="hidden"
					value={JSON.stringify(updatedProducts)}
				/>

				<input
					id={`${portletNamespace}demandCaptureEntryId`}
					name={`${portletNamespace}demandCaptureEntryId`}
					type="hidden"
					value={`${demandCaptureEntryId}`}
				/>

				<ClayButton.Group spaced>
					<ClayButton type="submit">{LanguageKeys.SUBMIT}</ClayButton>

					{shouldShowRejectButton() ? (
						<ClayButton
							onClick={e => handleRejectButtonClick(e)}
							displayType="secondary"
						>
							{LanguageKeys.REJECT}
						</ClayButton>
					) : null}
				</ClayButton.Group>
			</form>
		</div>
	);
};

export default DemandCaptureTable;
