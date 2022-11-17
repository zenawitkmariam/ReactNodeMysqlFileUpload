import React, {Fragment, useState,useEffect} from 'react'
import Axios from 'axios'
import Moment from 'moment';

const FileUpload = () => {
    
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState(null);
  const formatDate = Moment().format('YYYY-MM-DD');
  const [files, setFiles] = useState([]);

  
  useEffect( () => {
    Axios.get("http://localhost:3001/file").then((response)=>{
       if(response){
          setFiles(response.data);
       }
    })
  }, [files])
    // return getFile();
   
  const onChange = e => {
      setFile(e.target.files[0]);
      setFileName(file ? file.name : '');
      setFileSize(file ? file.size : null);
    
  };
 
  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try{
      if(file !== null ){
          if(fileSize > 10000){
            alert("File size must shouldn't be greater than 10mb");
            const formData = new FormData();
            setFile(null); setFileName(''); setFileSize(null); 
          } 
          else {
              const res = await Axios.post("http://localhost:3001/file", formData,{
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              });
              setFiles([...files, { FileName:fileName,FileSize:fileSize}]);
              setFile(null); setFileName(''); setFileSize(null); 
            }
     } 
     else { 
          alert("Please Select File") 
     }
    }
    catch (err) {
        if (err.response.status === 500) {
          setTimeout(function(){ alert('There was a problem with the server'); },10000);
        } else {
          setTimeout(function(){ alert(err.response.data.msg); },10000);
        }
    }
    
  };
  
  const DeleteItem= (file)=>{
    Axios.delete(`http://localhost:3001/file/${file.id}`).then((response)=>{
       if(response.status !== 200){
        alert("File Not Deleted") 
       }
    })
  }

  return (
    <Fragment>
        <form onSubmit={onSubmit} className="container my-5">
            <div className="container m-10 m-20 mb-3">
                 <input className="form-control form-control-sm" id="formFileSm" type="file" 
                 onChange={onChange} /> 
                {/* <label htmlFor="formFileSm" className="custom-file-label">{fileName}</label> */}
            </div>

            <input  type='submit' value='Upload' className='btn btn-primary btn-block ' />
        </form>
          
                  <div className='container '>
                        <table className="table ">
                            <thead>
                                <tr>
                                    <th scope="col">File Name</th>
                                    <th scope="col">Size</th>
                                    <th scope="col">Uploaded Date</th>
                                    <th scope="col"> Delete</th>
                                </tr>
                            </thead>
                            <tbody> 
                               { files.map((val,index)=>{
                                 return (
                                        <tr key={index}>
                                            <th >{val.FileName}</th>
                                            <th >{val.FileSize}</th>
                                            <th >{Moment(val.UploadDate).format('DD-MM-YYYY')}</th>
                                            <th >
                                              <i className="bi bi-trash" onClick={()=>DeleteItem(val)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                                  <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                                </svg>
                                              </i>
                                            </th>
                                        </tr>
                                   )
                                })
                               }
                            </tbody>
                        </table>
                    </div>
    </Fragment>
  )
}

export default FileUpload
