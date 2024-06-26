const express = require('express');
const app = express();
const cors = require('cors');
const { find } = require('geo-tz');
var moment = require('moment-timezone');
const port = 3007

app.use(cors());

app.get('/', (req, res) => {
    res.send('HOI');
})

/**
 * @lng - долгота (37.6173)
 * @lat - широта (55.755826)
 * @time - дата в секундах (417992400)
 */
app.get('/utc', (req, res) => {
    const lng  = req.query.lng;
    const lat  = req.query.lat;
    const time  = req.query.time*1000;

    const tzName = find(lat, lng)[0];

    const dt = moment.tz(time, tzName);

    const data = {
      gmtOffset: dt.utcOffset()*60,
      dst: dt.isDST() ? 1 : 0,
      zoneName: tzName
    }
    res.json(data);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})