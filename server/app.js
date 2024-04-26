const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const fileupload = require('express-fileupload');

const app = express();
app.use(express.json());
app.use(cors());
app.use(fileupload());

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on the port number ${PORT}`));

// Configuration (MONGODB)
var curl = "mongodb+srv://dhanunjayp67:UYj2gEPo4fHZj1Ka@final.qtxvndt.mongodb.net/";
var client = new MongoClient(curl);

// TESTING
app.get('/klef/test', async function (req, res) {
    res.json("Koneru Lakshmaiah Education Foundation");
});

// REGISTRATION MODULE
app.post('/registration/signup', async function (req, res) {
    try {
        const conn = await client.connect();
        const db = conn.db('Final');
        const Pro = db.collection('Pro');
        const data = await Pro.insertOne(req.body);
        conn.close();
        res.json("Registered successfully...");
    } catch (err) {
        res.json(err).status(404);
    }
});

//TripRegistration
app.post('/Tripregistration/submit', async function (req, res) {
    try {
        const conn = await client.connect();
        const db = conn.db('Final');
        const Trip = db.collection('Trip');
        const data = await Trip.insertOne(req.body);
        conn.close();
        res.json("Registered successfully...");
    } catch (err) {
        res.json(err).status(404);
    }
});

//ContactUs module
app.post('/contactregistration/submit', async function (req, res) {
    try {
        const conn = await client.connect();
        const db = conn.db('Final');
        const contact = db.collection('contact');
        const data = await contact.insertOne(req.body);
        conn.close();
        res.json("Request Recieved");
    } catch (err) {
        res.json(err).status(404);
    }
});

// LOGIN MODULE
app.post('/login/signin', async function (req, res) {
    try {
        const conn = await client.connect();
        const db = conn.db('Final');
        const Pro = db.collection('Pro');
        const data = await Pro.count(req.body);
        conn.close();
        res.json(data);
    } catch (err) {
        res.json(err).status(404);
    }
});

//admin module
app.post('/admin/signin', async function (req, res) {
    try {
        const conn = await client.connect();
        const db = conn.db('Final');
        const Admin = db.collection('Admin');
        const data = await Admin.count(req.body);
        conn.close();
        res.json(data);
    } catch (err) {
        res.json(err).status(404);
    }
});

// HOME MODULE
app.post('/home/uname', async function(req, res){
    try
    {
        conn = await client.connect();
        db = conn.db('Final');
        Pro = db.collection('Pro');
        data = await Pro.find(req.body, {projection:{firstname: true, lastname: true}}).toArray();
        conn.close();
        res.json(data);
    }catch(err)
    {
        res.json(err).status(404);
    }
});

//FILE UPLOAD
app.post('/uploaddp', async function(req, res){
    try
    {
        if(!req.files)
            return res.json("File not found");

        let myfile = req.files.myfile;
        var fname = req.body.fname;
        myfile.mv('../src/images/photo/'+ fname +'.jpg', function(err){
            if(err)
                return res.json("File upload operation failed!");

            res.json("File uploaded successfully...");
        });
        conn = await client.connect();
        db = conn.db('Final');
        Pro = db.collection('Pro');
        data = await Pro.updateOne({emailid:fname},{$set:{imgurl:fname+'.jpg'}});
        conn.close();
    }catch(err)
    {
        res.json(err).status(404);
    }
});
//upload adhar
app.post('/uploadadhar', async function(req, res){
    try
    {
        if(!req.files)
            return res.json("File not found");

        let myfile = req.files.myfile;
        var aname = req.body.aname;
        myfile.mv('../src/images/adhar/'+ aname +'.pdf', function(err){
            if(err)
                return res.json("File upload operation failed!");

            res.json("File uploaded successfully...");
        });
        conn = await client.connect();
        db = conn.db('Final');
        Trip = db.collection('Trip');
        data = await Trip.updateOne({emailid:aname},{$set:{adharurl:aname+'.pdf'}});
        conn.close();
    }catch(err)
    {
        res.json(err).status(404);
    }
});



// FORGOT PASSWORD MODULE
app.post('/forgot-password', async function (req, res) {
    try {
        const conn = await client.connect();
        const db = conn.db('Final');
        const Pro = db.collection('Pro');

        const { email, newPassword } = req.body;

        const result = await Pro.updateOne(
            { emailid: email },
            { $set: { pwd: newPassword } }
        );

        if (result.modifiedCount > 0) {
            res.json({ message: "Password updated successfully." });
        } else {
            res.json({ message: "Email not found. Password update failed." });
        }

        conn.close();
    } catch (err) {
        res.json(err).status(404);
    }
});

//Menu Module
app.post('/home/menu', async function(req, res){
    try
    {
        conn = await client.connect();
        db = conn.db('Final');
        menu = db.collection('menu');
        data = await menu.find({}).sort({mid:1}).toArray();
        conn.close();
        res.json(data);
    }catch(err)
    {
        res.json(err).status(404);
    }
});

//Menus Module
app.post('/home/menus', async function(req, res){
    try
    {
        conn = await client.connect();
        db = conn.db('Final');
        menus = db.collection('menus');
        data = await menus.find(req.body).sort({smid:1}).toArray();
        conn.close();
        res.json(data);
    }catch(err)
    {
        res.json(err).status(404);
    }
});

//adminhome

app.post('/adminhome/amenu', async function(req, res){
    try
    {
        conn = await client.connect();
        db = conn.db('Final');
        amenu = db.collection('amenu');
        data = await amenu.find({}).sort({amid:1}).toArray();
        conn.close();
        res.json(data);
    }catch(err)
    {
        res.json(err).status(404);
    }
});

//Menus Module
app.post('/adminhome/amenus', async function(req, res){
    try
    {
        conn = await client.connect();
        db = conn.db('Final');
        amenus = db.collection('amenus');
        data = await amenus.find(req.body).sort({asmid:1}).toArray();
        conn.close();
        res.json(data);
    }catch(err)
    {
        res.json(err).status(404);
    }
});


app.post('/adminhome/uname', async function(req, res){
    try
    {
        conn = await client.connect();
        db = conn.db('Final');
        Admin = db.collection('Admin');
        data = await Admin.find(req.body, {projection:{firstname: true, lastname: true}}).toArray();
        conn.close();
        res.json(data);
    }catch(err)
    {
        res.json(err).status(404);
    }
});

app.get('/tripregistration/submit', async function (req, res) {
    try {
        const conn = await client.connect();
        const db = conn.db('Final');
        const Trip = db.collection('Trip');
        const data = await Trip.find({}).toArray();
        conn.close();
        res.json(data);
    } catch (err) {
        res.json(err).status(404);
    }
});

app.get('/userregistration/submit', async function (req, res) {
    try {
        const conn = await client.connect();
        const db = conn.db('Final');
        const Pro = db.collection('Pro');
        const data = await Pro.find({}).toArray();
        conn.close();
        res.json(data);
    } catch (err) {
        res.json(err).status(404);
    }
});

//view contactus
app.get('/viewcontact', async function (req, res) {
    try {
        const conn = await client.connect();
        const db = conn.db('Final');
        const contact = db.collection('contact');
        const data = await contact.find({}).toArray();
        conn.close();
        res.json(data);
    } catch (err) {
        res.json(err).status(404);
    }
});
//contactus deletion
app.delete('/contactus/delete/:email', async function (req, res) {
    try {
        const conn = await client.connect();
        const db = conn.db('Final');
        const contact = db.collection('contact');
        const data = await contact.deleteOne({ Email: req.params.email });
        conn.close();
        res.json("Request Received");
    } catch (err) {
        res.status(404).json(err);
    }
});


//user deletion 
app.delete('/userregistration/delete/:email', async function (req, res) {
    try {
        const conn = await client.connect();
        const db = conn.db('Final');
        const Pro = db.collection('Pro');
        const data = await Pro.deleteOne({ emailid: req.params.email });
        conn.close();
        res.json("Request Received");
    } catch (err) {
        res.status(404).json(err);
    }
});

//trip deletion 
app.delete('/tripregistration/delete/:email', async function (req, res) {
    try {
        const conn = await client.connect();
        const db = conn.db('Final');
        const trip = db.collection('trip');
        const data = await trip.deleteOne({ emailid: req.params.email });
        conn.close();
        res.json("Request Received");
    } catch (err) {
        res.status(404).json(err);
    }
});



//CHANGE PASSWORD
app.post('/cp/updatepwd', async function(req, res){
    try
    {
        conn = await client.connect();
        db = conn.db('Final');
        Pro = db.collection('Pro');
        data = await Pro.updateOne({emailid : req.body.emailid}, {$set : {pwd : req.body.pwd}});
        conn.close();
        res.json("Password has been updated");
    }catch(err)
    {
        res.json(err).status(404);
    }
});

//MY PROFILE MODULE
app.post('/myprofile/details', async function(req, res){
    try
    {
        conn = await client.connect();
        db = conn.db('Final');
        Pro = db.collection('Pro');
        data = await Pro.find(req.body).toArray();
        conn.close();
        res.json(data);
    }catch(err)
    {
        res.json(err).status(404);
    }
});
//check-email
// CHECK EMAIL MODULE
app.post('/check-email', async function (req, res) {
    try {
        const conn = await client.connect();
        const db = conn.db('Final');
        const Pro = db.collection('Pro');

        const { email } = req.body;

        const existingUser = await Pro.findOne({ emailid: email });

        if (existingUser) {
            res.json({ exists: true });
        } else {
            res.json({ exists: false });
        }

        conn.close();
    } catch (err) {
        res.json(err).status(404);
    }
});
