module.exports = {
  exportPathMap: function() {
    return {
      '/': { page: '/', query: { isStatic: true }  }
    }
  }
}