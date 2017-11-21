import React, { Component } from 'react';

class Gallery extends Component {
  render() {
    let alternate = 'http://i.imgur.com/Lu9VJBz.jpg';
    if(this.props.items.length > 0) {
      return (
        <div>
          {
            this.props.items.map((item, index) => {
              //let { title, imageLinks, infoLink } = item.volumeInfo;
              if(this.props.playerClass == ""
                 || item.playerClass == this.props.playerClass){
                return (
                  <a
                    key={index}
                    className="hscard"
                    href="#"
                    >
                    <img
                      src={this.props.gold ? item.imgGold : item.img}
                      alt={item.name}
                      title={item.flavor}
                      className="hscard-img"
                    />
                  </a>
                )
              }
            })
          }
        </div>
      )
    }
    else {
      return (
        <div>
          <h3>No Cards Found</h3>
        </div>
      )
    }
  }
}

export default Gallery;
