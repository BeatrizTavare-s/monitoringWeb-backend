import express from 'express'
import { routerMonitoring } from './routes/monitoringRouter'
import { routerSite } from './routes/siteRouter'
import ScheduleAvailabilityCheck from './services/scheduleAvailabilityCheckService'

const app = express()
const port = 3000


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(express.json());
app.use("/monitoring", routerMonitoring)
app.use("/sites", routerSite)


app.get('/', (req, res) => {
  res.send('Monitoring...')
})


const scheduleAvailabilityCheck = new ScheduleAvailabilityCheck();
scheduleAvailabilityCheck.startMonitoring();

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})