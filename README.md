# BookApp
Authors can upload books for users to access

Book app
Introduction
What does your API do? It consist of collections of books and their authors, and users been able to login to get books

Overview
Things that the developers should know about Performs Crud operation

Authentication
What is the preferred way of using the API? Make calls or request to recieve the information

Error Codes
What errors and status codes can a user expect? 404, 400

Rate limit
Is there a limit to the number of requests a user can send? No

POSTlocalhost:3000/signup
localhost:3000/signup
This is a post request for user registration. When the request is made it returns a status of 201 if it is successful

BODYraw
{
    "firstName" : "B new",
    "lastName" : "Colour",
    "email" : "d@gmail.com",
    "password" : "12345678",
    "repeat_password" : "12345678",
    "dateofbirth" : "01/01/2000",
    "phone" : "07039678903"

}


POSTlocalhost:3000/login
localhost:3000/login
This is a post request for user login. When the request is made it returns a status of 201 if it is successful



GETlocalhost:3000/author
localhost:3000/author
This is a get request to get all authors. When the request is made it returns a status of 200 if it is successful




GETlocalhost:3000/author/:id
localhost:3000/author/:id
This is a get request to get single author. When the request is made it returns a status of 200 if it is successful

PATH VARIABLES
id



POSTlocalhost:3000/author
localhost:3000/author
This is a get request to create an author. When the request is made it returns a status of 201 if it is successful




PUTlocalhost:3000/author/:id
localhost:3000/author/:id
This is a get request to update author. When the request is made it returns a status of 200 if it is successful

PATH VARIABLES
id



DELlocalhost:3000/author/:id
localhost:3000/author/:id
This is a get request to delete author. When the request is made it returns a status of 200 if it is successful

PATH VARIABLES
id



GETlocalhost:3000/book
localhost:3000/book
This is a get request to get all books. When the request is made it returns a status of 200 if it is successful




GETlocalhost:3000/book/:id
localhost:3000/book/:id
This is a get request to get single book. When the request is made it returns a status of 200 if it is successful

PATH VARIABLES
id



POSTlocalhost:3000/book
localhost:3000/book
This is a get request to create an book. When the request is made it returns a status of 201 if it is successful



PUTlocalhost:3000/book/:id
localhost:3000/book/:id
This is a get request to update book. When the request is made it returns a status of 200 if it is successful

PATH VARIABLES
id



DELlocalhost:3000/book/:id
localhost:3000/book/:id
This is a get request to delete book. When the request is made it returns a status of 200 if it is successful

PATH VARIABLES
id
