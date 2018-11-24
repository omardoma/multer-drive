# multer-drive

An Express.js Multer middleware Storage Engine for Google Drive.

## Installation

```sh
    npm install -S multer-drive
```

## Usage
```javascript
    const { google } = require('googleapis');
    const multer = require('multer');
    const multerDrive = require('multer-drive');
    const auth = new google.auth.JWT({
        email: '...',
        key: '...',
        scopes: ['https://www.googleapis.com/auth/drive'],
    });
    const upload = multer({
        storage: multerDrive(auth),
        // Rest of multer's options
    });

    /*
        Skip to the part where you define your routes
    */
    const router = express.Router();

    router.post('/upload', upload.single('file'), (req, res) => {
        if(!req.file) {
            return res.status(500).send('An error occurred while uploading your file');
        }
        res.status(200).send('Hurray! File was uploaded.');
    });

    router.post('/uploadMany', upload.array('photos', 6), (req, res) => {
        if(!req.files || !req.files.length) {
            return res.status(500).send('An error occurred while uploading your files');
        }
        res.status(200).send('Hurray! Files were uploaded.');
    });

    // Same applies for the rest of multer upload capabilities
```


&#9400; Omar Doma 2018
