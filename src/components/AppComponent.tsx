import React, {useEffect, useState} from 'react';

import MultiStep from './MultiStep';
import LanguageKeys from '../util/language';

import {IRenderParams} from '../util/interfaces';
import DemandCaptureTable from './DemandCaptureTable';
import ClaySelect from '@clayui/select';
import {Status} from '../util/constants';
import {getString} from '../util/util';

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

		console.log('load');

		if (loadingIndicator) {
			loadingIndicator.classList.add('d-none');
		}
	}, [loadingElementId]);

	// FOR TESTING
	const getStatues = (): JSX.Element[] => {
		const options: JSX.Element[] = [];

		for (const status in Status) {
			if (!Number(status)) {
				options.push(
					<ClaySelect.Option
						key={`item-${status}`}
						label={status}
						value={Status[status]}
					/>
				);
			}
		}

		return options;
	};

	return (
		<div className="container-fluid">
			{/* FOR TESTING */}
			<div className="form-group">
				<label htmlFor={'statusSelect'}>{LanguageKeys.STATUS}</label>

				<ClaySelect
					aria-label={getString(LanguageKeys.STATUS)}
					id={'statusSelect'}
					onChange={e => setStatus(Number(e.currentTarget.value))}
					value={status}
				>
					{getStatues()}
				</ClaySelect>
			</div>

			<MultiStep
				currentStep={demandCaptureEntry.currentPhase}
				totalSteps={demandCaptureEntry.totalPhases}
				labelPrefix={LanguageKeys.PHASE}
			/>

			<DemandCaptureTable
				stores={stores}
				demandCaptureEntryId={demandCaptureEntry.demandCaptureEntryId}
				portletNamespace={portletNamespace}
				products={products}
				reviewMatrixItems={reviewMatrixItems}
				status={status}
				currentPhase={demandCaptureEntry.currentPhase}
				updateOrderActionURL={updateOrderActionURL}
			/>
		</div>
	);
};

export default AppComponent;
