const express = require('express');
const router = express.Router();
const { upload, uploadFile, downloadFile } = require('../controllers/fileController');

router.post('/files', upload.single('file'), uploadFile);
router.get('/files/:uuid', downloadFile);

module.exports = router;
