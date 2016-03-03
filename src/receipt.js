(function() {

	var Receipt = function(inputData) {
			this.inputData = inputData
		},
		receiptFn = Receipt.prototype

	receiptFn._separateData = function() {
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

	receiptFn._mergeData = function() {
		console.info(this._separateData())
	}

	receiptFn.getData = function() {
		this._mergeData()
	}

	window.Receipt = Receipt

}())