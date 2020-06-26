<p align="center">
  <img
    src="https://raw.githubusercontent.com/Moonlight-io/visual-identity/master/logo/moonlight-logo-dark-400w.png" />
</p>

<h1 align="center">asteroid-sdk-js</h1>

<p align="center">
  Moonlight Asteroid SDK.
</p>

<p align="center">
  <a href="https://circleci.com/gh/Moonlight-io/asteroid-sdk-js">
    <img src="https://circleci.com/gh/Moonlight-io/asteroid-sdk-js.svg?style=svg">
  </a>
</p>

# Overview

This is the JavaScript SDK for the Moonlight Asteroid platform. This project aims to be a lightweight library providing programmable interactions with Moonlight ecosystem.

# Getting started

## Installation

### Nodejs

```js
npm install --save @moonlight-io/asteroid-sdk-js
```

## Usage

### Node.js

```js
const SDK = require('@moonlight-io/asteroid-sdk-js')
const baseUrl = SDK.constants.urls.asteroidDomainUser.baseUrl.stage
const versionRes = await SDK.rest.user.getVersion(baseUrl)
/**
 * Example response:
 * { version: 'v1.5.5_21c5672', uptime: 290938, domain: 'User' }
 */
```
