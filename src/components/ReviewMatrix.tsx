import React, {useContext, useEffect} from 'react';
import ClayTable from '@clayui/table';

import ReviewMatrixItemCells from './ReviewMatrixItemCells';
import ReviewMatrixItemContext from '../context/ReviewMatrixItemContext';
import StoreContext from '../context/StoreContext';

import ReviewMatrixStoreStatus from './ReviewMatrixStoreStatus';
import {StoreType} from '../util/constants';
import {IReviewMatrixStore} from '../util/interfaces';
import RegionContext from '../context/RegionContext';

interface IReviewMatrixProps {
	currentPhase: number;
}

const ReviewMatrix: React.FunctionComponent<IReviewMatrixProps> = ({
	currentPhase,
}) => {
	const [stores, setStores] = useContext(StoreContext);
	const [regionId] = useContext(RegionContext);
	const [reviewMatrixItems, setReviewMatrixItems] = useContext(
		ReviewMatrixItemContext
	);

	useEffect(() => {
		const demandCaptureOrderStoreIds = stores.map(store => {
			if (store.type === StoreType.NRS) {
				return store.demandCaptureOrderStoreId;
			}
		});

		setReviewMatrixItems(
			reviewMatrixItems.map(reviewMatrixItem => {
				if (
					demandCaptureOrderStoreIds.indexOf(
						reviewMatrixItem.demandCaptureOrderStoreId
					) !== -1
				) {
					reviewMatrixItem.quantity = 0;
					reviewMatrixItem.coverage = 0;
				}

				return reviewMatrixItem;
			})
		);
	}, [reviewMatrixItems, setReviewMatrixItems, stores]);

	const renderMatrixCells = (store: IReviewMatrixStore) =>
		reviewMatrixItems.map((reviewMatrixItem, index) => {
			if (
				reviewMatrixItem.demandCaptureOrderStoreId ===
				store.demandCaptureOrderStoreId
			) {
				return (
					<ReviewMatrixItemCells
						key={`reviewMatrixItemCells-${reviewMatrixItem.demandCaptureOrderStoreId}-${reviewMatrixItem.demandCaptureOrderProductId}`}
						store={store}
						index={index}
						reviewMatrixItem={reviewMatrixItem}
						reviewMatrixItems={reviewMatrixItems}
						setStateFn={setReviewMatrixItems}
						currentPhase={currentPhase}
					/>
				);
			}
		});

	return (
		<>
			{stores.map((store, index) => {
				if (
					regionId === 'all'
						? true
						: regionId === store.demandCaptureOrderRegionId
				) {
					return (
						<ClayTable.Row
							key={`storeRow-${store.demandCaptureOrderStoreId}`}
						>
							<ClayTable.Cell headingTitle>
								{store.name}
							</ClayTable.Cell>

							<ReviewMatrixStoreStatus
								store={store}
								stores={stores}
								setStateFn={setStores}
								currentPhase={currentPhase}
								index={index}
							/>

							{renderMatrixCells(store)}
						</ClayTable.Row>
					);
				} else {
					return null;
				}
			})}
		</>
	);
};

export default ReviewMatrix;
