const express = require ('express');
const ecommerceRouter = require('./ecommerceRoutes');
const passwordRouter = require('./passwordStrengthRoutes');

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) =>{
    res.send("For password stength go to (/passwordRoute/check-password) route! and For ecommerce go to (/ecommerceRoutes/) route!")

});

app.use('/ecommerceRoutes',ecommerceRouter);
app.use('/passwordRoute',passwordRouter);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
