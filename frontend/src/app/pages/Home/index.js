import React, { Component } from 'react';
// import Button from '../../components/ui/Button';
// import { Checkbox, Select, Input } from 'antd';
// import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons';
import axios from "axios";
import contant from '../../utils/constant';
// import { numberWithCommas, numberWithCommas2 } from '../../utils/functions';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      file: null,
      uploaded: false,
      fileId: null
    }
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onFormSubmit() {
    const formData = new FormData();
    formData.append('pdf', this.state.file);
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    };
    axios.post(contant.BACKEND_URL + "/upload", formData, config)
      .then((response) => {
        this.setState({
          uploaded: true,
          fileId: response.data.fileId
        })
      }).catch((error) => {
      });
  }

  onChange(e) {
    this.setState({ file: e.target.files[0] });
  }

  proccess() {
    if (this.state.fileId) {
      axios.post(contant.BACKEND_URL + "/processPDF", {fileId: this.state.fileId})
        .then((response) => {
          console.log(response.data.text[0].split(/[\.\?!]\s+/))
          // console.log(response.data.split('BOOKING REF:'))
          // 'DATE:'
        }).catch((error) => {
        });
    }
  }

  async componentDidMount() {
    let token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/signin';
    }
  }

  render() {
    return (
      <>
        <div className='home-page'>
          <div className='upload-box'>
            <div>
              <h3>
                Please upload the PDF file here.
              </h3>
              <input type="file" className="custom-file-input" name="pdf" onChange={this.onChange} />
              <button className="upload-button" onClick={() => this.onFormSubmit()}>
                {
                  this.state.uploaded ? 'Uploaded' : 'Upload'
                }
              </button>
            </div>
          </div>
          {
            this.state.uploaded && <button className="process-button" onClick={() => this.proccess()}>Process</button>
          }
        </div>
        {
          this.state.loading && (
            <div className='loading'>
              <h1>Loading...</h1>
            </div>
          )
        }
      </>
    )
  }
}

export default Home;