import React, { Component } from 'react';
import axios from "axios";
import contant from '../../utils/constant';

class Read extends Component {

    constructor(props) {
        super(props);

        this.state = {
            text: '',
            id: props.match.params.id
        }
    }

    componentDidMount() {
        axios.post(contant.BACKEND_URL + "/processPDF/read", { id: this.state.id })
            .then((response) => {
                this.setState({
                    text: response.data.content
                })
            }).catch((error) => {
            });
    }

    render() {
        return (
            <div className='home-page'>
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
            </div>
        )
    }
}

export default Read;