const express = require('express');
const app = express();
const mongoose = require('mongoose');

const ShortUrl = require('./Models/urlShortener.js');

mongoose.set('debug', true);
mongoose.connect('mongodb://localhost/urlShortner', {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

mongoose.connection
.on('open', () => console.log('DB is ready'));

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
  try {
    const urls = await ShortUrl.find({});
    res.render('index.ejs', {
      urls: urls
    });
  }catch(err){
    console.log(err);
  }
});

app.post('/short', async (req, res) => {
  console.log(req.body);
  try {
    const newUrl = await ShortUrl.create({full:req.body.url});
    await newUrl.save();
    res.json({ok:true});
  } catch(err){
    console.log(err);
    res.json({ok:false});
  }
});

app.get('/short/:item', async (req, res) => {
  const itemUrl = req.params.item;
  try {
    const item = await ShortUrl.findOne({short: itemUrl});
    if (!item){
    return res.status(404);
    } 
    item.clicks++;
    await item.save();
    res.redirect(item.full);
  } catch(err){
    console.log(err);
  }
});

app.listen(3000, () => {
  console.log('We on air');
});