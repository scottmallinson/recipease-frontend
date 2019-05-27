import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";
import user from '../lib/user-service';
import Pantry from "./Pantry";

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      createdRecipes: [],
      savedRecipes: []
    }
  }

  componentDidMount() {
    console.log('user ID', this.props.user._id)
    console.log('this.state', this.state)
    user.getUser(this.props.user._id)
      .then((data) => {
        this.setState({ createdRecipes: data.createdRecipes, savedRecipes: data.savedRecipes })
      })
      .catch((error) => console.log(error))
  }

  render() {
    return (
      <div className="container pt-5">
        {/* <nav aria-label="breadcrumb">
          <ol className="breadcrumb bg-light">
            <li className="breadcrumb-item"><a href="/">Home</a></li>
            <li className="breadcrumb-item active" aria-current="page">Profile</li>
          </ol>
        </nav> */}
        <h1 className="display-4">Hi, {this.props.user.username}</h1>
        <nav>
          <div className="nav nav-tabs" id="nav-tab" role="tablist">
            <a className="nav-item nav-link active" id="nav-pantry-tab" data-toggle="tab" href="#nav-pantry" role="tab" aria-controls="nav-pantry" aria-selected="false">Pantry</a>
            <a className="nav-item nav-link" id="nav-created-tab" data-toggle="tab" href="#nav-created" role="tab" aria-controls="nav-created" aria-selected="true">Created recipes</a>
            <a className="nav-item nav-link" id="nav-saved-tab" data-toggle="tab" href="#nav-saved" role="tab" aria-controls="nav-saved" aria-selected="false">Saved recipes</a>
          </div>
        </nav>
        <div className="tab-content" id="nav-tabContent">
          <div className="tab-pane fade show active pt-3" id="nav-pantry" role="tabpanel" aria-labelledby="nav-pantry-tab">
            <Pantry />
          </div>
          <div className="tab-pane fade pt-3" id="nav-created" role="tabpanel" aria-labelledby="nav-created-tab">
            {this.state.createdRecipes.map((recipe) =>
              <div key={recipe._id} className="card mb-3">
                <div className="row no-gutters">
                  <div className="col-md-4">
                    <img src={`https://source.unsplash.com/1600x1200/?${recipe.name}`} className="card-img" alt="..." />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">
                        <Link to={{
                          pathname: `/recipes/${recipe._id}`,
                          state: { selectedRecipe: recipe }
                        }}>{recipe.name}</Link>
                      </h5>
                      <p className="card-text">{recipe.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="tab-pane fade pt-3" id="nav-saved" role="tabpanel" aria-labelledby="nav-saved-tab">
            {this.state.savedRecipes.map((recipe) =>
              <div key={recipe._id} className="card mb-3">
                <div className="row no-gutters">
                  <div className="col-md-4">
                    <img src={`https://source.unsplash.com/1600x1200/?${recipe.name}`} className="card-img" alt="..." />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">
                        <Link to={{
                          pathname: `/recipes/${recipe._id}`,
                          state: { selectedRecipe: recipe }
                        }}>{recipe.name}</Link>
                      </h5>
                      <p className="card-text">{recipe.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default withAuth(Profile);
