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
      fileId: null,
      text: ''
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
      axios.post(contant.BACKEND_URL + "/processPDF/parse", { fileId: this.state.fileId })
        .then((response) => {
          // let paragraphs = response.data.wholeText.split(/\r?\n\r?\n/);
          let text = response.data.wholeText
          let html = '';

          text = text.replace(/ /g, '&nbsp;');
          html += '<p style="white-space: pre-wrap; font-family: Consolas, monospace;">' + paragraph + '</p>';

          this.setState({
            text: html
          })

          // paragraphs.forEach(function (paragraph) {
            // Replace regular spaces with non-breaking spaces

            // paragraph = paragraph.replace(/(MAYA TRAVEL|BOOKING REF:|DATE:)/g, '<strong>$1</strong>');
            // paragraph = paragraph.replace(/(SECTOR \d+)/g, '<strong>$1</strong>');
            // paragraph = paragraph.replace(/(FLIGHT TICKET\(S\)|GENERAL INFORMATION)/g, '<strong>$1</strong>');
            // // Make certain lines bold
            // paragraph = paragraph.replace(/(FLIGHT\s+RO\s+\d+\s+-\s+TAROM\s+.*\n-+\n)/g, '<strong>$1</strong>');


            // paragraph = paragraph.replace(/ /g, '&nbsp;');





            // // Split the paragraph into separate lines
            // let lines = paragraph.split(/\r?\n/);

            // // Replace regular spaces with non-breaking spaces
            // lines = lines.map(function (line) {
            //   return line.replace(/ /g, '&nbsp;');
            // });

            // // Make the third line bold
            // lines[3] = '<strong>' + lines[3] + '</strong>';

            // // Join the lines back together
            // paragraph = lines.join('<br>');

            // html += '<p style="white-space: pre-wrap; font-family: Consolas, monospace;">' + paragraph + '</p>';
          // });

         

          // this.parseTopContent(response.data.text[0])
          // const tmp1 = response.data.text[0].split(" BOOKING REF: ");
          // const travelName = tmp1[0].split('  ').join('').split('\n').join('');
          // const bookingRef = tmp1[1].substring(0, 6);
          // const str = tmp1[1].split(' DATE: ')[0].substring(8).split('  ').join('');
          // const date = tmp1[1].split(' DATE: ')[1].split('\nSECTOR 1')[0].split('  ').join('');
          // const city = tmp1[1].split('SECTOR 1 \n')[1].split('NAME/NAME MR')[0].split('  ').join('');
          // const country = tmp1[1].split('SECTOR 1 \n')[1].split('NAME/NAME MR')[1].split(' \nTELEPHONE: ')[0].substring(2);
          // const tmp2 = tmp1[1].split('SECTOR 1 \n')[1].split('NAME/NAME MR')[1].split(' \nTELEPHONE: ');
          // const phoneNumber = tmp2[1].split(' \n \n \nFLIGHT     ')[0];
          // // console.log(travelName, bookingRef, str, city, country, phoneNumber)

          // const flightsLen = response.data.wholeText.split('FLIGHT     ').length - 1;
          // const flights = response.data.wholeText.split('FLIGHT     ');
          // for(let i = 1; i <= flightsLen; i++) {
          //   if(i == flightsLen) {
          //     this.parseFlight(flights[i].split('FLIGHT(S) CALCULATED')[0]);
          //   }else{
          //     this.parseFlight(flights[i]);
          //   }
          // }
        }).catch((error) => {
        });
    }
  }

  // parseTopContent(text) {
  //   console.log(text.split('\nFLIGHT')[0].split('\n\n')[1].split('\n'))
  // }

  // parseFlight(text) {
  //   const top = text.split('-----------------------------------------------------------------------------')[0];
  //   const middle = text.split('-----------------------------------------------------------------------------')[1].split('- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -')[0];
  //   const bottom = text.split('-----------------------------------------------------------------------------')[1].split('- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -')[1];

  //   this.parseTop(top);
  //   this.parseMiddle(middle);
  //   this.parseBottom(bottom);
  // }

  // parseTop(text) {
  //   const num = text.split('  ')[0];
  //   const date = text.split('  ')[text.split('  ').length - 1].split(' \n').join('');

  //   return {
  //     number: num,
  //     date: date      
  //   }
  // }

  // parseMiddle(text) {
  //   const departure = text.split('ARRIVAL:   ')[0].split('DEPARTURE: ')[1].split(' \n').join('');
  //   const arrivals = text.split('ARRIVAL:   ')[1].split('\n           ');

  //   return {
  //     departure: departure,
  //     arrivals: arrivals
  //   }
  // }

  // parseBottom(text) {
  //   // console.log(text)
  // }

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

          {/* <p className='pdf-text'> */}
          {

          }
          {/* </p> */}
          <div className='pdf-text' dangerouslySetInnerHTML={{ __html: this.state.text }}></div>
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