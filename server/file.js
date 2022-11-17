const mysql = require('mysql');

const pool = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'root',
    database:'fileuploaddb'
  });
  
  module.exports = class File {
    constructor(FileName,FileSize,UploadDate){
      this.FileName=FileName;
      this.FileSize = FileSize;
      this.UploadDate = UploadDate;
    }

    static async fetchAll(){
      return new Promise (resolve => {
        pool.query("SELECT * FROM files",[],(error, result)=>{
            if(!error) resolve(result)
        })
      })
    }
    static async addFile(FileName,FileSize, UploadDate){
      return new Promise (resolve => {
        pool.query("INSERT INTO Files (FileName,FileSize, UploadDate) VALUES (?,?,?)",[FileName,FileSize, UploadDate],(error, result)=>{
            if(!error) resolve(true)
            else resolve(false)
        })
      })
    }
    static async deleteFile(id){
      return new Promise (resolve => {
        pool.query("DELETE FROM files WHERE id=?",[id],(error, result)=>{
            if(!error) resolve(true)
            else resolve(false)
        })
      })
    }

  };
  