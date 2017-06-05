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
import {marker} from 'react-markers';

export const ConfirmForm = marker('form');
export const ConfirmButton = marker('button');

export default function ConfirmPage() {
  return (
    <ConfirmForm onSubmit={...}>
      <h1>Confirm action</h1>
      <p>This will perform an action</p>
      <ConfirmButton type="submit">Submit</ConfirmButton>
    </ConfirmForm>
  );
}
```

Then in your tests, you can use `find()` to lookup these markers from the DOM.

```js
// ConfirmPage.test.js
import {render} from 'react-dom';
import ConfirmPage, {ConfirmForm, ConfirmButton} from './ConfirmPage';
import {find} from 'react-markers';

const container = document.getElementById('test-container');

render(<LoginPage/>, container);

let form = find(container, ConfirmForm); // <form>
let btn = find(form, SubmitButton); // <button type="submit">
```

Be sure that `process.env.NODE_ENV` is set to `"test"` when running your tests.

## API

#### `marker(component)`

`component` can be anything that can be passed to `React.createElement`.

It returns a functional component which accepts any props you pass to it and
passes them along to `component`.

#### find(element, marker)

`element` is a DOM element and `marker` is a component returned by
`marker()`.

It returns either the matched DOM element or `null`

#### findAll(element, marker)

`element` is a DOM element and `marker` is a component returned by
`marker()`.

It returns a `NodeList`.
