import React from 'react';
import ReactDOM from 'react-dom';

import AppComponent from './components/AppComponent';

import {IRenderParams} from './util/interfaces';

export default function main({
	accounts,
	demandCaptureEntry,
	demandCaptureOrder,
	loadingElementId,
	portletElementId,
	portletNamespace,
	products,
	reviewMatrixItems,
	updateOrderActionURL,
}: IRenderParams) {
	accounts.forEach(account => (account.storesNumber = 10));

	const otherParams = {
		accounts,
		demandCaptureEntry,
		demandCaptureOrder,
		loadingElementId,
		portletElementId,
		portletNamespace,
		products,
		reviewMatrixItems,
		updateOrderActionURL,
	};

	ReactDOM.render(
		<AppComponent {...otherParams} />,
		document.getElementById(portletElementId)
	);
}
