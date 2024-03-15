# 🥞 Inscription UIkit

[![Version](https://img.shields.io/npm/v/@inscription/uikit)](https://www.npmjs.com/package/@inscription/uikit) [![Size](https://img.shields.io/bundlephobia/min/@inscription/uikit)](https://www.npmjs.com/package/@inscription/uikit)

Inscription UIkit is a set of React components and hooks used to build pages on Inscription's apps. It also contains a theme file for dark and light mode.

## Install

`yarn add @inscription/uikit`

***Note**: In case you want to use the older version of the Inscription UIkit, you should install @inscription-libs/uikit, instead, but we recommend using the latest version of the UIkit.*


## Setup

### Providers

Before using Inscription UIkit, you need to provide the theme file to uikit provider.

```
import { UIKitProvider, light, dark } from '@inscription/uikit'
...
<UIKitProvider theme={isDark ? dark : light}>...</UIKitProvider>
```

### Reset

A reset CSS is available as a global styled component.

```
import { ResetCSS } from '@inscription/uikit'
...
<ResetCSS />
```

### Types

This project is built with Typescript and export all the relevant types.

## How to use the UIkit

If you want to use components from the UIkit, check the [Storybook documentation](https://inscription.github.io/inscription-uikit/)
