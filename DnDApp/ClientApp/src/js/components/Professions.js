import React, { Component } from 'react';
import { connect } from 'react-redux';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Helpers from '../Helpers/Helpers';


class Professions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            professions: [],
            selectedProfession: {}
        };
    }

    componentDidMount() {

        fetch('api/Informations/Professions')
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw Error(response.statusText);
            })
            .then(data => this.setState({
                professions: data,
                selectedProfession : data[0]
            }))
            .catch(error => console.log(error));
    }

    handleSelect(key, e) {
        var profession = this.state.professions[key];
        this.setState({ selectedProfession: profession });
    }

    selectProfession(profession) {
        this.props.dispatch({
            type: 'SELECT_PROFESSION',
            payload: profession
        })
        this.props.nextPage();
    }

    render() {
        const { professions, selectedProfession } = this.state;

        const professionImages = professions.map((profession, index) => (
            <Carousel.Item key={index}>
                        <img
                            src={"/assets/images/professions/" + profession.name + ".jpg"}
                            style={{ display: "block", maxHeight: "90%", maxWidth: "90%", marginLeft: "auto", marginRight: "auto" }}
                            alt={profession.name}
                        />
            </Carousel.Item>
        ));
        
        return (
            <>
                <Row>
                    <Col md={8}>
                        <Carousel fade={true} interval={null} onSelect={this.handleSelect.bind(this)}>
                            {professionImages}
                        </Carousel>
                    </Col>
                    <Col md={4}>
                        <ListGroup variant="flush">
                            <ListGroup.Item> <b>{selectedProfession.name}</b></ListGroup.Item>
                            <ListGroup.Item> {"Hit Dice : 1D" + selectedProfession.hdType}</ListGroup.Item>
                            <ListGroup.Item>{"Base Attack Bonus : " + Helpers.AddPlusSign(selectedProfession.baseAttackBonus)} </ListGroup.Item>
                            <ListGroup.Item> {"Fortitute saving throws : " + Helpers.AddPlusSign(selectedProfession.fortSave)}</ListGroup.Item>
                            <ListGroup.Item> {"Reflex saving throws : " + Helpers.AddPlusSign(selectedProfession.refSave)}</ListGroup.Item>
                            <ListGroup.Item>{"Willpower saving throws : " + Helpers.AddPlusSign(selectedProfession.willSave)}</ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {selectedProfession.description}
                    </Col>
                </Row>
                <Button variant="primary" onClick={this.props.previousPage}>Previous </Button>
                <Button variant="primary" style={{float: "right"}} onClick={this.selectProfession.bind(this, selectedProfession)}>Next</Button>
            </>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        dispatch
    }
}

export default connect(null, mapDispatchToProps)(Professions);