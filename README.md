# Channel 9 CRM: HTML5/JS Cross Platform Sample

This repository contains the source code of the *Channel 9 CRM* demo shown at the *Cross Platform Day* series on Channel 9. This demo shows how to build apps for browsers, desktop and mobile platforms using one single Angular 2 codebase.

## Toolchain
This is the toolchain we presented in our video series:

* Frontend: [Angular 2](https://angular.io), [TypeScript](http://typescriptlang.org)
* Backend: [Node.js](https://nodejs.org)
* Build: [Gulp](http://gulpjs.com/)
* App Packaging: [Electron](electron.atom.io), [TACO Tools](http://taco.tools) ([Apache Cordova](http://cordova.apache.org))

## Setup
* Make sure you have [Node.js](https://nodejs.org) installed
* If you use a Node version manager, make sure you activated Node for your active terminal
* Run `npm i` in order to install all dependencies
* You’re all set!

## Build
* Run `npm run build-all` to build web files, desktop and mobile apps

## Run
* Run a static file server (such as `live-server`) to host the files found in `dist/frontend` 
* Run `npm run server` to launch the server part of this demo

## Deploy
* Make sure that the backend you host is accessible from the target device (on actual devices, you will have to adjust the base URL found in `src/frontend/services/urlService.ts` from `localhost` to a local IP and rebuild the web files)
* Use 

## Dependencies
Including, but not limited to…

* [AdminLTE](https://github.com/almasaeed2010/AdminLTE), open source admin dashboard and control panel theme
  * [jQuery](), yeah – unfortunately.
* [Angular 2](https://angular.io), Single-Page Web Application (SPA) framework for the modern web
* [Fastclick](https://github.com/ftlabs/fastclick), eliminates the infamous 300 ms lag on devices using the iPhone-style Touch Events
* [Font Awesome](https://fortawesome.github.io/Font-Awesome/), the iconic font and CSS toolkit
* [Gulp](http://gulpjs.com/), the streaming build system
  * [gulp-typescript](https://www.npmjs.com/package/gulp-typescript), TypeScript compiler for Gulp
* [Restify](http://restify.com/), Node.js module for building RESTful web services
  * [Restify CORS Middleware](https://github.com/TabDigital/restify-cors-middleware), middleware for enabling Cross-Origin Resource Sharing (CORS)
  * [OAuth2 server](https://www.npmjs.com/package/oauth2-server), OAuth 2.0 server for Node.js
* [Sequelize](https://github.com/sequelize/sequelize), Node.js Object-Relational Mapper (ORM)
* [SQLite 3](https://www.sqlite.org/), Self-contained SQL database engine
