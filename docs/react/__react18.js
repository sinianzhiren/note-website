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