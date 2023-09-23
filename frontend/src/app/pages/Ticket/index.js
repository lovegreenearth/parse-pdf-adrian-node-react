import React, { Component } from 'react';
import axios from "axios";
import contant from '../../utils/constant';
import { Select, Space } from 'antd';
import ReactToPrint from 'react-to-print';

class Ticket extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tickets: [],
            activeTicket: null,
            selected: null
        }

        this.copyLink = this.copyLink.bind(this);
    }

    componentDidMount() {
        let token = localStorage.getItem('token');
        if (!token) {
            window.location.href = '/signin';
        }

        axios.post(contant.BACKEND_URL + "/processPDF/readAll", {})
            .then((response) => {
                const tmp = [];
                response.data.map(t => {
                    tmp.push({
                        value: t._id,
                        label: t.bookRef,
                        content: t.content
                    });
                })
                this.setState({
                    tickets: tmp
                })
            }).catch((error) => {
            });
    }

    handleChange = (value) => {
        this.setState({
            selected: value
        })    
        this.state.tickets.map(t => {
            if (t.value == value) {
                this.setState({
                    activeTicket: t.content
                })
            }
        })
    }

    copyLink() {
        // Create a temporary input element
        const input = document.createElement('input');
        input.setAttribute('value', 'http://localhost:3000/read/' + this.state.selected);
        document.body.appendChild(input);

        // Select and copy the link
        input.select();
        document.execCommand('copy');

        // Remove the temporary input element
        document.body.removeChild(input);

        alert("Copied!")
    }

    render() {
        return (
            <>
                <div className='home-page'>
                    <Space wrap>
                        <Select
                            style={{
                                width: 200,
                                marginTop: '50px'
                            }}
                            onChange={this.handleChange}
                            options={this.state.tickets}
                        />
                    </Space>
                    {
                        this.state.activeTicket && <div className='pdf-container' ref={el => (this.componentRef = el)}>
                            <div className='pdf-text' style={{
                                maxWidth: '814px',
                                fontSize: '18px',
                                textAlign: 'left',
                                margin: '40px auto',
                                padding: '20px'
                            }} dangerouslySetInnerHTML={{ __html: this.state.activeTicket }}></div>
                            <div style={{
                                maxWidth: '814px',
                                margin: '20px auto',
                                display: 'flex',
                                justifyContent: 'space-between',
                                textAlign: 'left',
                                color: '#5f59b1',
                                fontSize: '18px',
                                padding: '0 20px'
                            }}>
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
                            <div className='pdf-back' style={{
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                backgroundImage: 'url("/logo.png")',
                                backgroundSize: 'contain',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                opacity: '0.1',
                                top: '0'
                            }}></div>
                        </div>
                    }
                    {
                        this.state.activeTicket && <button className="copy-button" onClick={() => this.copyLink()}>
                            Copy Link
                        </button>
                    }
                    {
                        this.state.activeTicket && <ReactToPrint
                            trigger={() => {
                                return <a className="print-button" href="#">Print As PDF!</a>;
                            }}
                            pageStyle="@page { margin: 10px 5px; }"
                            content={() => this.componentRef}
                        />
                    }
                    <div style={{ marginTop: '50px' }}></div>
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

export default Ticket;