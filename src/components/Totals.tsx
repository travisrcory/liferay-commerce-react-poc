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

		productIndex ++
	}

	return (
		<>
			<ClayTable.Row>
				<ClayTable.Cell className="sticky-left-data" headingTitle>
					{LanguageKeys.TOTAL_QUANTITY}
				</ClayTable.Cell>

				<ClayTable.Cell></ClayTable.Cell>

				{totalQuantityRows}
			</ClayTable.Row>

			<ClayTable.Row>
				<ClayTable.Cell className="sticky-left-data" headingTitle>
					{LanguageKeys.TOTAL}
				</ClayTable.Cell>

				<ClayTable.Cell></ClayTable.Cell>

				{totalRows}
			</ClayTable.Row>

			<ClayTable.Row>
				<ClayTable.Cell className="sticky-left-data" headingTitle>
					{LanguageKeys.TOTAL_AGGREGATED_QUANTITY}
				</ClayTable.Cell>

				<ClayTable.Cell></ClayTable.Cell>

				{totalAggregatedQuantityRows}
			</ClayTable.Row>

			<ClayTable.Row>
				<ClayTable.Cell className="sticky-left-data" headingTitle>
					{LanguageKeys.NEXT_PRICE_BREAK}
				</ClayTable.Cell>

				<ClayTable.Cell></ClayTable.Cell>

				{nextPriceBreakRow}
			</ClayTable.Row>

			{showDiscountBox ? (
				<>
					<ClayTable.Row>
						<ClayTable.Cell
							className="sticky-left-data"
							headingTitle
						>
							{LanguageKeys.DISCOUNT}
						</ClayTable.Cell>

						<ClayTable.Cell></ClayTable.Cell>

						{discountRows}
					</ClayTable.Row>

					<ClayTable.Row>
						<ClayTable.Cell
							className="sticky-left-data"
							headingTitle
						>
							{LanguageKeys.DISCOUNTED_TOTAL}
						</ClayTable.Cell>

						<ClayTable.Cell></ClayTable.Cell>

						{discountedTotalsRows}
					</ClayTable.Row>
				</>
			) : null}
		</>
	);
};

export default Totals;
