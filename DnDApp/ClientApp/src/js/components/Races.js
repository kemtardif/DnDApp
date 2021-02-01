import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import Helpers from '../Helpers/Helpers';

class Races extends Component {
    constructor(props) {
        super(props);
        this.state = {
            races: []
        };
    }

    selectRace(race) {
        this.props.dispatch({
            type: 'SELECT_RACE',
            payload: race 
        })

        this.props.nextPage();
    }

    componentDidMount() {

        fetch("api/Informations/Races")
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }

                throw Error(response.statusText);
            })
            .then(data => this.setState({races : data}))
            .catch (error => console.log(error));
    }

    render() {
        const { races } = this.state;

        const allRaces = races.map((race, index) => (
            <Card key={race.id} >
                <Accordion.Toggle as={Card.Header}  eventKey={index.toString()}>
                    {race.name}
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={index.toString()}>
                    <Card.Body >
                            <Row>
                                <Col >
                                    <img
                                        src={"/assets/images/races/" + race.name + "Female.jpg"}
                                        className="d-block m-auto"
                                        width="200"
                                        height="300"
                                        display="block"
                                        margin-left="auto"
                                        margin-right="auto"
                                        alt={race.name + " Female"}
                                    />
                                </Col>
                                <Col>   
                                <p style={{ textAlign: "justify" }}> {race.description} </p>
                                <Button block variant="primary" onClick={this.selectRace.bind(this,race)}>Select {race.name}</Button>
                                </Col>
                                <Col>
                                    <img
                                        src={"/assets/images/races/" + race.name + "Male.jpg"}
                                        width="200"
                                        height="300"
                                        style={{display: "block", marginLeft:"auto", marginRight:"auto"}}
                                        alt={race.name + " Male"}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                <ListGroup variant="flush">
                                    <ListGroup.Item> <b>Characteristics</b></ListGroup.Item>
                                    <ListGroup.Item> {race.racialAdjText}</ListGroup.Item>
                                    <ListGroup.Item>Favoured class : {race.favoredClass} </ListGroup.Item>
                                    <ListGroup.Item> Size : {race.size} </ListGroup.Item>
                                    <ListGroup.Item> Base speed : {race.baseSpeed} ft </ListGroup.Item>
                                    <ListGroup.Item>
                                        Languages : 
                                        {
                                            race.language.map((language) => ( " " + language + " "))
                                        }
                                    </ListGroup.Item>                                   
                                </ListGroup>
                                </Col>
                                <Col>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item> <b>Racial Features</b></ListGroup.Item>                                       
                                        {
                                            race.racialFeatures.map((racial, index) =>
                                              <ListGroup.Item key={index}>{racial}</ListGroup.Item>
                                             )
                                        }
                                    </ListGroup>                                  
                                </Col>
                                <Col>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item> <b>Skill Check Modifiers</b></ListGroup.Item>
                                        {
                                            race.racialSkillAdj.length > 0 ?
                                                race.racialSkillAdj.map((feature) =>
                                                    <ListGroup.Item key={feature.id}>
                                                        {feature.name + " Check : "}
                                                        { Helpers.AddPlusSign(feature.racialModifier)}
                                                    </ListGroup.Item>)
                                            :
                                                <ListGroup.Item> {race.name + " have no racial skill modifier."}</ListGroup.Item>
                                        }
                                    </ListGroup>                                                    
                                </Col>
                            </Row>      
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        ));

        return (
                <>
                    <Accordion defaultActiveKey="0">
                        {allRaces}
                    </Accordion>
                </>
        );
    }
            
}

const mapDispatchToProps = dispatch => {
    return {
        dispatch
    }
}

export default connect(null, mapDispatchToProps)(Races);