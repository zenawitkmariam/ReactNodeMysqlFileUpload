
const File = require('./file')


module.exports = class FileController {
  static async getAllFiles(req, res){
    var results = await File.fetchAll();
    if (results) 
        res.send(results);
  }

  static async addFile(req,res){
    if (req.files === null) {
        res.send('No file uploaded');
      }
      const file = req.files.file;
      const name = file.name;
      const size = file.size;
      const date = new Date();

      file.mv(`${__dirname}/client/public/uploads/${file.name}`, err => {
        if (err) {
        //   return res.status(500).send(err);
        }
    
        res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
      });
      
      var result = await File.addFile(name,size,date);
      if(!result)  res.send("Failed to upload");

}
static async deleteFile(req,res){
    const id = req.params.id;
    if(id) {
        var result = await File.deleteFile(id);
        if(result) res.send("File deleted");
        else res.send("Failed to delete");
    }
}
}
