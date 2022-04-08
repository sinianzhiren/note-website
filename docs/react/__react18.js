import React from "react";
import ReactDOM from "react-dom";

ReactDOM.render(
  <App />,
  document.getElementById('app')
);

const root = ReactDOM.creatRoot(document.getElementById('app'));
root.render(<App />);

import { useTransition } from 'react';

const [ispending, startTransition] = useTransition();

if (ispending) return <Spinner />;

ReactDOM.hydrate(<App />, document.getElementById('app'));

const OtherRoot = () => {
  return (
    <div>other root</div>
  )
};

export default class App extends React.Component {
  onClick = () => {
    ReactDOM.unmountComponentAtNode(document.getElementById('otherRoot'));
  };

  componentDidMount() {
    ReactDOM.render(<OtherRoot />, document.getElementById('otherRoot'));
  }

  render() {
    return (
      <div>
        <button onClick={this.onClick}>unmountComponentAtNode</button>
        <div id={'otherRoot'}>
          {/*<OtherRoot />*/}
        </div>
      </div>
    );
  }
}
