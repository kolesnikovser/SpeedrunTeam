import React, { useState, useEffect } from 'react';

interface Team {
  id: number;
  name: string;
}

interface Run {
  id: number;
  team: string;
  team_id?: number; // optionally used for edit
  time: string;
  date: string;
}

const Runs: React.FC = () => {
  const [runs, setRuns] = useState<Run[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  
  // Form states
  const [teamId, setTeamId] = useState('');
  const [time, setTime] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  
  // Edit states
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingTeamId, setEditingTeamId] = useState('');
  const [editingTime, setEditingTime] = useState('');
  const [editingDate, setEditingDate] = useState('');
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch both runs and teams
  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Load teams first
      const teamsRes = await fetch('/teams');
      if (!teamsRes.ok) throw new Error('Ошибка при загрузке команд');
      const teamsData = await teamsRes.json();
      setTeams(teamsData);

      // Load runs
      const runsRes = await fetch('/runs');
      if (!runsRes.ok) throw new Error('Ошибка при загрузке записей забегов');
      const runsData = await runsRes.json();
      setRuns(runsData);
      
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Что-то пошло не так');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle Add Run
  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamId || !time.trim() || !date) return;

    try {
      const res = await fetch('/runs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          team_id: parseInt(teamId, 10),
          time,
          date
        }),
      });
      if (!res.ok) throw new Error('Не удалось добавить забег');
      
      // Reset form (keep date)
      setTeamId('');
      setTime('');
      fetchData();
    } catch (err: any) {
      alert(err.message || 'Ошибка');
    }
  };

  // Handle Save Edit
  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTeamId || !editingTime.trim() || !editingDate || editingId === null) return;

    try {
      const res = await fetch(`/runs/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          team_id: parseInt(editingTeamId, 10),
          time: editingTime,
          date: editingDate
        }),
      });
      if (!res.ok) throw new Error('Не удалось сохранить изменения');
      
      setEditingId(null);
      setEditingTeamId('');
      setEditingTime('');
      setEditingDate('');
      fetchData();
    } catch (err: any) {
      alert(err.message || 'Ошибка');
    }
  };

  // Handle Delete Run
  const handleDelete = async (id: number) => {
    if (!confirm('Вы уверены, что хотите удалить эту запись забега?')) return;

    try {
      const res = await fetch(`/runs/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Не удалось удалить запись');
      fetchData();
    } catch (err: any) {
      alert(err.message || 'Ошибка');
    }
  };

  // Pre-fill edit form
  const startEdit = (run: Run) => {
    // Find the team from the team list to get its ID
    const matchingTeam = teams.find(t => t.name === run.team);
    
    setEditingId(run.id);
    setEditingTeamId(matchingTeam ? matchingTeam.id.toString() : '');
    setEditingTime(run.time);
    setEditingDate(run.date || new Date().toISOString().split('T')[0]);
  };

  return (
    <div className="fade-in">
      <header style={{ marginBottom: '2rem' }}>
        <h1 className="page-title">Записи забегов</h1>
        <p className="page-subtitle">Регистрируйте результаты спидранов ваших команд и следите за рекордами.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', alignItems: 'start' }}>
        
        {/* Form Panel */}
        <section className="glass-panel" style={{ padding: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', fontWeight: 700, color: '#fff' }}>
            {editingId !== null ? 'Редактировать запись' : 'Добавить результат'}
          </h2>

          {teams.length === 0 ? (
            <div style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '1rem 0' }}>
              ⚠️ Прежде чем добавлять результаты, необходимо <a href="/teams" style={{ color: 'var(--primary)', textDecoration: 'underline', fontWeight: 600 }}>создать хотя бы одну команду</a>.
            </div>
          ) : (
            <form onSubmit={editingId !== null ? handleSaveEdit : handleAdd}>
              <div className="form-group">
                <label className="form-label" htmlFor="select-team">Команда</label>
                <select
                  id="select-team"
                  className="form-control"
                  value={editingId !== null ? editingTeamId : teamId}
                  onChange={(e) => editingId !== null ? setEditingTeamId(e.target.value) : setTeamId(e.target.value)}
                  required
                >
                  <option value="">Выберите команду...</option>
                  {teams.map(t => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="run-time">Время (например, 01:23:45.67)</label>
                <input
                  id="run-time"
                  className="form-control"
                  type="text"
                  placeholder="ЧЧ:ММ:СС.мм"
                  value={editingId !== null ? editingTime : time}
                  onChange={(e) => editingId !== null ? setEditingTime(e.target.value) : setTime(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="run-date">Дата забега</label>
                <input
                  id="run-date"
                  className="form-control"
                  type="date"
                  value={editingId !== null ? editingDate : date}
                  onChange={(e) => editingId !== null ? setEditingDate(e.target.value) : setDate(e.target.value)}
                  required
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                <button className="btn btn-primary" type="submit" style={{ flex: 1 }}>
                  {editingId !== null ? 'Сохранить' : 'Отправить'}
                </button>
                
                {editingId !== null && (
                  <button
                    className="btn btn-secondary"
                    type="button"
                    onClick={() => {
                      setEditingId(null);
                      setEditingTeamId('');
                      setEditingTime('');
                      setEditingDate('');
                    }}
                    style={{ flex: 1 }}
                  >
                    Отмена
                  </button>
                )}
              </div>
            </form>
          )}
        </section>

        {/* List Panel */}
        <section className="glass-panel" style={{ padding: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', fontWeight: 700, color: '#fff' }}>
            Результаты забегов
          </h2>

          {error && (
            <div style={{ padding: '1rem', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '8px', color: '#fca5a5', marginBottom: '1rem' }}>
              {error}
            </div>
          )}

          {loading ? (
            <div style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '2rem' }}>
              Загрузка забегов...
            </div>
          ) : runs.length === 0 ? (
            <div style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem' }}>
              Забегов пока не зарегистрировано. Будьте первыми!
            </div>
          ) : (
            <div className="table-container">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th style={{ width: '60px' }}>ID</th>
                    <th>Команда</th>
                    <th>Время</th>
                    <th>Дата</th>
                    <th style={{ textAlign: 'right', width: '130px' }}>Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {runs.map((run) => (
                    <tr key={run.id}>
                      <td style={{ color: 'var(--text-muted)' }}>#{run.id}</td>
                      <td style={{ fontWeight: 600, color: '#fff' }}>{run.team}</td>
                      <td>
                        <span style={{
                          display: 'inline-block',
                          background: 'rgba(20, 184, 166, 0.15)',
                          color: '#2dd4bf',
                          padding: '0.2rem 0.6rem',
                          borderRadius: '6px',
                          fontFamily: 'monospace',
                          fontWeight: 600,
                          fontSize: '0.9rem'
                        }}>
                          ⏱️ {run.time}
                        </span>
                      </td>
                      <td style={{ color: 'var(--text-secondary)' }}>{run.date}</td>
                      <td style={{ textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', gap: '0.5rem' }}>
                          <button
                            className="btn btn-secondary btn-sm"
                            onClick={() => startEdit(run)}
                            title="Редактировать"
                          >
                            ✏️
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDelete(run.id)}
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

export default Runs;
