# Project Name
Recipe website

## Description

A recipe website for people who are time-conscious but want to prepare food with items in their pantry at home.

## User stories

### Anonymous user

-  **404:** As an anonymous user I will see a 404 page if I try to reach a page that does not exist
-  **Signup:** As an anonymous user I can sign up so that I can start interacting with the platform
-  **Search recipes:** As an anonymous user I want to search recipes by name, ingredients, and/or dietary requirements to identify one to prepare
-  **List recipes:** As an anonymous user I want to see recipes so that I can choose one to prepare
-  **View recipe:** As an anonymous user I want to read a recipe to prepare
-  **View profile:** As an anonymous user I want to view the profile of a registered user to see their recipes and discover more about them


### Registered user
-  **404:** As a registered user I will see a 404 page if I try to reach a page that does not exist
-  **Login:** As a registered user I can login so that I can interact with the platform
-  **Logout:** As a registered user I can logout from the platform so no one else can use my profile
-  **Add to pantry:** As a registered user I want to add items and their quantities to my pantry to filter search results by
-  **List recipes:** As a registered user I want to see recipes so that I can choose one to prepare
-  **Create recipe:** As a registered user I can add a recipe so that I can share it with the community
-  **View saved recipes:** As a registered user I want to view my saved recipes so that I can see the ones I liked the most
-  **Edit profile:** As a registered user I want to edit my photo, display name, and biography for anonymous and registered users to see
-  **Search recipes:** As a registered user I want to search recipes by name, ingredients, items in my pantry, and/or dietary requirements to identify one to prepare
-  **View recipe:** As a registered user I want to read a recipe to prepare, add notes, save the recipe, and leave feedback
-  **View profile:** As a registered user I want to view the profile of a registered user to see their recipes and discover more about them

## Backlog

**User profile**:
- upload my profile picture
- view a registered user's profile
- view saved recipes

**Create recipes**:
- upload a recipe photo
- adding nutritional information

**Search recipes**:
- filters other than searching by ingredients in pantry

**View recipes**
- add notes
- add feedback
- save recipe

**Skills assessments:**
- e.g. knife skills, skinning and filleting fish, kneading dough
  
# Client

## Routes
| Method | Path | Component | Permissions | Behavior | 
|--------|------|--------|--| -------|
| `get`  | `/` | HomePageComponent| all | shows recipe search and latest recipes |
| `post` | `/auth/signup` | SignupLoginComponent | anonymous user | signup and login form modal, navigate to homepage after signup |
| `post` | `/auth/login` | SignupLoginComponent | anonymouse user |signup and login form modal, navigate to homepage after login |
| `post` | `/auth/logout` | n/a| anonmymous user | navigate to homepage after logout, expire session |
| `get`  | `/recipes` | RecipeListPageComponent| all | shows all recipes, links to recipe details, search recipes by name
| `post`  | `/recipes/search` | n/a | all | retrieves search results, navigate to search results page after retrieval
| `get`  | `/recipes/search` | RecipeSearchPageComponent | all | shows search results
| `post` | `/recipes` | RecipeCreatePageComponent | registered user only | creates a new recipe, navigates to created recipe detail page after creation
| `get` | `/recipes/:id` | RecipeDetailPageComponent  | registered user | details of one recipe, if logged in - button to save recipe, show indicator if already saved, ability to add notes, ability to add feedback
| `put` | `/recipes/:id` | RecipeDetailPageComponent  | registered user | details of one recipe, if logged in - button to save recipe, show indicator if already saved, ability to add notes, ability to add feedback
| `delete` | `/recipes/:id` | na | registered user only | delete recipe
| `get` | `/profile/:id` | ProfilePageComponent | registered user only | user details, created recipes, saved recipes
| `put` | `/profile/:id` | ProfilePageComponent | registered user only | update display name, biography, and password
| `delete` | `/profile/:id` | na | registered user only | delete user
| `post` | `/profile/:id/pantry` | PantryPageComponent | registered user only | adds ingredients and their quantities
| `put` | `/profile/:id/pantry` | PantryPageComponent | registered user only | updates ingredients and their quantities
| `delete` | `/profile/:id/pantry` | PantryPageComponent | registered user only | deletes ingredients and their quantities
| `get` | `**` | NotFoundPageComponent | all | 




