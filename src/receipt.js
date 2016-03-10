var Receipt = (function() {

	var promotionItems = DataModel.loadPromotionItems(),
		allItems = DataModel.loadAllItems()

	return {
		getData: getData
	}

	function getData(inputData) {
		var orderInfo = OrderHandler.getOrder(_mergeData(inputData), promotionItems, allItems)
		return _statisticPromotionData(orderInfo)
	}

	function _statisticPromotionData(orderInfo) {
		var allTotal = 0,
			allSave = 0,
			orderItems = [],
			promotionItems = {}

		_.each(orderInfo, function(orderItem) {
			var type = orderItem.type,
				tempObj = {}

			orderItems.push(orderItem)
			allTotal += orderItem.total
			allSave += orderItem.save

			//统计赠送类商品的优惠信息
			if (type.indexOf('FREE') > -1) {
				tempObj.name = orderItem.name
				tempObj.promotionCounts = orderItem.promotionCounts
				tempObj.unit = orderItem.unit
				if (promotionItems[type]) {
					promotionItems[type].push(tempObj)
				} else {
					promotionItems[type] = [tempObj]
				}
			}
		})

		return {
			orderItems: orderItems,
			promotionItems: promotionItems,
			allTotal: allTotal,
			allSave: allSave
		}
	}

	function _mergeData(inputData) {
		var newData = _separateData(inputData),
			mergedData = _.countBy(newData.normalItems)

		_.each(newData.specialItems, function(item) {
			var splitArr = _.split(item, '-'),
				newObj = {}

			newObj[splitArr[0]] = _.parseInt(splitArr[1])
			mergedData = _.mergeWith(mergedData, newObj, _getSum)
		})

		return mergedData
	}

	function _getSum(targetValue, srcValue) {
		if (targetValue) {
			return targetValue + srcValue
		}
	}

	function _separateData(inputData) {
		var tempNormalItems = [],
			tempSpecialItems = []

		_.each(inputData, function(item) {
			if (item.indexOf('-') < 0) {
				tempNormalItems.push(item)
			} else {
				tempSpecialItems.push(item)
			}
		})

		return {
			normalItems: tempNormalItems,
			specialItems: tempSpecialItems
		}
	}

}())