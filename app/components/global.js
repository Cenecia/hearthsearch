import React, { Component } from 'react';
import { FormGroup, FormControl, InputGroup, Glyphicon, ControlLabel, Checkbox, Button, Well, Collapse, Grid, Row, Col } from 'react-bootstrap';
import Gallery from './gallery';
import Keys from '../keys';

class Global extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      locale: "enUS",
      golden: false,
      playerClass: "",
      advFilt: false,
      manaCost: "",
      health: "",
      attack: "",
      minions: true,
      spells: true,
      weapons: true,
      items: []
    }
  }

  search() {
    let myHeaders = new Headers();
    myHeaders.append("X-Mashape-Key", Keys.MashapeKey);
    const BASE_URL = 'https://omgvamp-hearthstone-v1.p.mashape.com/cards/search/';
    fetch(`${BASE_URL}${this.state.query}?collectible=1&locale=${this.state.locale}`, { method: 'GET', headers: myHeaders})
      .then(response => response.json())
      .then(json => {
        this.setState({items: json.filter((card) => {
          return (this.state.playerClass == "" || card.playerClass == this.state.playerClass)
              && (this.state.manaCost == "" || card.cost == this.state.manaCost || (this.state.manaCost == "10" && card.cost >= 10))
              && (this.state.health == "" || card.health == this.state.health  || (this.state.health == "12" && card.health >= 12))
              && (this.state.attack == "" || card.attack == this.state.attack  || (this.state.attack == "12" && card.attack >= 12))
              && (
                  (this.state.minions && card.type == "Minion")
                  || (this.state.spells && card.type == "Spell")
                  || (this.state.weapons && card.type == "Weapon")
              );
        })})
      });
  }

  setLocale(loc) {
    this.setState({locale: loc});
    this.search();
  }

  render() {
    return (
      <div className="Global">
        <div className="container">
          <h2>Hearthstone Card Explorer</h2>
          <Well bsSize="lg">
            <Grid>
              <Row>
                <Col xs={12} sm={4}>
                  <FormGroup controlId="language">
                    <ControlLabel className="pull-left">Language:</ControlLabel>
                    <FormControl
                      className="localeSelect"
                      componentClass="select"
                      placeholder="select"
                      onChange={event => {
                        this.setState({locale: event.target.value});
                        setTimeout(() => this.search(), 500);
                        }
                      }
                    >
                      <option value="enUS">enUS</option>
                      <option value="enGB">enGB</option>
                      <option value="deDE">deDE</option>
                      <option value="esES">esES</option>
                      <option value="esMX">esMX</option>
                      <option value="frFR">frFR</option>
                      <option value="itIT">itIT</option>
                      <option value="koKR">koKR</option>
                      <option value="plPL">plPL</option>
                      <option value="ptBR">ptBR</option>
                      <option value="ruRU">ruRU</option>
                      <option value="zhCN">zhCN</option>
                      <option value="zhTW">zhTW</option>
                      <option value="jaJP">jaJP</option>
                      <option value="thTH">thTH</option>
                    </FormControl>
                  </FormGroup>
                </Col>
                <Col xs={12} sm={4}>
                  <FormGroup controlId="playerClass">
                      <ControlLabel className="pull-left">Class:</ControlLabel>
                      <FormControl
                        className="localeSelect pull-left"
                        componentClass="select"
                        placeholder="select"
                        onChange={event => {
                          this.setState({playerClass: event.target.value});
                          setTimeout(() => this.search(), 500);
                          }
                        }
                      >
                        <option value="">All</option>
                        <option value="Neutral">Neutral</option>
                        <option value="Druid">Druid</option>
                        <option value="Hunter">Hunter</option>
                        <option value="Mage">Mage</option>
                        <option value="Paladin">Paladin</option>
                        <option value="Priest">Priest</option>
                        <option value="Rogue">Rogue</option>
                        <option value="Shaman">Shaman</option>
                        <option value="Warlock">Warlock</option>
                        <option value="Warrior">Warrior</option>
                      </FormControl>
                    </FormGroup>
                  </Col>
                  <Col xs={12} sm={4}>
                    <FormGroup className="pull-left">
                      <Checkbox
                        inline
                        onChange={event => {
                          this.setState({golden: event.target.checked});
                          setTimeout(() => this.search(), 500);
                        }
                      }
                    >
                      Golden
                    </Checkbox>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col xs={11}>
                  <FormGroup>
                    <ControlLabel className="pull-left">Search:</ControlLabel>
                    <InputGroup>
                      <FormControl
                        type="text"
                        placeholder="Card Name (eg: Leeroy Jenkins)"
                        onChange={event => {
                            this.setState({query: event.target.value});
                            setTimeout(() => this.search(), 500);
                          }
                        }
                        onKeyPress={event => {
                          if(event.key === 'Enter') {
                            this.search();
                          }
                        }}
                      />
                      <InputGroup.Addon onClick={() => this.search()}>
                        <Glyphicon glyph="search"></Glyphicon>
                      </InputGroup.Addon>
                    </InputGroup>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col xs={11}>
                <Button className="pull-right btn-primary" onClick={() => this.setState({ advFilt: !this.state.advFilt })}>
                  More Filters
                </Button>
                </Col>
              </Row>
              <Collapse in={this.state.advFilt}>
                <div>
                  <Row>
                    <Col xs={12} sm={4}>
                      <FormGroup controlId="manaCost">
                        <ControlLabel className="pull-left">Cost:</ControlLabel>
                        <FormControl
                          className="localeSelect pull-left"
                          componentClass="select"
                          placeholder="select"
                          onChange={event => {
                            this.setState({manaCost: event.target.value});
                            setTimeout(() => this.search(), 500);
                            }
                          }
                        >
                          <option value="">Any</option>
                          <option value="0">0</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                          <option value="9">9</option>
                          <option value="10">10+</option>
                        </FormControl>
                      </FormGroup>
                    </Col>
                    <Col xs={12} sm={4}>
                      <FormGroup controlId="health">
                        <ControlLabel className="pull-left">Health:</ControlLabel>
                        <FormControl
                          className="localeSelect pull-left"
                          componentClass="select"
                          placeholder="select"
                          onChange={event => {
                            this.setState({health: event.target.value});
                            setTimeout(() => this.search(), 500);
                            }
                          }
                        >
                          <option value="">Any</option>
                          <option value="0">0</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                          <option value="9">9</option>
                          <option value="10">10</option>
                          <option value="11">11</option>
                          <option value="12">12+</option>
                        </FormControl>
                      </FormGroup>
                    </Col>
                    <Col xs={12} sm={4}>
                      <FormGroup controlId="attack">
                        <ControlLabel className="pull-left">Attack:</ControlLabel>
                        <FormControl
                          className="localeSelect pull-left"
                          componentClass="select"
                          placeholder="select"
                          onChange={event => {
                            this.setState({attack: event.target.value});
                            setTimeout(() => this.search(), 500);
                            }
                          }
                        >
                          <option value="">Any</option>
                          <option value="0">0</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                          <option value="9">9</option>
                          <option value="10">10</option>
                          <option value="11">11</option>
                          <option value="12">12+</option>
                        </FormControl>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={4}>
                      <FormGroup>
                        <Checkbox
                          defaultChecked={true}
                          onChange={event => {
                            this.setState({minions: event.target.checked});
                            setTimeout(() => this.search(), 500);
                          }
                        }
                        >
                          Minions
                        </Checkbox>
                      </FormGroup>
                    </Col>
                    <Col xs={4}>
                      <FormGroup>
                        <Checkbox
                          defaultChecked={true}
                          onChange={event => {
                            this.setState({spells: event.target.checked});
                            setTimeout(() => this.search(), 500);
                          }
                        }
                        >
                          Spells
                        </Checkbox>
                      </FormGroup>
                    </Col>
                    <Col xs={4}>
                      <FormGroup>
                        <Checkbox
                          defaultChecked={true}
                          onChange={event => {
                            this.setState({weapons: event.target.checked});
                            setTimeout(() => this.search(), 500);
                          }
                        }
                        >
                          Weapons
                        </Checkbox>
                      </FormGroup>
                    </Col>
                  </Row>
                </div>
              </Collapse>
            </Grid>
          </Well>
        </div>
        <div className="container main">
          <Gallery items={this.state.items} gold={this.state.golden} playerClass={this.state.playerClass}/>
        </div>
      </div>
    )
  }
}

export default Global;