## Components

### Page-level

- Homepage
- Recipe Create Page
- Recipe Detail Page
- Recipe List Page
- Pantry Page
- Profile page

### Block-level

- Signup/Login form
- Recipe card
- Search form
- Navigation
- Header



## Services

- Auth Service
  - auth.login(user)
  - auth.signup(user)
  - auth.logout()
  - auth.me()
  - auth.getUser()
  - auth.update(user)
  - auth.delete(user)
- Recipe Service
  - recipe.list()
  - recipe.search(terms)
  - recipe.create(data)
  - recipe.detail(id)
  - recipe.save(id)
  - recipe.unsave(id) 
  - recipe.delete(id)
  - recipe.update(id)
- Pantry Service
  - pantry.detail(id)
  - pantry.save(id)
  - pantry.update(id)  

# Server

## Models

User model

```
username: String // required & unique
password: String // required
displayName: String
biography: String
photoUrl: String
createdRecipes: [ObjectID<Recipe>]
savedRecipes: [ObjectID<Recipe>]
measurements: Enum["Imperial", "Metric"]
ability: [ObjectID<Skills Assessment>]
```

Recipe model

```
creator: ObjectID<User> // required
name: String // required
description: String // required
photoUrl: String
duration: Number // required
ingredients: [] // required
instructions: [] // required
creationDate: Date.now // required
yield: Number // required
nutritionalInfo: {name: value}
```

Pantry model

```
creator: ObjectID<User> // required
contents: {[name, quantity]}
```
// Backlog
Skills Assessment model

```
assessmentId: ObjectID // required
name: String // required
description: String // required
instructions: String // required
levels: {[name, duration]}
```

## API Endpoints (backend routes)

- GET /auth/me
  - 404 if no user in session
  - 200 with user object
- POST /auth/signup
  - 401 if user logged in
  - body:
    - username
    - password
  - validation
    - fields not empty (422)
    - user does not exists (409)
  - create user with encrypted password
  - store user in session
  - 200 with user object
- POST /auth/login
  - 401 if user logged in
  - body:
    - username
    - password
  - validation
    - fields not empty (422)
    - user exists (404)
    - passdword matches (404)
  - store user in session
  - 200 with user object
- POST /auth/logout
  - body: (empty)
  - 204
- GET /user/:id
  - id is valid (404)
  - id exists (404)
- GET /user/me/pantry
  - 200 with user object
- POST/PUT /user/me/pantry
  - body:
    - ingredient
    - quantity
  - validation
    - ingredient is valid (400)
    - quantity is valid (400)
  - add to pantry if not there yet
- DELETE /user/me/pantry
  - body:
    - ingredient
    - quantity
  - validation
    - ingredient is valid (400)
    - quantity is valid (400)
  - remove from pantry
- DELETE /user/me/delete
  - removes user
  - destroys sessions
- POST /user/me/save
  - body:
    - recipeId
  - validation
    - id is valid (404)
    - id exists (404)
  - add to savedRecipes
  - updates user in session
- DELETE /user/me/save/:recipeId
  - validation
    - id is valid (404)
    - id exists (404)
  - body: (empty - the user is already stored in the session)
  - remove from savedRecipes
  - updates user in session
- GET /recipes/:id
  - id is valid (404)
  - id exists (404)
- POST /recipes
  - body:
    - name
    - description
    - photo
    - duration
    - ingredients
    - instructions
    - createdDate
    - yield
    - nutritionalInfo
  - validation
    - fields not empty
  - create recipe
  - add to createdRecipes
  - 200 with recipe object
- DELETE /recipes/:id
  - validation
    - id is valid (404)
    - id exists (404)
  - body: (empty - the user is already stored in the session)
  - remove from createdRecipes


  

## Links

### Trello/Kanban

[Recipe website project Trello kanban board](https://trello.com/b/poACWtC6)

### Git

The url to your repository and to your deployed project

[Client repository Link](http://github.com)
[Server repository Link](http://github.com)

[Deploy Link](http://heroku.com)

### Slides

The url to your presentation slides

[Slides Link](http://slides.com)