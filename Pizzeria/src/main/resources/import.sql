DELETE FROM Accounts;
DELETE FROM User_Address;
DELETE FROM Users;
INSERT INTO Users(name,surname,email,phonenumber,customer) VALUES ('Adam','Kowalski','akowalski@gmail.com','123456789','True');
INSERT INTO users(name,surname,email,phonenumber,customer) VALUES ('Tomasz','Saski','tsaski@gmail.com','123456788','False');
INSERT INTO Accounts(login,password,user_id) VALUES ('statek98','Rakieta19',1);
INSERT INTO Accounts(login,password,user_id) VALUES ('zawodnik90','Kubek12',2);
INSERT INTO User_Address(city,street,number,user_id) VALUES ('Gdynia','Wolna',4,1);
INSERT INTO User_Address(city,street,number,user_id) VALUES ('Sopot','Szybka',5,2);
