const { google } = require('googleapis');

class DriveStorage {
  constructor(opts) {
    this.drive = google.drive(Object.assign(opts, { version: 'v3' }));
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
        // Workaround axios' issue of streams incorrect backpressuring, issue: https://github.com/googleapis/google-api-nodejs-client/issues/1107
        { maxRedirects: 0 },
      )
      .then(({ data: { id: googleId } }) =>
        cb(null, {
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
