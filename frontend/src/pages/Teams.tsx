import React, { useState, useEffect } from 'react';

interface Team {
  id: number;
  name: string;
}

const Teams: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [name, setName] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all teams
  const fetchTeams = async () => {
    try {
      setLoading(true);
      const res = await fetch('/teams');
      if (!res.ok) throw new Error('Ошибка при загрузке команд');
      const data = await res.json();
      setTeams(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Что-то пошло не так');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  // Handle Add Team
  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      const res = await fetch('/teams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      if (!res.ok) throw new Error('Не удалось добавить команду');
      setName('');
      fetchTeams();
    } catch (err: any) {
      alert(err.message || 'Ошибка');
    }
  };

  // Handle Edit Team
  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingName.trim() || editingId === null) return;

    try {
      const res = await fetch(`/teams/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: editingName }),
      });
      if (!res.ok) throw new Error('Не удалось сохранить изменения');
      setEditingId(null);
      setEditingName('');
      fetchTeams();
    } catch (err: any) {
      alert(err.message || 'Ошибка');
    }
  };

  // Handle Delete Team
  const handleDelete = async (id: number) => {
    if (!confirm('Вы уверены, что хотите удалить эту команду? Все связанные записи скоростных забегов также будут удалены.')) return;

    try {
      const res = await fetch(`/teams/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Не удалось удалить команду');
      fetchTeams();
    } catch (err: any) {
      alert(err.message || 'Ошибка');
    }
  };

  return (
    <div className="fade-in">
      <header style={{ marginBottom: '2rem' }}>
        <h1 className="page-title">Команды</h1>
        <p className="page-subtitle">Создавайте команды и управляйте участниками ваших спидран-сессий.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', alignItems: 'start' }}>
        
        {/* Form Panel */}
        <section className="glass-panel" style={{ padding: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', fontWeight: 700, color: '#fff' }}>
            {editingId !== null ? 'Редактировать команду' : 'Новая команда'}
          </h2>
          
          <form onSubmit={editingId !== null ? handleSaveEdit : handleAdd}>
            <div className="form-group">
              <label className="form-label" htmlFor="team-name">Название команды</label>
              <input
                id="team-name"
                className="form-control"
                type="text"
                placeholder="Введите название..."
                value={editingId !== null ? editingName : name}
                onChange={(e) => editingId !== null ? setEditingName(e.target.value) : setName(e.target.value)}
                required
              />
            </div>
            
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
              <button className="btn btn-primary" type="submit" style={{ flex: 1 }}>
                {editingId !== null ? 'Сохранить' : 'Добавить'}
              </button>
              
              {editingId !== null && (
                <button
                  className="btn btn-secondary"
                  type="button"
                  onClick={() => {
                    setEditingId(null);
                    setEditingName('');
                  }}
                  style={{ flex: 1 }}
                >
                  Отмена
                </button>
              )}
            </div>
          </form>
        </section>

        {/* List Panel */}
        <section className="glass-panel" style={{ padding: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', fontWeight: 700, color: '#fff' }}>
            Список команд
          </h2>

          {error && (
            <div style={{ padding: '1rem', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '8px', color: '#fca5a5', marginBottom: '1rem' }}>
              {error}
            </div>
          )}

          {loading ? (
            <div style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '2rem' }}>
              Загрузка команд...
            </div>
          ) : teams.length === 0 ? (
            <div style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem' }}>
              Команд пока нет. Создайте первую команду слева!
            </div>
          ) : (
            <div className="table-container">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th style={{ width: '80px' }}>ID</th>
                    <th>Название команды</th>
                    <th style={{ textAlign: 'right', width: '150px' }}>Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {teams.map((team) => (
                    <tr key={team.id}>
                      <td style={{ color: 'var(--text-muted)' }}>#{team.id}</td>
                      <td style={{ fontWeight: 600, color: '#fff' }}>{team.name}</td>
                      <td style={{ textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', gap: '0.5rem' }}>
                          <button
                            className="btn btn-secondary btn-sm"
                            onClick={() => {
                              setEditingId(team.id);
                              setEditingName(team.name);
                            }}
                            title="Редактировать"
                          >
                            ✏️
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDelete(team.id)}
                            title="Удалить"
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Teams;
