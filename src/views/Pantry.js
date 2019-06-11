import React, { useState, useEffect, useRef } from "react";
import { Link } from 'react-router-dom';
import { withAuth } from "../lib/AuthProvider";
import user from '../lib/user-service';
import recipe from '../lib/recipe-service';

function Pantry(props) {
  const [pantry, setPantry] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [performSearch, setPerformSearch] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const myRef = useRef();

  function handleItemChange(e, inputIndex) {
    let newPantry = [...pantry];
    newPantry.map((_, index, newPantry) => {
      return index === inputIndex ? newPantry[index][e.target.name] = e.target.value : null;
    })
    setPantry(newPantry)
  }

  function handleItemRemove(e, index) {
    e.preventDefault();
    let newPantry = [...pantry];
    newPantry.splice(index, 1);
    setPantry(newPantry)
  }

  function addItem(e) {
    e.preventDefault();
    setPantry(
      [...pantry, {
        item: '',
        quantity: ''
      }]
    )
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { _id } = props.user;
    user.updatePantry({
      _id,
      pantry
    })
      .then((response) => {
        setPantry(
          response.pantry
        )
      })
      .catch((error) => console.log(error));
  }

  function handleSearchByIngredients(e) {
    e.preventDefault();
    recipe.recipesByAllIngredients({
      selectedIngredients
    })
      .then((data) => {
        setRecipes(data)
        setPerformSearch(true)
      })
      .catch((error) => console.log(error));
  }

  function handleCheckChange(e) {
    let positionInArray = null;
    if (!selectedIngredients.includes(e.target.name)) {
      setSelectedIngredients([...selectedIngredients, e.target.name])
    } else {
      positionInArray = selectedIngredients.indexOf(e.target.name)
      setSelectedIngredients(selectedIngredients.splice(positionInArray, 1))
    }
    if (selectedIngredients.length > 0) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }

  useEffect(() => {
    user.getUser(props.user._id)
      .then((data) => {
        setPantry(data.pantry)
      })
      .catch((error) => console.log(error))

  }, [])

  useEffect(() => {
    if (myRef.current) {
      window.scrollTo(0, myRef.current.offsetTop);
    }
  }, [recipes])

  return (
    <div className="container p-0">
      {
        pantry.map((item, index) => {
          return (
            <div className="form-row" key={index} ref={myRef}>
              <div className="col col-md-8">
                <input className="form-control" onChange={(e) => handleItemChange(e, index)} value={item.item} name="item" placeholder="Item name" autoComplete="off" />
              </div>
              <div className="col">
                <input className="form-control" onChange={(e) => handleItemChange(e, index)} value={item.quantity} name="quantity" placeholder="Quantity" autoComplete="off" />
              </div>
              <div className="col-1">
                <input className="form-control" type="checkbox" name={item.item} onChange={(e) => handleCheckChange(e, index)} />
              </div>
              <div className="col-auto">
                <button className="btn btn-warning" onClick={(e) => handleItemRemove(e, index)}><i className="far fa-trash-alt"></i></button>
              </div>
            </div>
          )
        })
      }
      <div className="form-row">
        <div className="col-auto">
          <button className="btn btn-outline-primary" type="submit" onClick={addItem}><i className="fas fa-plus"></i> Add item</button>
        </div>
        <div className="col-auto">
          <button className="btn btn-success" type="submit" onClick={handleSubmit}><i className="fas fa-cloud-upload-alt"></i> Save items</button>
        </div>
      </div>
      <div className="form-row">
        <div className="col">
          <button className="btn btn-primary" type="submit" onClick={handleSearchByIngredients} disabled={disabled}><span className="badge badge-light">{selectedIngredients.length}</span> ingredients selected</button>
        </div>
      </div>
      {performSearch ?
        <h2>{recipes.length} recipes uses the selected ingredients</h2>
        : null}
      {recipes.map((recipe) =>
        <div className="card mb-3" key={recipe._id._id}>
          <div className="row no-gutters">
            <div className="col-md-4">
              <img src={recipe._id.photoUrl} className="card-img" alt="..." />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">
                  <Link to={{
                    pathname: `/recipes/${recipe._id._id}`
                  }}>{recipe._id.name}</Link> <span className="badge badge-info">{recipe.matches} ingredients matched</span>
                </h5>
                <p className="card-text">{recipe._id.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default withAuth(Pantry);
