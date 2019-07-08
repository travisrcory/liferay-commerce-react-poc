const Liferay: any = {
	Language: {
		get: (string: string): string => string
	}
}

export enum Status {
	DISCOUNT = 8,
	FINISHED = 3,
	FISCAL_APPROVER_1 = 6,
	FISCAL_APPROVER_2 = 7,
	IN_REVIEW = 2,
	ORDERING = 9,
	REMOVED = 4,
	REVIEW_VALIDATION = 5,
	RUNNING = 1,
	WAITING = 0,
}

export enum StoreType {
	LOCAL_SELL = '1',
	NRS = '2',
	PROGRAM = '0',
}

export enum StatusLanguageKeys {
	DISCOUNT = Liferay.Language.get('discount'),
	FINISHED = Liferay.Language.get('finished'),
	FISCAL_APPROVER_1 = Liferay.Language.get('fiscal-approver-1'),
	FISCAL_APPROVER_2 = Liferay.Language.get('fiscal-approver-2'),
	IN_REVIEW = Liferay.Language.get('in-review'),
	ORDERING = Liferay.Language.get('ordering'),
	REMOVED = Liferay.Language.get('removed'),
	REVIEW_VALIDATION = Liferay.Language.get('review-validation'),
	RUNNING = Liferay.Language.get('running'),
	WAITING = Liferay.Language.get('waiting'),
}
