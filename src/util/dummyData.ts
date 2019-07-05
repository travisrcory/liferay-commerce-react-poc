import {
	IReviewMatrixStore,
	IReviewMatrixProduct,
	IReviewMatrixItem,
} from './interfaces';

const getRandomInt = (min: number, max: number): number => {
	min = Math.ceil(min);
	max = Math.floor(max);

	return Math.floor(Math.random() * (max - min + 1)) + min;
};

const storeNameArray: string[] = [
	'Bargain Hunt',
	'Ben Franklin',
	'Bi-Mart',
	'Big Lots',
	"BJ's Wholesale Club",
	'Burlington Coat Factory',
	'Costco',
	"Dd's Discounts",
	'Dollar General',
	'Dollar Tree',
	'Family Dollar',
	'Five Below',
	"Fred's",
	'Fred Meyer',
	"Gabe's",
	'Gordmans',
	'Harbor Freight Tools',
	'HomeGoods',
	'HomeSense',
	'Kmart',
	'Marshalls',
	'Meijer',
	'National Stores',
	'Ocean State Job Lot',
	"Ollie's Bargain Outlet",
	'Renys',
	'Roses',
	'Ross Stores',
	'Shopko',
	'Stein Mart',
	'Target',
	'T.J. Maxx',
	'Tuesday Morning',
	'Walmart',
];

const products: IReviewMatrixProduct[] = [];
const reviewMatrixItems: IReviewMatrixItem[] = [];
const stores: IReviewMatrixStore[] = [];

for (let index = 0; index < storeNameArray.length; index++) {
	products.push({
		cpInstanceId: '36450',
		demandCaptureOrderProductId: `2${index}`,
		discount: 0,
		name: 'ABS Sensor',
		price: 50.0,
	});

	stores.push({
		demandCaptureOrderRegionId: `${getRandomInt(0, 10)}`,
		demandCaptureOrderStoreId: `1${index}`,
		name: storeNameArray[index],
		storesNumber: getRandomInt(0, 20),
		type: '0',
	});
}

for (let index = 0; index < products.length; index++) {
	for (let storeIndex = 0; storeIndex < stores.length; storeIndex++) {
		reviewMatrixItems.push({
			coverage: 0,
			demandCaptureOrderItemId: getRandomInt(0, 1000),
			demandCaptureOrderProductId: `2${index}`,
			demandCaptureOrderStoreId: `1${storeIndex}`,
			quantity: 0,
		});
	}
}

export {stores, products, reviewMatrixItems};
