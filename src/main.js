var mapTable = {
	'BUY_TWO_GET_ONE_FREE': '买二赠一'
}

function main(inputItems) {
	var startLine = '***<没钱赚商店>购物清单***\n',
		gap = '----------------------\n',
		endLine = '**********************',
		orders = Receipt.getData(inputItems)

	var result = startLine + outputOrderInfo(orders.orderItems) + gap +
		outputPromotionInfo(orders.promotionItems) + '总计：' + orders.allTotal.toFixed(2) +
		'(元)\n' + '节省：' + orders.allSave.toFixed(2) + '(元)\n' + endLine

	console.log(result)
}

function outputOrderInfo(orderItems) {
	var orderText = ''

	_.each(orderItems, function(orderItem) {
		orderText += '名称：' + orderItem.name + '，数量：' + orderItem.counts + orderItem.unit +
			'，单价：' + orderItem.price.toFixed(2) + '(元)，小计：' + orderItem.total.toFixed(2) + '(元)'

		if (orderItem.type.indexOf('DISCOUNT') > -1) {
			orderText += '，节省：' + orderItem.save.toFixed(2) + '(元)'
		}
		orderText += '\n'
	})

	return orderText
}

function outputPromotionInfo(promotionItems) {
	var promotionText = '',
		gap = '----------------------\n'

	_.each(promotionItems, function(items, type) {
		promotionText += mapTable[type] + '商品：\n'
		_.each(items, function(item) {
			promotionText += '名称：' + item.name + '，数量：' + item.promotionCounts + item.unit + '\n'
		})
		promotionText += gap
	})

	return promotionText
}