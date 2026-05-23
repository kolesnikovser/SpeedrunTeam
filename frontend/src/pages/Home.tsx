import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <section className="glass-panel fade-in" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '55vh',
      padding: '3rem',
      textAlign: 'center'
    }}>
      <div style={{
        fontSize: '4.5rem',
        marginBottom: '1rem',
        animation: 'float 6s ease-in-out infinite',
        background: 'linear-gradient(135deg, #a5b4fc, #f472b6, #2dd4bf)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}>
        ⚡
      </div>
      
      <h1 style={{
        fontSize: '3rem',
        fontWeight: 800,
        marginBottom: '1.5rem',
        background: 'linear-gradient(135deg, #fff 40%, #a5b4fc 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        letterSpacing: '-1px'
      }}>
        Добро пожаловать в SpeedrunTeam
      </h1>
      
      <p style={{
        fontSize: '1.25rem',
        color: 'var(--text-secondary)',
        maxWidth: '650px',
        lineHeight: '1.7',
        marginBottom: '2.5rem'
      }}>
        Профессиональная экосистема для планирования скоростных забегов, координации команд и отслеживания мировых рекордов. Создавайте команды и регистрируйте лучшие результаты в режиме реального времени!
      </p>

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link to="/teams" className="btn btn-primary" style={{ fontSize: '1.05rem', padding: '0.9rem 2rem' }}>
          👥 Начать работу с командами
        </Link>
        <Link to="/runs" className="btn btn-secondary" style={{ fontSize: '1.05rem', padding: '0.9rem 2rem' }}>
          ⏱️ Просмотр забегов
        </Link>
      </div>
    </section>
  );
};

export default Home;
