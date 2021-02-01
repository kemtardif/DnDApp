import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Helpers from '../Helpers/Helpers';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

class Abilities extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonIsDisabled: false,
            disableDrag: true,
            AbilityScores: ["--", "--", "--", "--", "--", "--"],
            BaseModifiers: ["--", "--", "--", "--", "--", "--"],
            RacialModifiers: this.props.selectedRace.racialAttributeAdj,
            TotalModifiers: this.props.selectedRace.racialAttributeAdj
        };

        this.RollTheDices = this.RollTheDices.bind(this);
        this.handleOnDragEnd = this.handleOnDragEnd.bind(this);
    }

    RollTheDices() {
        var rolledScores = [];
        var baseModifiers = [];
        var totalModifiers = [];

        for (var i = 0; i < 6; i++) {
            var ability = Helpers.GenerateAbilityScore();
            rolledScores.push(ability);
            baseModifiers.push(Helpers.AbilityModifier(ability));

            var total = baseModifiers[i] + this.state.RacialModifiers[i];
            totalModifiers.push(total)
        }

        this.setState({
            buttonIsDisabled: true,
            disableDrag: false,
            AbilityScores: rolledScores,
            BaseModifiers: baseModifiers,
            TotalModifiers: totalModifiers
        });

    }

    handleOnDragEnd(result) {
        if (!result.destination) return;

        const newAbilities = Array.from(this.state.AbilityScores);
        const [removed] = newAbilities.splice(result.source.index, 1);
        var baseModifiers = [];
        var totalModifiers = [];

        newAbilities.splice(result.destination.index, 0, removed);

        for (var i = 0; i < newAbilities.length; i++) {
            baseModifiers.push(Helpers.AbilityModifier(newAbilities[i]));

            var total = baseModifiers[i] + this.state.RacialModifiers[i];
            totalModifiers.push(total)
        }

        this.setState({
            AbilityScores: newAbilities,
            BaseModifiers: baseModifiers,
            TotalModifiers: totalModifiers
        });
    }

    componentDidMount() {

    }

    render() {
        const { buttonIsDisabled,
                disableDrag,
                AbilityScores,
                BaseModifiers,
                RacialModifiers,
                TotalModifiers } = this.state;

        const setAbilityScores = AbilityScores.map((score, index) => {
            return (
                <Draggable key={index} draggableId={index.toString()} index={index}>
                    {(provided) => (
                        <ListGroup.Item disabled={disableDrag} variant="light" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>{score}</ListGroup.Item>
                    )}
                </Draggable>
            )
        });

        const setModifiers = BaseModifiers.map((modifier, index) => (
            <tr key={index}>
                <td>{Helpers.AddPlusSign(modifier)}</td>
                <td>{RacialModifiers[index] !== 0 ?
                        Helpers.AddPlusSign(RacialModifiers[index])
                    :
                        "--"
                    }</td>
                <td>{Helpers.AddPlusSign(TotalModifiers[index])}</td>
            </tr>
        ));

        const popover = (
            <Popover id="popover-basic">
                <Popover.Title as="h3">
                    Modify abilities
                </Popover.Title>
                <Popover.Content>
                    Drag-and-drop the ability scores to make your selection.
                </Popover.Content>
            </Popover>
        );

        return (
                <DragDropContext onDragEnd={this.handleOnDragEnd}>
                    <OverlayTrigger trigger="click" rootClose placement="right" overlay={popover} delay={{ show: 250, hide: 600 }}>
                        <Button onClick={this.RollTheDices} disabled={buttonIsDisabled}>Generate ability scores</Button>
                    </OverlayTrigger>
                    <Row style={{ textAlign: "center" }}>
                    <Col lg={3} >
                        <Table striped borderless hover>
                            <thead>
                                <tr>
                                    <th>________________________________</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr><td>Strength</td></tr>
                                    <tr><td>Dexterity</td></tr>
                                        <tr><td>Constitution</td></tr>
                                            <tr><td>Intelligence</td></tr>
                                                <tr><td>Wisdom</td></tr>
                                                    <tr><td>Charisma</td></tr>
                            </tbody>
                            </Table>
                        </Col>
                    <Col lg={2} >
                            <Droppable droppableId="scores">
                                {(provided) => (
                                <ListGroup className="scores" {...provided.droppableProps} ref={provided.innerRef}>
                                        <ListGroup.Item variant="light" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>Ability Score</ListGroup.Item>
                                        {setAbilityScores}
                                        {provided.placeholder}
                                    </ListGroup>
                                )}
                            </Droppable>
                        </Col>
                    <Col >
                        <Table striped bordered variant="dark">
                            <thead>
                                <tr>
                                    <th>Base Modifier</th>
                                    <th>Racial Modifier</th>
                                    <th>Total Modifier</th>
                                </tr>
                                </thead>
                                <tbody>
                                    {setModifiers}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                    <Button variant="primary" onClick={this.props.previousPage}>Previous</Button>
                </DragDropContext>
        );
    }

}

const mapStateToProps = state => {
    return { selectedRace: state.selectedRace }
}
export default connect(mapStateToProps)(Abilities);