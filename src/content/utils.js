if ("undefined" == typeof(LiberUtils)) {
  var LiberUtils = {};
};

LiberUtils = {
    getTagsArray: function(strTags) {
        let result = [];
        if (strTags.length>0) {
            result = strTags.split(/\s+|,/);
            result = result.filter(function(tag){
               if (tag.trim().length==0)
                  return false;
               else
                  return true;
            });
        }
        return result;        
    },
    
    getTagsString: function(tags) {
      if (tags.length>0) {
        return tags.reduce(function(x,y,i,a) {
            return x + ", " + y;  
        });
      }
      else
        return "";
    }
}
