import React from 'react';

const About: React.FC = () => {
  return (
    <div className="fade-in">
      <header style={{ marginBottom: '2rem' }}>
        <h1 className="page-title">О проекте</h1>
        <p className="page-subtitle">Узнайте больше об архитектуре и назначении платформы SpeedrunTeam.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        <section className="glass-panel" style={{ padding: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#fff', fontWeight: 700 }}>
            Что такое SpeedrunTeam?
          </h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '1.05rem', marginBottom: '1rem' }}>
            SpeedrunTeam — это централизованный хаб для геймеров и спидран-сообществ. Платформа призвана упростить организацию командных забегов на скорость, консолидировать историю заездов и вести подсчет личных и командных достижений.
          </p>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '1.05rem' }}>
            Здесь каждая секунда на счету, а каждая сотая доля секунды может определить лидера. С помощью наших удобных инструментов вы можете регистрировать участников и мгновенно фиксировать результаты.
          </p>
        </section>

        <section className="glass-panel" style={{ padding: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#fff', fontWeight: 700 }}>
            Технологический стек
          </h2>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-primary)' }}>
              <span style={{ fontSize: '1.25rem', color: '#61dafb' }}>⚛️</span>
              <div>
                <strong>React 18 & TypeScript:</strong>
                <span style={{ display: 'block', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Интерактивный, типизированный и производительный пользовательский интерфейс.</span>
              </div>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-primary)' }}>
              <span style={{ fontSize: '1.25rem', color: '#38bdf8' }}>⚡</span>
              <div>
                <strong>Vite:</strong>
                <span style={{ display: 'block', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Сверхбыстрая сборка фронтенда и горячая замена модулей (HMR).</span>
              </div>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-primary)' }}>
              <span style={{ fontSize: '1.25rem', color: '#68a063' }}>🟢</span>
              <div>
                <strong>Node.js & Express:</strong>
                <span style={{ display: 'block', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Надежный REST API для обработки командных запросов.</span>
              </div>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-primary)' }}>
              <span style={{ fontSize: '1.25rem', color: '#003b57' }}>🗄️</span>
              <div>
                <strong>sql.js (SQLite Wasm):</strong>
                <span style={{ display: 'block', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Легковесная реляционная база данных для персистентного хранения.</span>
              </div>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default About;
