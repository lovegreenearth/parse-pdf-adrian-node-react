import React, { Component } from 'react';
import axios from "axios";
import contant from '../../utils/constant';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            file: null,
            uploaded: false,
            fileId: null,
            text: '',
            id: null,
            bookRef: '',
            copied: false,
            send: false
        }
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.proccess = this.proccess.bind(this);
        this.refresh = this.refresh.bind(this);
        this.copyLink = this.copyLink.bind(this);
    }

    componentDidMount() {
        let token = localStorage.getItem('token');
        if (!token) {
            window.location.href = '/signin';
        }
    }

    onFormSubmit() {
        if(!this.state.file) {
            alert("Please select a file");
            return;
        }
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
                    this.setState({
                        text: response.data.savedPdf.content,
                        id: response.data.savedPdf._id,
                        bookRef: response.data.savedPdf.bookRef
                    });
                }).catch((error) => {
                });
        }
    }

    refresh() {
        window.location.href = "/"
    }

    copyLink() {
        // Create a temporary input element
        const input = document.createElement('input');
        // input.setAttribute('value', 'http://localhost:3000/read/' + this.state.id);
        input.setAttribute('value', 'http://81.181.160.210/read/' + this.state.id);
        document.body.appendChild(input);

        // Select and copy the link
        input.select();
        document.execCommand('copy');

        // Remove the temporary input element
        document.body.removeChild(input);

        this.setState({
            copied: true
        })
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
                        this.state.uploaded && <div>
                            <button className="process-button" onClick={() => this.proccess()}>Process</button>
                            <button className="refresh-button" onClick={() => this.refresh()}>Refresh</button>
                        </div>
                    }
                    {
                        this.state.text != '' && <div className='pdf-container'>
                            <div className='pdf-text' dangerouslySetInnerHTML={{ __html: this.state.text }}></div>
                            <div className='pdf-bottom'>
                                <div>
                                    <div>SC THUG-NET SRL</div>
                                    <div>Reg. com: J40/5598/2005</div>
                                    <div>CIF: RO17401198</div>
                                    <div>office@mayatravel.ro</div>
                                </div>
                                <div>
                                    <div>Licenta de turism: 201/27.11.2018</div>
                                    <div>Polita de asigurare: 57285/21.11.2022</div>
                                    <div>Capital social: 25000 RON</div>
                                </div>
                            </div>
                            <div className='pdf-back'></div>
                        </div>
                    }
                    {
                        this.state.text != '' && <div className='actions'>
                            <div>
                                <button className="copy-button" onClick={() => this.copyLink()}>
                                    {
                                        this.state.copied ? 'Copied' : 'Copy Link'
                                    }
                                </button>
                            </div>
                        </div>
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