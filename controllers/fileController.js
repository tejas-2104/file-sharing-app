const File = require('../models/file');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${uuidv4()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

const uploadFile = async (req, res) => {
    const file = new File({
        filename: req.file.filename,
        path: req.file.path,
        size: req.file.size,
        uuid: uuidv4()
    });

    try {
        await file.save();
        res.status(200).json({ file: `http://localhost:8080/files/${file.uuid}` });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const downloadFile = async (req, res) => {
    const file = await File.findOne({ uuid: req.params.uuid });
    if (!file) {
        return res.status(404).json({ error: 'File not found' });
    }
    res.download(file.path, file.filename);
};

module.exports = { upload, uploadFile, downloadFile };
