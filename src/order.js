var OrderHandler = (function() {

	var _allItems,
		_promotionItems

	return {
		getOrder: getOrder
	}

	//返回所购物品详细信息
	function getOrder(inputData, promotionItems, allItems) {
		var order = []

		_allItems = allItems
		_promotionItems = promotionItems

		_.each(inputData, function(counts, barcode) {
			order.push(_getDetailedData(counts, barcode))
		})

		return order
	}

	function _getDetailedData(counts, barcode) {
		var type = _getPromoionType(counts, barcode),
			basicPromotionData = {
				type: type,
				counts: counts
			},
			productItem = _.filter(_allItems, function(productItem) {
				return productItem.barcode == barcode
			})

		productItem = productItem[0]
		var promotionData = _getPromotionData(type, counts, productItem.price)

		return _.extend(productItem, basicPromotionData, promotionData)
	}

	function _getPromoionType(counts, barcode) {
		var type = 'none' //无优惠类型

		outerLoop:
			for (var i in _promotionItems) {
				var promotionObj = _promotionItems[i],
					promotionBarcodes = promotionObj.barcodes

				innerLoop:
					for (var j in promotionBarcodes) {
						promotionBarcode = promotionBarcodes[j]

						if (barcode == promotionBarcode) {
							type = promotionObj.type

							/*
							 * 如果为“买二赠一”优惠时，则跳出整个循环，
							 * 否则跳出当前循环，以保证优惠冲突时，只享受“买二赠一”优惠
							 */
							if (type == 'BUY_TWO_GET_ONE_FREE') {
								break outerLoop
							} else {
								break innerLoop
							}
						}
					}
			}

		return type
	}

	function _getPromotionData(type, counts, price) {
		var promotionData

		if (type == 'BUY_TWO_GET_ONE_FREE') {
			promotionData = _buyTwoGetOneFree(type, counts, price)
		} else if (type == 'A_FIVE_PERCENT_DISCOUNT') {
			promotionData = _fivePercentDiscount(type, counts, price)
		} else {
			promotionData = {
				total: counts * price,
				save: 0
			}
		}

		return promotionData
	}

	function _buyTwoGetOneFree(type, counts, price) {
		var promotionCounts = Math.floor(counts / 3),
			save = promotionCounts * price

		return {
			promotionCounts: promotionCounts,
			total: counts * price - save,
			save: save
		}
	}

	function _fivePercentDiscount(type, counts, price) {
		var discount = 0.05,
			save = counts * price * discount

		return {
			total: counts * price - save,
			save: save
		}
	}

}())