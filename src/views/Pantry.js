import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
const axios = require('axios');
class Pantry extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pantry: this.props.user.pantry
    }
  } 

  handleItemChange(e, inputIndex) {
    const {pantry} = this.state;
    let newPantry = [...pantry];
    newPantry.map((_, index, newPantry)=>{
      return index === inputIndex ? newPantry[index][e.target.name] = e.target.value : null;
    })
    this.setState({
      pantry: newPantry,
    })
  }

  handleItemRemove(e, index) {
    e.preventDefault();
    this.state.pantry.splice(index, 1);
    this.setState({
      pantry: this.state.pantry
    })
  }

  addItem(e, items) {
    e.preventDefault();
    this.setState({
      pantry: [...this.state.pantry, {
        item: '',
        quantity: ''
      }]
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    const { _id } = this.props.user;
    const { pantry } = this.state;
    axios.put('http://localhost:5000/user/pantry', {
      _id,
      pantry
    })
    .then(() => this.props.user.pantry = pantry)
    .catch((error) => console.log(error));
  }

  render() {
    return (
      <div>
        <h2>Pantry.js</h2>
        <h1>Welcome {this.props.user.username}</h1>
        <p>This is your pantry</p>
        {
            this.state.pantry.map((item, index) => {
              return (
                <div key={index}>
                  <input onChange={(e) => this.handleItemChange(e, index)} value={item.item} name="item"/>
                  <input onChange={(e) => this.handleItemChange(e, index)} value={item.quantity} name="quantity"/>
                  <button onClick={(e) => this.handleItemRemove(e, index)}>Remove</button>
                </div>
              )
            })
          }
          <button onClick={(e) => this.addItem(e)}>Add item</button>
          <button onClick={(e) => this.handleSubmit(e)}>Save items</button> 
      </div>
    );
  }
}

export default withAuth(Pantry);
