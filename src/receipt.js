var Receipt = (function() {

	var promotionItems = DataModel.loadPromotionItems(),
		allItems = DataModel.loadAllItems(),
		_inputData

	return {
		getData: getData
	}

	function getData(inputData) {
		_inputData = inputData

		var mergedData = _mergeData(),
			orderInfo = OrderHandler.getOrder(mergedData, promotionItems, allItems),
			allTotal = 0,
			allSave = 0,
			orderItems = []

		_.each(orderInfo, function(orderItem) {
			orderItems.push(orderItem)
			allTotal += orderItem.total
			allSave += orderItem.save
		})

		return {
			orderItems: orderItems,
			allTotal: allTotal,
			allSave: allSave
		}
	}


	function _mergeData() {
		var newData = _separateData(),
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

	function _separateData() {
		var tempNormalItems = [],
			tempSpecialItems = []

		_.each(_inputData, function(item) {
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