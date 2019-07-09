import React, {useContext} from 'react';
import ClayTable from '@clayui/table';

import NextPriceBreak from './NextPriceBreak';
import ItemTotal from './ItemTotal';
import TotalQuantity from './TotalQuantity';

import ReviewMatrixItemContext from '../context/ReviewMatrixItemContext';
import StoreContext from '../context/StoreContext';
import RegionContext from '../context/RegionContext';
import ProductContext from '../context/ProductContext';

import LanguageKeys from '../util/language';

import {IReviewMatrixItem, IReviewMatrixStore} from '../util/interfaces';
import DiscountInput from './DiscountInput';
import {getString} from '../util/util';

interface IRowProps {
	label: string;
	items: JSX.Element[];
}

const Row: React.FunctionComponent<IRowProps> = ({label, items}) => (
	<>
		<ClayTable.Row>
			<ClayTable.Cell
				className="border-right sticky-left-data"
				headingTitle
			>
				{label}
			</ClayTable.Cell>

			<ClayTable.Cell></ClayTable.Cell>

			{items}
		</ClayTable.Row>
	</>
);

interface ITotalsProps {
	currentPhase: number;
	showDiscountBox: boolean;
}

const Totals: React.FunctionComponent<ITotalsProps> = ({
	currentPhase,
	showDiscountBox = false,
}) => {
	const [reviewMatrixItems] = useContext(ReviewMatrixItemContext);
	const [stores] = useContext(StoreContext);
	const [products, setProducts] = useContext(ProductContext);
	const [regionId] = useContext(RegionContext);

	const getFilteredMatrixItems = (demandCaptureOrderProductId: string) => {
		const filteredMatrixItems = [];

		let index = 0;

		while (reviewMatrixItems[index]) {
			if (
				reviewMatrixItems[index].demandCaptureOrderProductId ===
				demandCaptureOrderProductId
			) {
				filteredMatrixItems.push(reviewMatrixItems[index]);
			}

			index++;
		}

		return filteredMatrixItems as IReviewMatrixItem[];
	};

	const getRefinedMatrixItems = (
		storeIds: React.ReactText[],
		filteredMatrixItems: IReviewMatrixItem[]
	) => {
		const refinedMatrixItems = [];

		let index = 0;

		while (filteredMatrixItems[index]) {
			if (
				storeIds.indexOf(
					filteredMatrixItems[index].demandCaptureOrderStoreId
				) !== -1
			) {
				refinedMatrixItems.push(filteredMatrixItems[index]);
			}

			index++;
		}

		return refinedMatrixItems;
	};

	const getFilteredStores = (filteredMatrixItems: IReviewMatrixItem[]) => {
		const filteredStores = [];

		const demandCaptureOrderStoreIds = filteredMatrixItems.map(
			reviewMatrixItem => reviewMatrixItem.demandCaptureOrderStoreId
		);

		let index = 0;

		while (stores[index]) {
			if (
				demandCaptureOrderStoreIds.indexOf(
					stores[index].demandCaptureOrderStoreId
				) !== -1 &&
				(regionId === 'all'
					? true
					: regionId === stores[index].demandCaptureOrderRegionId)
			) {
				filteredStores.push(stores[index]);
			}

			index++;
		}

		return filteredStores as IReviewMatrixStore[];
	};

	const discountRows: JSX.Element[] = [];
	const nextPriceBreakRow: JSX.Element[] = [];
	const totalAggregatedQuantityRows: JSX.Element[] = [];
	const totalQuantityRows: JSX.Element[] = [];
	const totalRows: JSX.Element[] = [];
	const discountedTotalsRows: JSX.Element[] = [];

	let productIndex = 0;

	while (products[productIndex]) {
		const product = products[productIndex];

		let filteredMatrixItems = getFilteredMatrixItems(
			product.demandCaptureOrderProductId as string
		);

		const filteredStores = getFilteredStores(filteredMatrixItems);

		const storeIds = filteredStores.map(
			store => store.demandCaptureOrderStoreId
		);

		const refinedMatrixItems = getRefinedMatrixItems(
			storeIds,
			filteredMatrixItems
		);

		nextPriceBreakRow.push(
			<NextPriceBreak
				key={`productTotal${product.demandCaptureOrderProductId}`}
				reviewMatrixItems={refinedMatrixItems}
			/>
		);

		totalAggregatedQuantityRows.push(
			<TotalQuantity
				currentPhase={currentPhase}
				demandCaptureOrderProductId={
					product.demandCaptureOrderProductId
				}
				index={productIndex}
				key={`productTotalQuantity${product.demandCaptureOrderProductId}`}
				reviewMatrixItems={refinedMatrixItems}
				stores={filteredStores}
			/>
		);

		totalQuantityRows.push(
			<TotalQuantity
				currentPhase={currentPhase}
				demandCaptureOrderProductId={
					product.demandCaptureOrderProductId
				}
				index={productIndex}
				key={`productTotalQuantity${product.demandCaptureOrderProductId}`}
				reviewMatrixItems={refinedMatrixItems}
				stores={filteredStores}
			/>
		);

		totalRows.push(
			<ItemTotal
				currentPhase={currentPhase}
				demandCaptureOrderProductId={
					product.demandCaptureOrderProductId
				}
				index={productIndex}
				key={`productTotal${product.demandCaptureOrderProductId}`}
				price={product.price}
				reviewMatrixItems={refinedMatrixItems}
				stores={filteredStores}
			/>
		);

		if (showDiscountBox) {
			discountRows.push(
				<DiscountInput
					index={productIndex}
					key={`discountInput${product.demandCaptureOrderProductId}`}
					product={product}
					products={products}
					setStateFn={setProducts}
				/>
			);

			discountedTotalsRows.push(
				<ItemTotal
					currentPhase={currentPhase}
					demandCaptureOrderProductId={
						product.demandCaptureOrderProductId
					}
					discount={product.discount}
					index={productIndex}
					key={`discountedTotal${product.demandCaptureOrderProductId}`}
					price={product.price}
					reviewMatrixItems={refinedMatrixItems}
					stores={filteredStores}
				/>
			);
		}

		productIndex++;
	}

	return (
		<>
			<Row
				label={getString(LanguageKeys.TOTAL_QUANTITY)}
				items={totalQuantityRows}
			/>

			<Row label={getString(LanguageKeys.TOTAL)} items={totalRows} />

			<Row
				label={getString(LanguageKeys.TOTAL_AGGREGATED_QUANTITY)}
				items={totalAggregatedQuantityRows}
			/>

			<Row
				label={getString(LanguageKeys.NEXT_PRICE_BREAK)}
				items={nextPriceBreakRow}
			/>

			<Row
				label={getString(LanguageKeys.TOTAL_AGGREGATED_QUANTITY)}
				items={totalAggregatedQuantityRows}
			/>

			{showDiscountBox ? (
				<>
					<Row
						label={getString(LanguageKeys.DISCOUNT)}
						items={discountRows}
					/>
					<Row
						label={getString(LanguageKeys.DISCOUNTED_TOTAL)}
						items={discountedTotalsRows}
					/>
				</>
			) : null}
		</>
	);
};

export default Totals;
