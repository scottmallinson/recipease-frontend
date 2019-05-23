import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";
const axios = require('axios');
class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      recipes: []
    }
  }

  componentDidMount() {
    axios.get(`http://localhost:5000/user/profile/${this.props.user._id}`)
    .then(({ data }) => {
      this.setState({recipes: data})
    })
    .catch((error) => console.log(error))
  }

  render() {
    return (
      <div>
        <h2>Profile.js</h2>
        <h1>This is {this.props.user.username}'s profile</h1>
        <button>Edit profile</button>
        {this.state.recipes.map((recipe) => 
          <Link key={recipe._id} to={{
            pathname: `/recipes/${recipe._id}`,
            state: { selectedRecipe: recipe }
          }}>
            <h1>{recipe.name}</h1>
            <p>{recipe.description}</p>
          </Link>
        )}
      </div>
    );
  }
}

export default withAuth(Profile);
