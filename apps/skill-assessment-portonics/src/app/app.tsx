import React, { useEffect, useState } from 'react';
import { Message } from '@skill-assessment-portonics/api-interfaces';

export const App = () => {
  const [m, setMessage] = useState<Message>({ message: '' });

  useEffect(() => {
    fetch('/api')
      .then((r) => r.json())
      .then(setMessage);
  }, []);

  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <h1>Welcome to skill-assessment-portonics!</h1>
      </div>
      <div>{m.message}</div>
    </>
  );
};

export default App;
