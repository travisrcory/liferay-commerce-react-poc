import React, {useEffect} from 'react';

import MultiStep from './MultiStep';
import LanguageKeys from '../util/language';

import {IRenderParams} from '../util/interfaces';
import DemandCaptureTable from './DemandCaptureTable';

const AppComponent: React.FunctionComponent<IRenderParams> = ({
	accounts,
	demandCaptureEntry,
	loadingElementId,
	portletNamespace,
	products,
	reviewMatrixItems,
	updateOrderActionURL,
}) => {
	useEffect(() => {
		const loadingIndicator = document.getElementById(loadingElementId);

		if (loadingIndicator) {
			loadingIndicator.classList.add('hide');
		}
	}, []);

	return (
		<div>
			<MultiStep
				currentStep={demandCaptureEntry.currentPhase}
				totalSteps={demandCaptureEntry.totalPhases}
				labelPrefix={LanguageKeys.PHASE}
			/>

			<DemandCaptureTable
				accounts={accounts}
				portletNamespace={portletNamespace}
				products={products}
				reviewMatrixItems={reviewMatrixItems}
				// status={demandCaptureEntry.currentPhase}
				status={2}
				updateOrderActionURL={updateOrderActionURL}
			/>
		</div>
	);
};

export default AppComponent;
