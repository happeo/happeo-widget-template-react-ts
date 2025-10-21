# Happeo Zendesk Custom App #

### About the project ###


### Getting started ###

#### Prerequisites
Happeo Admin privileges to create a custom app.

#### In development mode

1. Create a custom app in DEVELOPMENT mode and copy the slug
2. Replace slug in index.js with the one copied above
3. Install NPM packages
   ```
   npm install
   ```
4. Start widget (this will serve the widget on localhost:8080/bundle.js
   ```
   npm run start
   ```
5. Open Happeo
6. Goto page where you are an editor or create one
8. Add a widget
9. Select your widget from the "In Development" list


#### In Testing or Published mode

1. Go to the custom app (or marketplace submission) and copy the slug
2. Replace slug in index.js with the the one copied above
3. Install NPM packages
   ```
   npm install
   ```
4. Build widget
   ```
   npm run build
   ```
5. Open Happeo admin, go to Apps, and upload bundle to your app.

### Deployment ###

The deployment is currently manual, however the bundle is created whenever
a commit is merged to `staging` or `master` branch.

1. Go to the lastest pipeline for the `staging` or `master` branch.
2. Download the artifacts which contains the bundle.js
3. Go to Happeo admin > Apps > your app, and upload the bundle
4. Set the app to published
5. In case of marketplace app, send the source code for review, and get it approved by the Integrations Team