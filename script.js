const express = require("express")
const bodyparser = require("body-parser")
const app = express()
const {v4:uuidv4} = require("uuid")

const port = 4000;
app.use(bodyparser.json())



const roomdetails = [
    {   
        "RoomId": 1,
        "RoomName":"suite",
        "seats":2,
        "amenities":["wifi","AC","TV","Toiletries Stocked"],
        "price":500
    },
    {    
        "RoomId": 2,
        "RoomName":"Deluxe",
        "seats":4,
        "amenities":["wifi","AC","TV","Food"],
        "price":400
    },
    {   
        "RoomId": 3,
        "RoomName":"Normal",
        "seats":5,
        "amenities":["AC","TV","laundry"],
        "price":350
    }
];
const customerdetails = [
    {
        "RoomId": 1,
        "Name":"Karun",
        "Date": "24-10-2023",
        "StartTime":"1:00 AM",
        "EndTime":"5:00 PM"
    },
    {
        "RoomId": 2,
        "Name":"Jake",
        "Date": "19-11-2023",
        "StartTime":"10:00 AM",
        "EndTime":"4:00 PM"
    },
    {
        "RoomId": 3,
        "Name":"Karun",
        "Date": "26-10-2023",
        "StartTime":"10:00 AM",
        "EndTime":"3:00 PM"
    }
];
listOfCustomer = [];

app.get("/",(req,res)=>{
    console.log("server is working ")
    res.send("Welcome to Hallbooking Main Home Page")
})

const handleRooms = (req,res) =>{
   roomdetails.push(
    {
        RoomId: roomdetails.length+1,
        RoomName:req.body.RoomName,
        seats:req.body.seats,
        amenities:req.body.amenities,
        price:req.body.price
    }
   );
   res.send(roomdetails)
}

const handleBooking = (req,res) =>{
    customerdetails.push(
     {
         Name: req.body.Name,
         Date:req.body.Date,
        StartTime: req.body.StartTime,
        EndTime: req.body.EndTime,
        RoomId: customerdetails.length+1,
        bookingID: uuidv4(),
     }
    );
    res.send(customerdetails)
 }

app.post("/createroom",handleRooms)

app.post("/mybooking",handleBooking)

app.get("/list_rooms_booked", (req, res) => {
    const listOfRoomsBooked = [];

    // Loop through each customer booking
    customerdetails.forEach((eachbooking) => {
        // Find the corresponding room details for the booking
        const roomsbooked = roomdetails.find((room) => room.RoomId === eachbooking.RoomId);

        if (roomsbooked) {
            // If room details are found, add booking details to listOfRoomsBooked
            listOfRoomsBooked.push({
                RoomName: roomsbooked.RoomName,
                RoomId: roomsbooked.RoomId,
                Bookingstatus: "Booked",
                Name: eachbooking.Name,
                Date: eachbooking.Date,
                StartTime: eachbooking.StartTime,
                EndTime: eachbooking.EndTime,
            });
        }
    });

    // Send the list of booked rooms as the response
    res.send(listOfRoomsBooked);
});

app.get("/listCustomers",(req,res)=>{

    customerdetails.forEach((eachbooking) => {
        // Find the corresponding room details for the booking
        const roomsbooked = roomdetails.find((room) => room.RoomId === eachbooking.RoomId);

        if (roomsbooked) {
            // If room details are found, add booking details to listOfRoomsBooked
            listOfCustomer.push({
                RoomName: roomsbooked.RoomName,
                Customer_Name: eachbooking.Name,
                Date: eachbooking.Date,
                StartTime: eachbooking.StartTime,
                EndTime: eachbooking.EndTime,
            });
        }
    });
  
    res.send(listOfCustomer)

})

app.get("/eachCustomer", (req, res) => {
    const customerName = req.query.Name; // Extract the customer name from the query parameters

    // Check if the 'Name' query parameter is provided
    if (!customerName) {
        return res.status(400).send("Customer name (Name) is required in the query parameters.");
    }

    // Filter customerdetails for bookings matching the provided customer name (case-insensitive)
    const bookingsForCustomer = customerdetails.filter((eachbooking) =>
        eachbooking.Name.toLowerCase() === customerName.toLowerCase()
    );

    // Count the number of bookings for the specified customer
    const bookingCount = bookingsForCustomer.length;

    // If no bookings are found for the specified customer, return a 404 Not Found response
    if (bookingCount === 0) {
        return res.status(404).send(`No bookings found for ${customerName}.`);
    }

    // Prepare the response with booking details and counter
    const bookingDetails = bookingsForCustomer.map((eachbooking, index) => {
        const roomsbooked = roomdetails.find((room) => room.RoomId === eachbooking.RoomId);

        return {
            Counter: index + 1, // Increment index to start counter from 1
            RoomName: roomsbooked.RoomName,
          
            Date: eachbooking.Date,
            StartTime: eachbooking.StartTime,
            EndTime: eachbooking.EndTime,
            Bookingstatus: "Booked",
            Booking_id: uuidv4() // Generate a new UUID for the booking ID
        };
    });

    // Send the booking details array as the response
    res.send({
        Customer_Name: customerName,
        TotalBookings: bookingCount,
        Bookings: bookingDetails
    });
});



app.listen(port,() =>{
    console.log(`server is running on port ${port}`)
})