const Liferay: any = {
	Language: {
		get: (string: string): string => string
	}
}

enum LanguageKeys {
	ALL = Liferay.Language.get('all'),
	DISCOUNT = Liferay.Language.get('discount'),
	DISCOUNTED_TOTAL = Liferay.Language.get('discounted-total'),
	LOCAL_SELL = Liferay.Language.get('local-sell'),
	NEXT_PRICE_BREAK = Liferay.Language.get('next-price-break'),
	NRS = Liferay.Language.get('nrs'),
	NUMBER_OF_STORES = Liferay.Language.get('number-of-stores'),
	PHASE = Liferay.Language.get('phase'),
	PROGRAM = Liferay.Language.get('program'),
	QUANTITY = Liferay.Language.get('quantity'),
	REGION = Liferay.Language.get('region'),
	REJECT = Liferay.Language.get('reject'),
	STATUS = Liferay.Language.get('status'),
	STORE_COVERAGE = Liferay.Language.get('store-coverage'),
	STORE_NAME = Liferay.Language.get('store-name'),
	STORE_STATUS = Liferay.Language.get('store-status'),
	SUBMIT = Liferay.Language.get('submit'),
	TOTAL = Liferay.Language.get('total'),
	TOTAL_AGGREGATED_QUANTITY = Liferay.Language.get(
		'total-aggregated-quantity'
	),
	TOTAL_QUANTITY = Liferay.Language.get('total-quantity'),
}

export default LanguageKeys;
