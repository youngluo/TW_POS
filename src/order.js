var OrderHandler = (function() {

	var _allItems,
		_promotionItems

	return {
		getOrder: getOrder
	}

	function getOrder(inputData, promotionItems, allItems) {
		var order = []

		_allItems = allItems
		_promotionItems = promotionItems

		_.each(inputData, function(counts, barcode) {
			order.push(_analyzeData(counts, barcode))
		})

		return order
	}


	function _analyzeData(counts, barcode) {
		var type = 'none'

		_.each(_promotionItems, function(promotionObj) {
			_.each(promotionObj.barcodes, function(promotionBarcode) {
				if (barcode == promotionBarcode) {
					type = promotionObj.type
					return false
				}
			})
		})

		return _getPromotionData(type, counts, barcode)
	}


	function _getPromotionData(type, counts, barcode) {
		var promotionData,
			productItem = _.filter(_allItems, function(productItem) {
				return productItem.barcode == barcode
			})

		productItem = productItem[0]
		var price = productItem.price

		if (type == 'BUY_TWO_GET_ONE_FREE') {
			promotionData = _buyTwoGetOneFree(type, counts, price)
		} else if (type == 'A_FIVE_PERCENT_DISCOUNT') {
			promotionData = _fivePercentDiscount(type, counts, price)
		} else {
			promotionData = {
				type: type,
				counts: counts,
				total: counts * price,
				save: 0
			}
		}

		return _.extend(productItem, promotionData)
	}

	function _buyTwoGetOneFree(type, counts, price) {
		var promotionCounts = Math.floor(counts / 3),
			save = promotionCounts * price

		return {
			type: type,
			counts: counts,
			promotionCounts: promotionCounts,
			total: counts * price - save,
			save: save
		}
	}

	function _fivePercentDiscount(type, counts, price) {
		var discount = 0.05,
			save = counts * price * discount

		return {
			type: type,
			counts: counts,
			total: counts * price - save,
			save: save
		}
	}

}())