
### Running the Example

## Step 1 ) Update the environment variables

An example `.env.example` file is provided. Rename this file to `env.development.local` to get started. 

```
REACT_APP_FEATHERS_PORT=3030
REACT_APP_SERVICE_NAME=books
REACT_APP_ATTRIBUTE=title
REACT_APP_LIST_SEARCH="Image%"
```

## Step 2 ) Start your feathers app

We do not include a feathers app by default, since everyone's use case may be differenct. Instead, just start your feathers app locally and connect it by changing the environment variables above.

<b>Todo:</b> Since people (myself included) are lazy, just link to an example feathers repo that uses the environment variables above.

##  Step 3 ) Start the example app
```bash
# Go to the root of this repo
cd ..

# Install dependencies
yarn

# Build react-feathers locally
yarn workspace @fmbm/react-feathers build

# Start the example app
yarn workspace example start
```

or, use a one liner...

```bash
cd .. && yarn && yarn workspace @fmbm/react-feathers build && yarn workspace example start
```

---

The example app should now be available on:
http://localhost:1234