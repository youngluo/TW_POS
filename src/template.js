var demo = {
	orders: [{
		name: '苹果',
		counts: 1,
		unit: '个',
		price: 1.00,
		total: 1.00,
		save: 10
	}],
	promotions: [{
		type: 'BUY_TWO_GET_ONE_FREE',
		promotionLists: [{
			name: '苹果',
			counts: 1,
			unit: '个'
		}]
	}],
	allTotals: 10,
	allSaves: 5,
	translationTable: {
		BUY_TWO_GET_ONE_FREE: '买二赠一',
		A_FIVE_PERCENT_DISCOUNT: '95折'
	}
}

function renderTemplate(data) {
	var template = [
			'***<没钱赚商店>购物清单***\n',
			'<% _.forEach(orders, function(order){ %>',
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

	console.info(compiled(data))
}

renderTemplate(demo)