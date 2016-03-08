var Receipt = (function() {

	var promotionItems = DataModel.loadPromotionItems(),
		allItems = DataModel.loadAllItems(),
		result = {},
		_inputData

	return {
		getData: getData
	}

	function getData(inputData) {
		_inputData = inputData
		var mergedData = _mergeData()

		PromotionHandler.getPromotionsData(mergedData, promotionItems, allItems)
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

}())