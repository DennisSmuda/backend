import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import Counter from '../components/Counter';
import counter from '../reducers';

const store = createStore(counter);

export default class CounterContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <Counter value={store.getState()}
        onIncrement={() => store.dispatch({ type: 'INCREMENT' })}
        onDecrement={() => store.dispatch({ type: 'DECREMENT' })}
      />
    );
  }
}
