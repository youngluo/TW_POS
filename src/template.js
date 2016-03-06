_.templateSettings.interpolate = /{{([\s\S]+?)}}/g
var compiled = _.template('hello {{ user }}!')
console.info(compiled({ 'user': 'mustache' }))