String.prototype.customIncludes = function(substring) {
    if (typeof substring !== 'string') {
      throw new Error('Substring must be a string');
    }
  
    if (substring === '') {
      return true; // An empty string is always included
    }
  
    for (let i = 0; i <= this.length - substring.length; i++) {
      let match = true;
  
      for (let j = 0; j < substring.length; j++) {
        if (this[i + j].toLowerCase() !== substring[j].toLocaleLowerCase()) {
          match = false;
          break;
        }
      }
  
      if (match) {
        return true;
      }
    }
  
    return false;
  };
