(function() {

	var Receipt = function(inputData) {
		this.inputData = inputData
	}

	_.extend(Receipt.prototype, {
		_separateData: _separateData,
		_mergeData: _mergeData,
		getData: getData
	})

	function _separateData() {
		var tempNormalItems = [],
			tempSpecialItems = []

		_.each(this.inputData, function(item) {
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
		var newData = this._separateData(),
			mergedData = _.countBy(newData.normalItems)

		_.each(newData.specialItems, function(item) {
			var splitArr = _.split(item, '-'),
				newObj = {}

			newObj[splitArr[0]] = _.parseInt(splitArr[1])
			mergedData = _.mergeWith(mergedData, newObj, getSum)
			splitArr = null
		})

		function getSum(targetValue, srcValue) {
			if (targetValue) {
				return targetValue + srcValue
			}
		}

		return mergedData
	}

	function getData() {
		console.info(this._mergeData())
	}

	window.Receipt = Receipt

}())