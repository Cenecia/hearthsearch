import React, { Component } from 'react';
import { FormGroup, FormControl, InputGroup, Glyphicon, ControlLabel, Checkbox } from 'react-bootstrap';
import Gallery from './Gallery';
import Keys from '../keys';

class Global extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      locale: "enUS",
      golden: false,
      playerClass: "",
      items: []
    }
  }

  search() {
    let myHeaders = new Headers();
    myHeaders.append("X-Mashape-Key", Keys.MashapeKey);
    //console.log(Keys.key);
    const BASE_URL = 'https://omgvamp-hearthstone-v1.p.mashape.com/cards/search/';
    fetch(`${BASE_URL}${this.state.query}?collectible=1&locale=${this.state.locale}`, { method: 'GET', headers: myHeaders})
      .then(response => response.json())
      .then(json => {
        let { items } = json;
        this.setState({items: json})
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
          <div className="well">
            <div className="row">
              <div className="col-xs-12 col-sm-4">
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
              </div>
              <div className="col-xs-12 col-sm-4">
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
                </div>
                <div className="col-xs-12 col-sm-4">
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
              </div>
            </div>
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
          </div>
        </div>
        <div className="container main">
          <Gallery items={this.state.items} gold={this.state.golden} playerClass={this.state.playerClass}/>
        </div>
      </div>
    )
  }
}

export default Global;