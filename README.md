# Canvas Course Builder

> A Vue.js based interface for generating canvas html pages

## Build Setup

You must have node installed to set up a local version of the site. Then follow the first two steps below to install the necessary packages and then serve the code locally.

``` bash
# install dependencies
npm install

# create a development server with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

***

File Structure
======

## Top-Level
A quick overview of the top level folders not including the main source.

#### build / config
These are folders for the Vue setup that you do not need to touch

#### dist
If you run `npm run build` the static minified files will be stored here which you can then upload to the root of a html server for public viewing.

#### static
This holds all static assets like css, file downloads, fonts, images, and javascript libraries

The main css file to add to each canvas sub account is stored here:
```
static/css/SIPA_GLOBAL_STYLE2018
```

#### index.html
This file does not need to be modified -- it currently is only used to inject the css and js libraries and change the display name for the page.

## src (Source)
Where the main app source code is stored. It has two files (main.js and App.vue) and three folders (components, router, and store) that house the main architecture

#### main.js
This file loads in Vue and the vue frameworks. There is no need to change anything unless you are altering these fundamental libraries.

#### App.vue
This is a Vue component file which holds all of the logic that is supposed to work through all pages on the app, including the help and menu off canvas panes, the router view, and the breadcrumbs among other features.

#### router
This folder holds the router's index.js file which is imported into the app. It imports each page component and acts as a directory

### components
Houses all of the pages as well as some helper components to render smaller things like individual weeks on the weekly activity page.

Working on more detailed documentation on how these pages function. There is some inline documentation but the general idea is that there is a template section that has a series of input forms that are bound via vuex mutations to the store. The template section also has the html template for each canvas page with {{}} and directive interpreters to load in the correct content from the store inline. This code is then pulled from the wrapper div and used to copy the text to the clipboard (see the copyText and updateCode methods in `store/mutations.js`). Thus if you want to change the canvas template you simply change the html in the preview section as needed. The IMSCC export is more complicated won't update using this system without a code refactor.

For more information on how Vue components work and are organized, check the [Vue Docs](https://vuejs.org/v2/guide/single-file-components.html).

### store

This holds the main information structure of the app using a vuex store that is loaded into each component and acts as a central source of truth so that when any section is changed it is updated throughout the app. The main store is `store.js` which has the primary getter and mutation functions, but most of the actual fields and data are stored in `components/defaults.js` which holds the initial values and is then deep cloned into store.js to remove redundancy.

`mutations.js` is a mixin which holds some common mutation functions and methods that are used in almost every component page.

`help.js` store the help text.

`components/theme.js` stores the main school theme/banner info, which primarily functions by adding or removing css classes that are associated with the various display options.
