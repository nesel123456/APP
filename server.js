const express = require('express');
const app = express();
const port = 3306; 


app.use(express.json()); 

app.get('/', (req, res) => {
	    res.send('API работает!');
});

app.get('/locations', (req, res) => {
	    const locations = [
		            { 
				                id: 1, 
				                name: "Москва",
				                reviews: [
							                { id: 1, review: "Отличное место для прогулок!" },
							                { id: 2, review: "Немного холодно зимой, но очень красиво!" }
							            ]
				            },
		            { 
				                id: 2, 
				                name: "Санкт-Петербург",
				                reviews: [
							                { id: 3, review: "Очень красивый город, много достопримечательностей." },
							                { id: 4, review: "Зимой бывают сильные морозы, но город стоит того!" }
							            ]
				            }
		        ];
	    res.json(locations);
});

app.listen(PORT, () => {
	    console.log(`Сервер запущен на http://localhost:${PORT}`);
}):

