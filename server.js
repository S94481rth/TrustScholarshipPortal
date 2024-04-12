const express = require("express")
require("dotenv").config()
const mongoose = require("./middleware/db")
const cors = require("cors")
const app = express()
const PORT = process.env.PORT || 3000

const multer  = require('multer');
const { google } = require('googleapis');
const fs = require('fs');
const {Readable} = require('stream');
const Document = require("./models/DocumentSchema/Documents.model")

app.use(cors())
app.use(express.json())

// Bhargavas Code starts from here!
// ************
// ************
// ************
// ************
// ************
// ************
// ************
const credentials = require('./credentials.json');
const SCOPE = ['https://www.googleapis.com/auth/drive.metadata.readonly https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/drive.file']


const oAuth2Client = new google.auth.OAuth2(
    credentials.web.client_id,
    credentials.web.client_secret,
    credentials.web.redirect_uris[0]
);

// Set the OAuth2 access token
oAuth2Client.setCredentials({
    refresh_token: "1//0gNXnqELD8Fp6CgYIARAAGBASNwF-L9IrLRKi6EJtUMb90iBsh6qARFq2sTaxptnaW8N4eNmo44Y3mGRSF570b86PiOFQQrOA8vI",
    scope: 'https://www.googleapis.com/auth/drive',
});

const drive = google.drive({ version: 'v3', auth: oAuth2Client });

const storage = multer.memoryStorage();
const upload = multer({storage : storage});

setInterval(function(){
    oAuth2Client.refreshAccessToken((err, tokens) => {
    if (err) {
        console.error('Error refreshing access token:', err);
    } else {
    // Set the new access token on the OAuth2 client
        oAuth2Client.setCredentials({
            refresh_token: tokens.refresh_token,
            access_token: tokens.access_token,
            expiry_date : tokens.expiry_date
        });
    }
    })
}, 1800000)

//   Helper functions
async function uploadFile(file, userid) {
    // Create a readable stream from Multer's file buffer
    const fileStream = new Readable();
    fileStream.push(file.buffer);
    fileStream.push(null);
    const fileName = userid + '_' + file.fieldname;

    const fileMetadata = {
      name: fileName,
      mimeType: file.mimetype
    };
  
    const media = {
      mimeType: file.mimetype,
      body: fileStream // Use file buffer directly as ReadStream
    };
    
    try{
        const response = await drive.files.create({
            resource: fileMetadata,
            media: media,
            fields: 'id'
        });

        const fileId = response.data.id;
        return fileId;
    }catch(error){
        console.error('Error uploading file:', error);
        // throw error; 
        return "";
    }
}

function getFile(fileId, res) {
    drive.files.get({
      fileId: fileId,
      alt: 'media' // Specify 'media' to download file content
    }, { responseType: 'stream' }, (err, driveResponse) => {
      if (err) {
        console.error('Error downloading file:', err);
        res.status(500).send('Error downloading file.');
        return;
      }
  
      // Pipe the file content to the HTTP response
      driveResponse.data
        .on('error', err => {
          console.error('Error streaming file:', err);
          res.status(500).send('Error streaming file.');
        })
        .on('end', () => {
          res.status(200);
        })
        .pipe(res); // Send file content as HTTP response
    });
}

async function deleteFile(fileId) {

    try{
        await drive.files.delete({
            fileId: fileId
        });
        return true;
    }catch(error){
        console.log(error.message);
        return false;
    }
}
//Routes

app.get('/getAuthURL', (req, res) => {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPE,
    });
    console.log(authUrl);
    return res.send(authUrl);
});


app.post('/getToken', (req, res) => {
    if (req.body.code == null) return res.status(400).send('Invalid Request');
    oAuth2Client.getToken(req.body.code, (err, token) => {
        if (err) {
            console.error('Error retrieving access token', err);
            return res.status(400).send('Error retrieving access token');
        }
        res.send(token);
    });
});


app.put('/updateFile',upload.any(), async (req,res)=>{

    //validating the request
    let file;
    if(req.files){
        file = req.files[0];
    }
    else{
        return res.status(400).send('File is required');
    }

    const userid = req.body.userid;
    //deleting existing document
    try{
        const document = await Document.findOne({userid : userid});
        let fileId = document[file.fieldname];

        if(fileId !== ''){
            await deleteFile(fileId);
        }
        const key = file.fieldname;
        fileId = await uploadFile(file, userid);
        await Document.findOneAndUpdate({userid:userid}, {[key] : fileId}, {new:false, upsert:false});
        return res.status(200).json({message : 'File updated successfully'});
    }
    catch (error){
        return res.json({error : error.message});
    }

})


