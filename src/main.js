var template = [
		'***<没钱赚商店>购物清单***\n',
		'<% _.forEach(orders, function(orderItem){ %>',
		'名称：<%- order.name %>，数量：<%- order.counts %><%- order.unit %>，',
		'单价：<%- order.price.toFixed(2) %>(元)，小计：<%- order.total.toFixed(2) %>(元)',
		'<% if(order.save){ %>，节省：<%- order.save.toFixed(2) %>(元)<% } %>\n',
		'<% }) %>',
		'<% _.forEach(promotions, function(promotion){ %>',
		'<% if(_.toLower(promotion.type).indexOf("discount") < 0){ %>',
		'----------------------\n',
		'<%- translationTable[promotion.type] %>商品：\n',
		'<% _.forEach(promotion.promotionLists, function(item){ %>',
		'名称：<%- item.name %>，数量：<%- item.counts %><%- item.unit %>\n',
		'<% })} }) %>',
		'----------------------\n',
		'总计：<%- allTotals.toFixed(2) %>(元)\n',
		'节省：<%- allSaves.toFixed(2) %>(元)\n',
		'**********************'
	],
	compiled = _.template(_.join(template, ''))


function renderData(orders) {
	var startLine = '***<没钱赚商店>购物清单***\n',
		gap = '----------------------\n',
		endLine = '**********************',
		orderText = '',
		promotionText = ''

	_.each(orders.orderItems, function(orderItem) {
		orderText += '名称：' + orderItem.name + '，数量：' + orderItem.counts + orderItem.unit +
			'，单价：' + orderItem.price.toFixed(2) + '(元)，小计：' + orderItem.total.toFixed(2) + '(元)'

		if (orderItem.type.indexOf('DISCOUNT') > -1) {
			orderText += '，节省：' + orderItem.save.toFixed(2) + '(元)'
		}

		orderText += '\n'

		if (orderItem.type.indexOf('FREE') > -1) {
	})

	console.info(orderText)

}

function main(inputItems) {
	var orders = Receipt.getData(inputItems)
	console.info(orders)
	renderData(orders)
}