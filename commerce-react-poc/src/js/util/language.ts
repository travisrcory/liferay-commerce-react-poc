declare namespace Liferay.Language {
	function get(key: string): any;
}

enum LanguageKeys {
	DISCOUNT = Liferay.Language.get('discount'),
	LOCAL_SELL = Liferay.Language.get('local-sell'),
	NRS = Liferay.Language.get('nrs'),
	PHASE = Liferay.Language.get('phase'),
	PROGRAM = Liferay.Language.get('program'),
	QUANTITY = Liferay.Language.get('quantity'),
	STATUS = Liferay.Language.get('status'),
	STORE_COVERAGE = Liferay.Language.get('store-coverage'),
	STORE_NAME = Liferay.Language.get('store-name'),
	STORE_STATUS = Liferay.Language.get('store-status'),
	SUBMIT = Liferay.Language.get('submit'),
	TOTAL = Liferay.Language.get('total'),
}

export default LanguageKeys;
