class Apihelper {
  constructor(query, queryStr) {
    this.query = query;       // mongoose query
    this.queryStr = queryStr; // req.query
  }

  search() {
      const keyword = this.queryStr.keyword? {
        moviename: {
          $regex: this.queryStr.keyword,
          $options: "i",
        },
      }:{}

      this.query = this.query.find({...keyword});
    
    return this;
  }


}

export default Apihelper;
