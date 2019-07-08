import React from 'react';
import ReactDOM from 'react-dom';

import AppComponent from './components/AppComponent';

import {
	IBaseModel,
	IDemandCaptureEntry,
	IDemandCaptureOrder,
} from './util/interfaces';

import {stores, products, reviewMatrixItems} from './util/dummyData';

import './index.css';
import * as serviceWorker from './serviceWorker';

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

const baseInfo: IBaseModel = {
	companyId: 12345,
	createDate: new Date(),
	groupId: 6789,
	modifiedDate: new Date(),
	userId: 42,
	userName: 'hunter2',
	uuid: 'test-test-test',
};

const demandCaptureEntry: IDemandCaptureEntry = {
	categoryId: 0,
	commerceUserSegmentEntryId: 0,
	currentPhase: 1,
	demandCaptureEntryId: 0,
	lastReminder: new Date(),
	reminderPattern: '1 | 2 | 5',
	status: 1,
	title: 'Sample Code',
	totalPhases: 2,
	type: 1,
	...baseInfo,
};

const demandCaptureOrder: IDemandCaptureOrder = {
	demandCaptureId: 1,
	demandCaptureOrderId: 1,
	fiscalApprover1UserId: 42,
	fiscalApprover2UserId: 42,
	marketUnitOrganizationId: 2,
	reviewerUserId: 4,
	...baseInfo,
};

const otherParams = {
	stores,
	demandCaptureEntry,
	demandCaptureOrder,
	loadingElementId: 'loadingIcon',
	portletNamespace: 'sampleCode_',
	products,
	reviewMatrixItems,
	updateOrderActionURL: 'javascript:;',
};

ReactDOM.render(
	<AppComponent {...otherParams} />,
	document.getElementById('root')
);