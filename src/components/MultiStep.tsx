import React from 'react';
import classNames from 'classnames';
import { StatusLanguageKeys, Status } from '../util/constants';

interface Props {
	currentStep: number;
	labelPrefix?: any;
	totalSteps: number;
	setStateFn: React.Dispatch<React.SetStateAction<number>>
}

// Implemented through currentPhase and totalPhase, changing to the Full list of Status for testing.

const MultiStep: React.FunctionComponent<Props> = ({
	currentStep,
	labelPrefix = '',
	totalSteps,
	setStateFn
}) => {
	const getStepItems = () => {
		const stepItems: JSX.Element[] = [];

		let index = 0;

		while (index <= totalSteps) {
			stepItems.push(
				<li
					key={index}
					className={classNames(
						'multi-step-item',
						{'multi-step-item-expand': index != totalSteps},
						{complete: index < currentStep},
						{active: index === currentStep}
					)}
				>
					<div className="multi-step-divider"></div>
					<div className="multi-step-indicator">
						<div className="multi-step-indicator-label">
							{labelPrefix ? labelPrefix + ' ' : ''}

							{StatusLanguageKeys[Status[index] as any]}
						</div>
						<a
							className="multi-step-icon"
							href="javascript:;"
							onClick={e => setStateFn(Number(e.currentTarget.getAttribute('data-multi-step-icon')))}
							data-multi-step-icon={index}
						></a>
					</div>
				</li>
			);

			index++
		}

		return stepItems;
	};

	return (
		<ol className="multi-step-nav multi-step-indicator-label-bottom multi-step-item-fixed-width">
			{getStepItems()}
		</ol>
	);
};

export default MultiStep;
