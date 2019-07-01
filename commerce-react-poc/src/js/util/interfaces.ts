export interface IReviewMatrixAccount {
	demandCaptureOrderAccountId: number;
	commerceAccountId: number;
	name: string;
	storesNumber: number;
	type: string;
}

export interface IReviewMatrixProduct {
	demandCaptureOrderProductId: number;
	cpInstanceId: number;
	name: string;
	discount: number;
	price: number;
}

export interface IReviewMatrixItemDetail {
	demandCaptureOrderItemId: number;
	quantity: number;
}

export interface IReviewMatrixItem {
	demandCaptureOrderAccountId: number;
	demandCaptureOrderItemId: number;
	demandCaptureOrderProductId: number;
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
	accounts: IReviewMatrixAccount[];
	demandCaptureEntry: IDemandCaptureEntry;
	demandCaptureOrder: IDemandCaptureOrder;
	loadingElementId: string;
	portletElementId: string;
	portletNamespace: string;
	products: IReviewMatrixProduct[];
	reviewMatrixItems: IReviewMatrixItem[];
	updateOrderActionURL: string;
}
