DELETE FROM Accounts;
DELETE FROM Address;
DELETE FROM Orders;
DELETE FROM Users;
DELETE FROM Pizza;
DELETE FROM Drinks;
DELETE FROM Bakestyle;
INSERT INTO Users(name,surname,email,phonenumber,customer) VALUES ('Adam','Kowalski','akowalski@gmail.com','123456789','True');
INSERT INTO Users(name,surname,email,phonenumber,customer) VALUES ('Tomasz','Saski','tsaski@gmail.com','123456788','False');
INSERT INTO Accounts(login,password,user_id) VALUES ('statek98','Rakieta19',1);
INSERT INTO Accounts(login,password,user_id) VALUES ('zawodnik90','Kubek12',2);
INSERT INTO Address(city,street,number,user_id) VALUES ('Gdynia','Wolna',4,1);
INSERT INTO Address(city,street,number,user_id) VALUES ('Sopot','Szybka',5,2);
INSERT INTO Pizza(name,description,price,image) VALUES ('Margherita','Pizza Margherita (more commonly known in English as Margherita pizza) is a typical Neapolitan pizza, made with San Marzano tomatoes, mozzarella cheese, fresh basil, salt and extra-virgin olive oil',10.0,'https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/5802fab5-fdce-468a-a830-43e8001f5a72/Derivates/c00dc34a-e73d-42f0-a86e-e2fd967d33fe.jpg');
INSERT INTO Pizza(name,description,price,image) VALUES ('Salami','Salami Pizza, as the name suggests, is topped with several salami slices which are loved by several non-vegetarians across the world. Added with tomato and onion slices, this very filling pizza can be relished during brunch or dinner time',12.0,'https://www.unileverfoodsolutions.pl/dam/global-ufs/mcos/NEE/calcmenu/recipes/PL-recipes/general/pizza-salami-cacciatore/main-header.jpg');
INSERT INTO Pizza(name,description,price,image) VALUES ('Capricciosa','Pizza capricciosa is a style of pizza in Italian cuisine prepared with mozzarella cheese, Italian baked ham, mushroom, artichoke and tomato',14.0,'https://www.unileverfoodsolutions.pl/dam/global-ufs/mcos/NEE/calcmenu/recipes/PL-recipes/general/pizza-capriciosa/main-header.jpg');
INSERT INTO Pizza(name,description,price,image) VALUES ('Quattro Formaggi','Quattro Formaggi is a variety of Italian pizza topped with a combination of four kinds of cheese, as the name suggests. Traditionally, the cheeses should be mozzarella and three other, local cheeses, depending on the region, such as Gorgonzola, Fontina, and Parmigiano-Reggiano',15.0,'https://www.insidetherustickitchen.com/wp-content/uploads/2020/07/Quattro-formaggi-pizza-square-Inside-the-rustic-kitchen.jpg');
INSERT INTO Pizza(name,description,price,image) VALUES ('Veggie','When you want to jazz up your cheese pizza with color and texture, veggies are the perfect topping. And you’re only limited by your imagination. Everything from peppers and mushrooms, to eggplant and onions make for an exciting and tasty veggie pizza',15.0,'https://www.twopeasandtheirpod.com/wp-content/uploads/2021/03/Veggie-Pizza-8-500x375.jpg');
INSERT INTO Pizza(name,description,price,image) VALUES ('Hawaiian ','Pineapple might not be the first thing that comes to mind when you think pizza. But add in some ham and it creates an unexpectedly solid sweet and salty combination for this type of pizza',14.0,'https://www.jessicagavin.com/wp-content/uploads/2020/07/hawaiian-pizza-16-1200.jpg');
INSERT INTO Drinks(name,price) VALUES ('Coca-Cola',3.0);
INSERT INTO Drinks(name,price) VALUES ('Fanta',2.5);
INSERT INTO Drinks(name,price) VALUES ('Sprite',2.0);
INSERT INTO Bakestyle(name) VALUES ('Regular');
INSERT INTO Bakestyle(name) VALUES ('Bake Light');
INSERT INTO Bakestyle(name) VALUES ('Bake Extra Well');
INSERT INTO Pizzasize(name,diameter,pizzacostfactor) VALUES  ('Small',10,1.0);
INSERT INTO Pizzasize(name,diameter,pizzacostfactor) VALUES  ('Medium',12,1.25);
INSERT INTO Pizzasize(name,diameter,pizzacostfactor) VALUES  ('Large',14,1.5);
INSERT INTO Pizzasize(name,diameter,pizzacostfactor) VALUES  ('Family',16,1.75);
INSERT INTO Crust(crust,price) VALUES ('Thin',1.0);
INSERT INTO Crust(crust,price) VALUES ('Classic',1.5);
INSERT INTO Crust(crust,price) VALUES ('Thick',2.0);
INSERT INTO Cutstyle(name) VALUES ('Regular');
INSERT INTO Cutstyle(name) VALUES ('Cut Square');
INSERT INTO Cutstyle(name) VALUES ('Cut in 8');
INSERT INTO Cutstyle(name) VALUES ('Cut in 10');
INSERT INTO Cutstyle(name) VALUES ('Cut in 12');
INSERT INTO Sauces(name,price) VALUES ('Pesto',1.0);
INSERT INTO Sauces(name,price) VALUES ('Tomato',0.5);
INSERT INTO Sauces(name,price) VALUES ('Garlic Ranch Sauce',1.5);
INSERT INTO Sauces(name,price) VALUES ('Buffalo',1.0);
INSERT INTO Sauces(name,price) VALUES ('Hummus',0.5);
INSERT INTO Sauces(name,price) VALUES ('Marinara',1.0);
INSERT INTO ORDERS(user_id,pizza_id,bakestyle_id,crust_id,pizzasize_id,cutstyle_id,sauce_id,drink_id) VALUES (1,1,1,1,1,1,3,1);
INSERT INTO ORDERS(user_id,pizza_id,bakestyle_id,crust_id,pizzasize_id,cutstyle_id,sauce_id,drink_id) VALUES (1,2,2,2,2,2,4,2);
INSERT INTO ORDERS(user_id,pizza_id,bakestyle_id,crust_id,pizzasize_id,cutstyle_id,sauce_id,drink_id) VALUES (1,2,2,3,3,3,2,3);





