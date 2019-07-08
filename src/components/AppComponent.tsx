import React, {useEffect, useState} from 'react';

import MultiStep from './MultiStep';

import {IRenderParams} from '../util/interfaces';
import DemandCaptureTable from './DemandCaptureTable';
import {Status} from '../util/constants';

const AppComponent: React.FunctionComponent<IRenderParams> = ({
	stores,
	demandCaptureEntry,
	loadingElementId,
	portletNamespace,
	products,
	reviewMatrixItems,
	updateOrderActionURL,
}) => {
	const [status, setStatus] = useState(demandCaptureEntry.currentPhase);

	useEffect(() => {
		const loadingIndicator = document.getElementById(loadingElementId);

		if (loadingIndicator) {
			loadingIndicator.classList.add('d-none');
		}
	});

	return (
		<div>
			<MultiStep
				currentStep={status}
				totalSteps={Status.ORDERING}
				setStateFn={setStatus}
			/>

			<DemandCaptureTable
				stores={stores}
				demandCaptureEntryId={demandCaptureEntry.demandCaptureEntryId}
				portletNamespace={portletNamespace}
				products={products}
				reviewMatrixItems={reviewMatrixItems}
				status={status}
				currentPhase={status}
				updateOrderActionURL={updateOrderActionURL}
			/>
		</div>
	);
};

export default AppComponent;
