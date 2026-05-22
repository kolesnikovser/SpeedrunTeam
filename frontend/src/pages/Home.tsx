import React from 'react';

const Home: React.FC = () => {
  return (
    <section style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      background: 'linear-gradient(135deg, rgba(78,84,200,0.15), rgba(143,148,251,0.15))',
      borderRadius: '1rem',
      padding: '2rem',
      backdropFilter: 'blur(12px)'
    }}>
      <h1 style={{
        fontFamily: '"Inter", sans-serif',
        fontSize: '2.5rem',
        color: '#4e54c8',
        marginBottom: '1rem',
        textShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>Добро пожаловать в SpeedrunTeam</h1>
      <p style={{
        fontSize: '1.2rem',
        color: '#555',
        maxWidth: '600px',
        textAlign: 'center',
        lineHeight: '1.6'
      }}>
        Платформа для управления командами скоростных забегов. Здесь вы сможете создавать команды, управлять участниками, отслеживать результаты и планировать предстоящие мероприятия.
      </p>
    </section>
  );
};

export default Home;
