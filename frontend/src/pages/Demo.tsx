import React from 'react';

const Demo: React.FC = () => {
  return (
    <div className="video-demo" style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
      <video
        src="/videos/Демонстракция проекта.mp4"
        controls
        style={{ maxWidth: '100%', borderRadius: '1rem', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}
      >
        Ваш браузер не поддерживает тег video.
      </video>
    </div>
  );
};

export default Demo;
