exports.index = (req, res, next) => {
    //res.send('MCU');
    res.status(200).json({
      full_name:'Thanawat Prapassuwan'
     })
  }

exports.bio =  (req, res, next) => {
    //res.send('MCU');
    res.status(200).json({
      full_name:'Thanawat Prapassuwan',
      nickname:'NOCODEKING',
      hobby:'NOCODING',
      gitusername:"SEXYNOCODEKING"
     })
  }