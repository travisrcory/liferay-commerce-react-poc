import React, {useContext} from 'react';
import ClayTable from '@clayui/table';

import ReviewMatrixItemContext from '../context/ReviewMatrixItemContext';

import LanguageKeys from '../util/language';

import {
	IReviewMatrixProduct,
	IReviewMatrixItem,
	IReviewMatrixStore,
} from '../util/interfaces';
import ReviewMatrixTotal from './ReviewMatrixTotal';
import ReviewMatrixTotalQuantity from './ReviewMatrixTotalQuantity';
import StoreContext from '../context/StoreContext';
import RegionContext from '../context/RegionContext';

interface IReviewMatrixTotalsProps {
	products: IReviewMatrixProduct[];
	currentPhase: number;
}

const ReviewMatrixTotals: React.FunctionComponent<IReviewMatrixTotalsProps> = ({
	products,
	currentPhase,
}) => {
	const [reviewMatrixItems] = useContext(ReviewMatrixItemContext);
	const [stores] = useContext(StoreContext);
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

	const nextPriceBreakRow: JSX.Element[] = [];
	const totalAggregatedQuantityRows: JSX.Element[] = [];
	const totalQuantityRows: JSX.Element[] = [];
	const totalRows: JSX.Element[] = [];

	products.map(({demandCaptureOrderProductId, price}, index) => {
		let filteredMatrixItems = getFilteredMatrixItems(
			demandCaptureOrderProductId as string
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
			<ReviewMatrixTotal
				stores={filteredStores}
				reviewMatrixItems={refinedMatrixItems}
				demandCaptureOrderProductId={demandCaptureOrderProductId}
				price={price}
				index={index}
				key={`productTotal${demandCaptureOrderProductId}`}
				currentPhase={currentPhase}
			/>
		);

		totalAggregatedQuantityRows.push(
			<ReviewMatrixTotal
				stores={filteredStores}
				reviewMatrixItems={refinedMatrixItems}
				demandCaptureOrderProductId={demandCaptureOrderProductId}
				price={price}
				index={index}
				key={`productTotal${demandCaptureOrderProductId}`}
				currentPhase={currentPhase}
			/>
		);

		totalQuantityRows.push(
			<ReviewMatrixTotalQuantity
				reviewMatrixItems={refinedMatrixItems}
				demandCaptureOrderProductId={demandCaptureOrderProductId}
				stores={filteredStores}
				index={index}
				key={`productTotalQuantity${demandCaptureOrderProductId}`}
				currentPhase={currentPhase}
			/>
		);

		totalRows.push(
			<ReviewMatrixTotal
				stores={filteredStores}
				reviewMatrixItems={refinedMatrixItems}
				demandCaptureOrderProductId={demandCaptureOrderProductId}
				price={price}
				index={index}
				key={`productTotal${demandCaptureOrderProductId}`}
				currentPhase={currentPhase}
			/>
		);
	});

	return (
		<>
			<ClayTable.Row>
				<ClayTable.Cell headingTitle>
					{LanguageKeys.TOTAL_QUANTITY}
				</ClayTable.Cell>

				<ClayTable.Cell></ClayTable.Cell>

				{totalQuantityRows}
			</ClayTable.Row>

			<ClayTable.Row>
				<ClayTable.Cell headingTitle>
					{LanguageKeys.TOTAL}
				</ClayTable.Cell>

				<ClayTable.Cell></ClayTable.Cell>

				{totalRows}
			</ClayTable.Row>

			<ClayTable.Row>
				<ClayTable.Cell headingTitle>
					{LanguageKeys.TOTAL_AGGREGATED_QUANTITY}
				</ClayTable.Cell>

				<ClayTable.Cell></ClayTable.Cell>

				{totalAggregatedQuantityRows}
			</ClayTable.Row>

			<ClayTable.Row>
				<ClayTable.Cell headingTitle>
					{LanguageKeys.NEXT_PRICE_BREAK}
				</ClayTable.Cell>

				<ClayTable.Cell></ClayTable.Cell>

				{nextPriceBreakRow}
			</ClayTable.Row>
		</>
	);
};

export default ReviewMatrixTotals;
