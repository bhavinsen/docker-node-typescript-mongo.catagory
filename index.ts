import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import { getAllCatagorys, setCatagorys, countCatagoryAmount, updateCatagoryPrice } from './controller/catagoryOperation.controller';
import "./models"
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())


app.get('/getallcatagorys', getAllCatagorys)
app.post('/addcatagory', setCatagorys)
app.get('/countcatagoryamount', countCatagoryAmount)
app.get('/updatecatagoryprice', updateCatagoryPrice)


app.listen(PORT, () => console.log(`http://localhost:${PORT}`));