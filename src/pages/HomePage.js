import React, { useState } from 'react';
import QueueForm from '../components/QueueForm';
import QueueConfirmation from '../components/QueueConfirmation';

const HomePage = () => {
  const [latestQueue, setLatestQueue] = useState(null);

  const handleQueueCreated = (queue) => {
    setLatestQueue(queue);
  };

  return (
    <div style={styles.container}>
      {latestQueue ? (
        <QueueConfirmation queue={latestQueue} />
      ) : (
        <QueueForm onQueueCreated={handleQueueCreated} />
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
  },
};

export default HomePage;