// upload multiple files to the database
app.post('/uploadFiles', upload.any(), async(req, res)=>{
    
    let document = {}

    //validating the request
    if(!req.body.userid){
        return res.status(400).send('userid field id required');
    }
    const userid = req.body.userid;

    if (!req.files || req.files.length === 0) {
        return res.status(400).send('No files uploaded.');
    }

    if(await Document.findOne({userid:userid}) === null){
        //uploading document to the database
        try{
            document.userid = userid;
            const uploadPromises = req.files.map(async file => {
                let field = file.fieldname;
                let fileId = await uploadFile(file, userid);
                document[field] = fileId;
            });

            await Promise.all(uploadPromises);
            const doc = new Document(document);

            // await collection.insertOne(document);
            await doc.save();
            return res.status(200).json({message : 'Files inserted successfully'});
        }
        catch (error){
            return res.json({error : error.message});
        }
    }else{
        try{
            const uploadPromises = req.files.map(async file => {
                const  field = file.fieldname;
                const fileId = await uploadFile(file, userid);
                await Document.findOneAndUpdate({userid:userid}, {[field] : fileId}, {new : false, upsert:false});
            })

            await Promise.all(uploadPromises);

            return res.status(200).json({message : "Files inserted successfully"});
        }catch(error){
            return res.json({error:error.message});
        }
        
    }

})


// upload single file to the database
app.post('/uploadFile', upload.any(), async(req, res)=>{
    
    let document = {}
    const userid = req.body.userid;
    //validating the request
    if(!userid){
        return res.status(400).send('userid field id required');
    }
    
    if (!req.files || req.files.length === 0) {
        return res.status(400).send('No files uploaded.');
    }

    //uploading document to the database
    const file = req.files[0];

    if(await Document.findOne({userid : userid}) === null){
        
        document = {};
        document.userid = userid;
        const field = file.fieldname;
        
        try{
            document[field] = await uploadFile(file, userid);
            const doc = new Document(document);
            await doc.save();
            return res.status(200).json({message : 'File inserted successfully'});
        }
        catch (error){
            return res.json({error : error.message});
        }
    }
    else{
        try{
            const field = file.fieldname;
            const fileId = await uploadFile(file, userid);
            await Document.findOneAndUpdate({userid : req.body.userid}, {[field] : fileId}, {new:false, upsert:false});

            return res.status(200).json({message : 'File inserted successfully'});
        }catch(error){
            return res.json({error:error.message});
        }
    }
})


//read file from database
app.get('/getFile',async (req, res) => {

    //validating the request
    if(!req.body.userid){
        return res.status(400).send('userid field is required');
    }
    if(!req.body.fileName){
        return res.status(400).send('fileName field is required');
    }


    const userid = req.body.userid;
    const fileName = req.body.fileName;
    let fileId  = '';

    try{
        const document = await Document.findOne({userid : userid});

        if(!document){
            return res.status(404).send("Incorrect userid");
        }
        
        if(document[fileName] === '' || document[fileName] === undefined){
            return res.send('No file to read');
        }
        fileId = document[fileName];

        getFile(fileId,  res);
        return;
    }catch(error){
        return res.json({error : error.message});
    }   
});

app.delete('/deleteFile', async (req,res)=>{

    //validating the request
    if(!req.body.userid){
        return res.status(400).send('userid field is required');
    }
    if(!req.body.fileName){
        return res.status(400).send('fileName field is required');
    }

    const userid = req.body.userid;
    const fileName = req.body.fileName;

    try{
        const document = await Document.findOne({userid : userid});
        
        if(document[fileName] === ''){
            return res.send("Please upload the file first");
        }
        else{
            const fileId = document[fileName];
            
            if(deleteFile(fileId)){
                await Document.findOneAndUpdate({userid:userid}, {[fileName] : ''}, {new:false, upsert:false});
                return res.status(200).send('File is deleted successfully');
            }
            else{
                return res.status(500).send("Could not delete file");
            }
        }
    }catch(error){
        return res.json({error : error.message});
    }
})
// ************
// ************
// ************
// ************
// ************
// ************
// ************
// Bhargavas Code ends here!!

const adminRoutes = require("./server/routes/adminRoutes")
app.use('/admin', adminRoutes)

const approvalRoutes = require("./server/routes/approvalRoutes")
app.use('/approve', approvalRoutes)

// const applicationRoutes = require("./server/routes/applicationRoutes")
const applicationRoutes = require("./server/routes/applicationRoutes")
app.use('/application', applicationRoutes)







app.listen(PORT, () => {
    console.log(`listening ON ${PORT}`)
})