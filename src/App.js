import React from 'react';

import TodoMain from './components/organisms/TodoMain';

const App = () => {
  return (
    <div className="App">
      <nav>
        <section>
          <h1>Redux Fundamentals Example</h1>
        </section>
      </nav>
      <main>
        <TodoMain />
      </main>
    </div>
  );
};

export default App;
