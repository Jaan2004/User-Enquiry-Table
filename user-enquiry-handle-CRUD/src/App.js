import logo from './logo.svg';
import './App.css';
import { Col, Container, Form, Row, Table } from 'react-bootstrap';
import { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

function App() {

let [formdata,setformdata]= useState(
  {
    uname:'',
    uemail:'',
    uphone:'',
    umessage:'',
    index:''
  }
)
let[userdata,setuserdata]=useState([])

let getvalue=(event)=>{
let olddata={...formdata}
let inputname=event.target.name; //uname
let inputvalue=event.target.value; //inputvalue like username
olddata[inputname]=inputvalue;
setformdata(olddata)
}

let handlesubmit=(event)=>{

  let currentuserformdata={
    uname:formdata.uname,
    uemail:formdata.uemail,
    uphone:formdata.uphone,
    umessage:formdata.umessage,

  }
  if(formdata.index===""){
let checkfilteruuser=userdata.filter((v)=>v.uemail==formdata.uemail || v.uphone==formdata.uphone)

if(checkfilteruuser.length==1){
  // alert("Email or Phone already Exists... ")
  toast.error("Email or Phone already Exists... ")
}
else {


let olduserdata=[...userdata,currentuserformdata]
console.log(olduserdata)
setuserdata(olduserdata)
setformdata(
  {
    uname:'',
    uemail:'',
    uphone:'',
    umessage:'',
    index:''

  }
)

}
}
else {
  
  let editindex=formdata.index;
  let olddata=userdata;
  let checkfilteruser=userdata.filter((v,i)=>v.uemail==formdata.uemail || v.uphone==formdata.uphone && i!=editindex)
if(checkfilteruser.length==0){
  olddata[editindex]['uname']=formdata.uname
  olddata[editindex]['uemail']=formdata.uemail
  olddata[editindex]['uphone']=formdata.uphone
  olddata[editindex]['umessage']=formdata.umessage
  setuserdata(olddata)
  setformdata(
    {
      uname:'',
      uemail:'',
      uphone:'',
      umessage:'',
      index:''
  
    }
  )
  
}
else {
  // alert("Email or Phone already Exists... ")
  toast.error("Email or Phone already Exists... ")
  
}
}

event.preventDefault();
}
let deleterow=(indexnumber)=>{
let filterdataafterdelete = userdata.filter((v,i)=> i!= indexnumber)
setuserdata(filterdataafterdelete)
toast.success("Data Delete ")
}

let editrow=(indexnumber)=>{
  let editdata=userdata.filter((v,i)=>i==indexnumber)[0]
  editdata['index']=indexnumber;
    setformdata(editdata)
  

}


  return (
   <Container fluid>
    <ToastContainer />
    <Container>
      <Row>
        <Col className='text-center py-5'>
        <h1>Enquiry Now</h1>

        </Col>
      </Row>
      <Row>
        <Col lg={5}>
        {userdata.length}
        <form onSubmit={handlesubmit}>
          <div className='pb-3'>
            <label className='form-label'>Name</label>
            <input type='text' onChange={getvalue} value={formdata.uname} name='uname' className='form-control'/>
          </div>
          <div className='pb-3'>
            <label className='form-label'>Email</label>
            <input type='text' onChange={getvalue}  value={formdata.uemail} name='uemail' className='form-control'/>
          </div>
          <div className='pb-3'>
            <label className='form-label'>Phone</label>
            <input type='text'onChange={getvalue}  value={formdata.uphone} name='uphone' className='form-control'/>
          </div>
          <div className='mb-3'>
            <label for="" className='form-label'>Message</label>
            <textarea type='text'onChange={getvalue}  value={formdata.umessage} name='umessage' className='form-control' id='' rows={3}/>
          </div>

          <button className='btn btn-primary'>

{
  formdata.index!=""? 'Update' : 'Save' 
}
          </button>
        </form>
        </Col>
       <Col>
       <Table striped bordered hover>
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Message</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {userdata.length>=1 ?
        
      userdata.map((obj,i)=>{
        return (
          <tr key={i}>
          <td>{i+1}</td>
          <td>{obj.uname}</td>
          <td>{obj.uemail}</td>
          <td>{obj.uphone}</td>
          <td>{obj.umessage}</td>
          <td>
            <button onClick={()=>deleterow(i)}>Delete</button>
            <button onClick={()=>editrow(i)}> Edit</button>
          </td>
        </tr>

        )
      }
      )
        
             :
          <tr>
            <td colSpan={6}>No data found</td>
          </tr>
}
        {/* <tr>
          <td>2</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr> */}

      </tbody>
    </Table>
       </Col>


      </Row>
    </Container>
   </Container>
  );
}

export default App;
