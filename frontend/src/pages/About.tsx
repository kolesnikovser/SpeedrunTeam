import React from 'react';

const About: React.FC = () => {
  return (
    <section style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      background: 'linear-gradient(135deg, rgba(143,148,251,0.15), rgba(78,84,200,0.15))',
      borderRadius: '1rem',
      padding: '2rem',
      backdropFilter: 'blur(12px)'
    }}>
      <h2 style={{
        fontFamily: '"Inter", sans-serif',
        fontSize: '2rem',
        color: '#8f94fb',
        marginBottom: '1rem',
        textShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>О проекте</h2>
      <p style={{
        fontSize: '1.1rem',
        color: '#444',
        maxWidth: '600px',
        textAlign: 'center',
        lineHeight: '1.6'
      }}>
        SpeedrunTeam – это платформа, созданная для организации и управления командами в скоростных соревнованиях. Мы предоставляем удобный интерфейс для создания команд, добавления участников, отслеживания результатов и планирования будущих гонок.
      </p>
    </section>
  );
};

export default About;
