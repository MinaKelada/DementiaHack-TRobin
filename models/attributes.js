//NOT FOLLOWING TEMPLATE
var mongoose = require('mongoose');
var attributeSchema = mongoose.Schema({
  attribute_name:{
    type:String,
    required:true
  }
});

var Attributes = module.exports = mongoose.model('attributes', attributeSchema);

module.exports.getAll = (callback,limit)=>{
  Attributes.find(callback).limit(limit);
}
module.exports.addAttribute = (attribute,callback)=>{
  Attributes.create(attribute,callback);
}
