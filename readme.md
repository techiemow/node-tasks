# Nodejs- Day -2: Nodejs & Express.js

## Hall Booking API

**Deployed URL:https://node-tasks-2.onrender.com**

the task is to api for the Hall booking app for

### 1] Creating a room with details given in document

- **Post Method** is used to create a room with details given. 

- **https://node-tasks-2.onrender.com/createroom** this endpoint will be used to create a room using POST request.

- ![](./assests/createroom%20.png)

### 2] Booking a room with details given in document:*

- Here also **Post Method** is used to create a Book a specific room with details given.

- **https://node-tasks-2.onrender.com/mybooking**   this endpoint will be used to book a Room

![](./assests/mybooking.png)

### 3] List all rooms with Booked Data with details given in document:

- **GET method** is used to get all rooms details that are booked .

- **https://node-tasks-2.onrender.com/list_rooms_booked**     
- This endpoint will be used to list all rooms with Booked Data .

![](./assests/list_room_booked.png)


### 4] List all Customers with Booked Data with details given in document:

- **GET method** is used to get rooms details that each customer booked.

- **https://node-tasks-2.onrender.com/listCustomers** 

- This endpoint will be used to list rooms data of all the customers who booked a room

![](./assests/List_customer.png)    


![](./assests/List_customer%202.png)

### 5] List How many times a customer has booked the room with details given in document:

- **GET method** is used to get information about the how many times a specific customer has made a bookings.

- **https://node-tasks-2.onrender.com/eachCustomer**

- This endpoint will be used to tell how many times a customer has booked room 

- For example if Customer name is "Karun" there should be query within the API request like this **?Name=Karun** to get the customer information.

![](./assests/customer_booking.png)
