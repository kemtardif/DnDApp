import React, { Component } from 'react';
import Races from './Races';
import Abilities from './Abilities';
import Professions from './Professions';
import Stepper from 'react-stepper-horizontal';
import Card from 'react-bootstrap/Card'

class CharacterCreation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            steps: [
                { title: "Race" },
                { title: "Profession"},
                { title: " Ability scores" }
            ]
        };
        this.previousPage = this.previousPage.bind(this);
        this.nextPage = this.nextPage.bind(this);
    }

    nextPage() {
        this.setState({ page: this.state.page + 1 });
    }
    previousPage() {
        this.setState({ page: this.state.page + (-1) });
    }

    componentDidMount() {

    }

    render() {
        const { page, steps } = this.state;
        return (
            <Card >
                <Card.Header >
                    <Stepper steps={steps} activeStep={page} />
                </Card.Header>
                <Card.Body >
                    {page === 0 && <Races nextPage={this.nextPage} />}
                    {page === 1 && <Professions previousPage={this.previousPage} nextPage={this.nextPage} />}
                    {page === 2 && <Abilities previousPage={this.previousPage}/>}
                </Card.Body >
            </Card>
        );       
    }
}

export default CharacterCreation;