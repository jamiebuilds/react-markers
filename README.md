# react-markers

> Add markers to your React components for easy testing with actual DOM elements

## Installation

```sh
yarn add react-markers
```

## Usage

Create static elements to use in your component, and export them from your
module.

```js
// ConfirmPage.js
import marker from 'react-markers';

export const confirmForm = marker();
export const confirmButton = marker();

export default function ConfirmPage() {
  return (
    <form onSubmit={...} {...confirmForm}>
      <h1>Confirm action</h1>
      <p>This will perform an action</p>
      <button type="submit" {...confirmButton}>Submit</button>
    </form>
  );
}
```

Then in your tests, you can use `find()` and `findAll()` to lookup these
markers from the DOM.

```js
// ConfirmPage.test.js
import { render } from 'react-dom';
import ConfirmPage, { confirmForm, confirmButton } from './ConfirmPage';
import marker from 'react-markers';

const container = document.getElementById('test-container');

render(<LoginPage/>, container);

let form = marker.find(container, confirmForm); // <form>
let btn = marker.find(form, confirmButton); // <button type="submit">
```

Be sure that `process.env.NODE_ENV` is set to `"test"` when running your tests.

## API

#### `marker()`

In test environments this returns an object of props to pass to your DOM
elements. In other environments it returns `null`.

```js
export const myButton = marker();
export default function MyButton() {
  return <button {...myButton}/>;
}
```

#### find(element, marker)

`element` is a DOM element and `marker` is the value returned by `marker()`.

It returns either the matched DOM element or `null`.

```js
import MyButton, { myButton } from './MyButton';
render(<MyButton/>, container);
findAll(container, myButton); // HTMLElement | null
```

#### findAll(element, marker)

`element` is a DOM element and `marker` is the value returned by `marker()`.

It returns a `NodeList`.

```js
import MyButton, { myButton } from './MyButton';
render(<MyButton/>, container);
findAll(container, myButton); // NodeList
```
