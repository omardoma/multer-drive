const { google } = require('googleapis');

class DriveStorage {
  constructor(opts) {
    this.drive = google.drive(Object.assign({ version: 'v3' }, opts));
  }

  _handleFile(
    req,
    { mimetype: mimeType, originalname: name, stream: body },
    cb,
  ) {
    this.drive.files
      .create(
        {
          resource: {
            name,
            mimeType,
          },
          media: {
            mimeType,
            body,
          },
        },
        {
          // Use the `onUploadProgress` event from Axios to track the
          // number of bytes uploaded to this point.
          onUploadProgress: (event) => {
            // Do something later on
          },
        },
      )
      .then(({ googleId }) => cb(null, {
        googleId,
      }),
      )
      .catch(err => cb(err, null));
  }

  _removeFile(req, { googleId: fileId }, cb) {
    this.drive.files.delete(
      {
        fileId,
      },
      cb,
    );
  }
}

module.exports = opts => new DriveStorage(opts);
