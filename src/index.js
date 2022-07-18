import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';

import {
  HashRouter,
  Routes,
  Route
} from "react-router-dom";
const Scratch = lazy(() => import('./components/Scratch'));

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <Suspense fallback="loading...">
        <Routes>
          <Route exact path="/" element={<Scratch></Scratch>} />


        </Routes>
      </Suspense>

    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);