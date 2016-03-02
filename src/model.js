var DataModel = (function() {

	function _productItem(barcode, name, unit, price) {
		return {
			barcode: barcode,
			name: name,
			unit: unit,
			price: price.toFixed(2)
		}
	}

	function _promotionItem(type, barcodes) {
		return {
			type: type,
			barcodes: barcodes || []
		}
	}

	return {
		loadAllItems: loadAllItems,
		loadPromotionItems: loadPromotionItems
	}

	function loadAllItems() {
		return [
			_productItem('ITEM000000', '可口可乐', '瓶', 3.00),
			_productItem('ITEM000001', '雪碧', '瓶', 3.00),
			_productItem('ITEM000002', '苹果', '斤', 5.50),
			_productItem('ITEM000003', '荔枝', '斤', 15.00),
			_productItem('ITEM000004', '电池', '个', 2.00),
			_productItem('ITEM000005', '方便面', '袋', 4.50)
		]
	}

	function loadPromotionItems() {
		return [
			_promotionItem('BUY_TWO_GET_ONE_FREE', [
				'ITEM000000',
				'ITEM000001',
				'ITEM000005'
			])
		]
	}

}())