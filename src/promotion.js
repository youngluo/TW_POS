PromotionHandler = (function() {

	var _allItems,
		_inputData

	return {
		getPromotionsData: getPromotionsData
	}

	function getPromotionsData(inputData, promotionItems, allItems) {
		var promotionsResult = []

		_allItems = allItems
		_inputData = inputData

		_.each(promotionItems, function(promotion) {
			var promotionItems = _.filter(promotion.barcodes, function(barcode) {
				return _inputData[barcode]
			})

			promotionsResult.push(_getPromotionDetails(promotion.type, promotionItems))
		})

		console.info(promotionsResult)
		return promotionsResult
	}

	function _getPromotionDetails(type, barcodes) {
		var promotionLists = []

		_.each(barcodes, function(barcode) {
			var productInfo = _.filter(_allItems, function(item) {
				return item.barcode == barcode
			})

			if (type == 'BUY_TWO_GET_ONE_FREE') {
				promotionLists.push(_buyTwoGetOneFree(productInfo[0], _inputData[barcode]))
			} else if (type == 'A_FIVE_PERCENT_DISCOUNT') {

			}
		})

		return {
			type: type,
			promotionLists: promotionLists
		}
	}

	function _buyTwoGetOneFree(productInfo, counts) {
		counts = Math.floor(counts / 3)
		return {
			name: productInfo.name,
			unit: productInfo.unit,
			counts: counts,
			save: counts * productInfo.price
		}
	}

	function _fivePercentDiscount(items) {

	}

}())