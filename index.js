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
      .create({
        resource: {
          name,
          mimeType,
        },
        media: {
          mimeType,
          body,
        },
      })
      .then(({ data }) => cb(null, {
        googleId: data.id,
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
