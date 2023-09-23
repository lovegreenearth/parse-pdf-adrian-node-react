import React, { Component } from 'react';
import axios from "axios";
import contant from '../../utils/constant';
import ReactToPrint from 'react-to-print';

class Read extends Component {

    constructor(props) {
        super(props);

        this.state = {
            bookRef: '',
            text: '',
            id: props.match.params.id
        }
    }

    componentDidMount() {
        axios.post(contant.BACKEND_URL + "/processPDF/read", { id: this.state.id })
            .then((response) => {
                this.setState({
                    text: response.data.content,
                    bookRef: response.data.bookRef,
                })
            }).catch((error) => {
            });
    }

    render() {
        return (
            <div className='home-page print-page'>
                {/* <button className="print-button" onClick={() => this.exportPDF()}>
                    Print
                </button> */}
                <ReactToPrint
                    trigger={() => {
                        return <a className="print-button" href="#">Print As PDF!</a>;
                    }}
                    pageStyle="@page { margin: 10px 5px; }"
                    content={() => this.componentRef}
                />
                {
                    this.state.text != '' && <div className='pdf-container' ref={el => (this.componentRef = el)}>
                        <div className='pdf-text' style={{
                            maxWidth: '814px',
                            fontSize: '18px',
                            textAlign: 'left',
                            margin: '40px auto',
                            padding: '20px'
                        }} dangerouslySetInnerHTML={{ __html: this.state.text }}></div>
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
            </div>
        )
    }
}

export default Read;