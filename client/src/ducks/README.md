## BarTop State Management
___
Managing application state can be confusing. BarTop uses [Redux](https://redux.js.org/) to help simplify it a bit, and a [variation](https://hackernoon.com/my-journey-toward-a-maintainable-project-structure-for-react-redux-b05dfd999b5) on the [Ducks](https://github.com/erikras/ducks-modular-redux) file structure to help simplify Redux. 

This file aims to serve as a quick reference for how the state is flowing through the application.

Each section corresponds to a sub-directory within the `/ducks` directory. These sub-directories are responsible for broad categories of the application state, with the action types, action creators, and reducers inside each. Keep in mind that a reducer can respond to actions defined elsewhere, so state changes are not always contained to one sub-directory 🙃

### Authentication

This duck uses the Auth0 Web Auth singleton to perform user authentication. This is different from Auth0 Management, which is used for working with users & the Auth0 client API.

Key highlights:
* **LOGIN_REQUEST** - redirects to our Auth0 hosted login page
* **HANDLE_AUTHENTICATION** - this thunk parses the hash to grab the `accessToken` and `idToken`. The `accessToken` is used for API authentication, and expires after the time set by `expiresIn`. It also decodes the `idToken`, which gives us some user information. If we don't know the user's name yet, we request it here.

### User

This duck contains all information that's personal to the user (like a profile).

Key highlights:

* It listens for the `AUTHENTICATION/LOGIN_SUCCESS` action, which gives initial user information like id, name, email, and phoneNumber.


