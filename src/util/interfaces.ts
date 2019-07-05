export interface IReviewMatrixStore {
	demandCaptureOrderRegionId: number | string;
	demandCaptureOrderStoreId: number | string;
	name: string;
	storesNumber: number;
	type: string | number;
}

export interface IReviewMatrixProduct {
	cpInstanceId: number | string;
	demandCaptureOrderProductId: number | string;
	discount: number;
	name: string;
	price: number;
}

export interface IReviewMatrixItem {
	coverage: number;
	demandCaptureOrderItemId: number;
	demandCaptureOrderProductId: number | string;
	demandCaptureOrderStoreId: number | string;
	quantity: number;
}

export interface IBaseModel {
	companyId: number;
	createDate: Date;
	groupId: number;
	modifiedDate: Date;
	userId: number;
	userName: string;
	uuid: string;
}

export interface IDemandCaptureEntry extends IBaseModel {
	categoryId: number;
	commerceUserSegmentEntryId: number;
	currentPhase: number;
	demandCaptureEntryId: number;
	lastReminder: Date;
	reminderPattern: string;
	status: number;
	title: string;
	totalPhases: number;
	type: number;
}

export interface IDemandCaptureOrder extends IBaseModel {
	demandCaptureId: number;
	demandCaptureOrderId: number;
	fiscalApprover1UserId: number;
	fiscalApprover2UserId: number;
	marketUnitOrganizationId: number;
	reviewerUserId: number;
}

export interface IRenderParams {
	stores: IReviewMatrixStore[];
	demandCaptureEntry: IDemandCaptureEntry;
	demandCaptureOrder: IDemandCaptureOrder;
	loadingElementId: string;
	portletNamespace: string;
	products: IReviewMatrixProduct[];
	reviewMatrixItems: IReviewMatrixItem[];
	updateOrderActionURL: string;
}
