import React from 'react';
import classNames from 'classnames';

interface Props {
	currentStep: number;
	labelPrefix?: any;
	totalSteps: number;
}

const MultiStep: React.FunctionComponent<Props> = ({
	currentStep,
	labelPrefix = '',
	totalSteps,
}) => {
	const getStepItems = () => {
		const stepItems: JSX.Element[] = [];

		for (let index: number = 1; index <= totalSteps; index++) {
			stepItems.push(
				<li
					key={index}
					className={classNames(
						'multi-step-item',
						{'multi-step-item-expand': index !== totalSteps},
						{complete: index < currentStep},
						{active: index === currentStep}
					)}
				>
					<div className="multi-step-divider"></div>
					<div className="multi-step-indicator">
						<div className="multi-step-indicator-label">
							{labelPrefix ? labelPrefix + ' ' : ''}
							{index}
						</div>
						<span
							className="multi-step-icon"
							data-multi-step-icon={index}
						></span>
					</div>
				</li>
			);
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
