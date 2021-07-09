const base = require('airtable').base('appUarGD6molILsFd');
const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 3000;

const app = express();
app.set('view engine','pug');
app.set('views', path.join(__dirname, 'views'));

let records;

app.get('/', async (req, res) => {

  if (records) {
    res.render('page', {
      records,
    })
  } else {
    try {
      records = await base('Business Hours').select({
        view: 'Grid view',
      }).firstPage();

    } catch(err) {
      console.log(err);
    }

    res.render('page', {
      records,
    })

    setTimeout(() => {
      records = null
    }, 10 * 1000)
  }
});

app.listen(PORT, () => {
  console.log('listening on server');
});
