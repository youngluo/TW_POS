describe('tw-pos', function() {

	var inputItems

	beforeEach(function() {
		inputItems = [
			'ITEM000000',
			'ITEM000000',
			'ITEM000000',
			'ITEM000005-6',
			'ITEM000002',
			'ITEM000002'
		]
	})

	it('correct format', function() {
		spyOn(console, 'log')

		main(inputItems)

		var expectOutput =
			'***<没钱赚商店>购物清单***\n' +
			'名称：可口可乐，数量：3瓶，单价：3.00(元)，小计：6.00(元)\n' +
			'名称：羽毛球，数量：6个，单价：1.00(元)，小计：4.00(元)\n' +
			'名称：苹果，数量：2斤，单价：5.50(元)，小计：10.45(元)，节省0.55(元)\n' +
			'----------------------\n' +
			'买二赠一商品：\n' +
			'名称：可口可乐，数量：1瓶\n' +
			'名称：羽毛球，数量：2个\n' +
			'----------------------\n' +
			'总计：20.45(元)\n' +
			'节省：5.55(元)\n' +
			'**********************'

		expect(console.log).toHaveBeenCalledWith(expectOutput);
	})

})