import React, {useContext, useEffect} from 'react';
import ClayTable from '@clayui/table';

import ItemCells from './ItemCells';
import StoreStatus from './StoreStatus';

import ReviewMatrixItemContext from '../context/ReviewMatrixItemContext';
import RegionContext from '../context/RegionContext';
import StoreContext from '../context/StoreContext';

import {StoreType, Status} from '../util/constants';
import {IReviewMatrixStore} from '../util/interfaces';

interface IMatrixProps {
	currentPhase: number;
	readOnly: boolean;
}

const Matrix: React.FunctionComponent<IMatrixProps> = ({
	currentPhase,
	readOnly = false,
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
	}, [stores]);

	const renderMatrixCells = (store: IReviewMatrixStore) =>
		reviewMatrixItems.map((reviewMatrixItem, index) => {
			if (
				reviewMatrixItem.demandCaptureOrderStoreId ===
				store.demandCaptureOrderStoreId
			) {
				return (
					<ItemCells
						key={`reviewMatrixItemCells-${reviewMatrixItem.demandCaptureOrderStoreId}-${reviewMatrixItem.demandCaptureOrderProductId}`}
						store={store}
						index={index}
						reviewMatrixItem={reviewMatrixItem}
						reviewMatrixItems={reviewMatrixItems}
						setStateFn={setReviewMatrixItems}
						currentPhase={currentPhase}
						readOnly={store.type === StoreType.NRS || readOnly}
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
							<ClayTable.Cell
								className="sticky-left-data"
								headingTitle
							>
								{`${store.demandCaptureSegmentName} - ${store.name}(${store.storesNumber})`}
							</ClayTable.Cell>

							<StoreStatus
								store={store}
								stores={stores}
								setStateFn={setStores}
								currentPhase={currentPhase}
								index={index}
								readOnly={
									(currentPhase !== Status.RUNNING &&
										currentPhase !== Status.IN_REVIEW) ||
									readOnly
								}
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

export default Matrix;
