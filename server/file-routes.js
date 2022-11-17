const express = require("express");
const router = express.Router();
const FileController = require("./file-controller");

router.get("/", FileController.getAllFiles);
router.post("/", FileController.addFile);
router.delete("/:id", FileController.deleteFile);

module.exports = router;