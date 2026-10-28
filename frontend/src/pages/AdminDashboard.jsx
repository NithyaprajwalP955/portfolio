import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  adminFetchProfile, adminUpdateProfile,
  adminExperience, adminProjects, adminSkillCategories,
  adminSkills, adminEducation, adminCertifications,
  adminAchievements, adminMessages,
} from '../api';

// ── Helpers ──────────────────────────────────────────────────────────────────

function Modal({ title, onClose, children }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 18, color: 'var(--foreground)' }}>{title}</h3>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        {children}
      </div>
    </div>
  );
}

function FormField({ label, name, value, onChange, type = 'text', placeholder, required, textarea }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label className="admin-form-label">{label}{required && ' *'}</label>
      {textarea
        ? <textarea className="admin-form-input" name={name} value={value || ''} onChange={onChange} placeholder={placeholder} rows={3} style={{ resize: 'vertical' }} />
        : <input className="admin-form-input" type={type} name={name} value={value || ''} onChange={onChange} placeholder={placeholder} required={required} />
      }
    </div>
  );
}

function JSONField({ label, name, value, onChange }) {
  const strVal = Array.isArray(value) ? value.join('\n') : '';
  const handleChange = (e) => {
    onChange({ target: { name, value: e.target.value.split('\n').filter(Boolean) } });
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label className="admin-form-label">{label} (one per line)</label>
      <textarea className="admin-form-input" value={strVal} onChange={handleChange} rows={3} style={{ resize: 'vertical' }} />
    </div>
  );
}

function Badge({ children, color = 'var(--primary)' }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', padding: '2px 8px', borderRadius: 6,
      fontSize: 11, fontWeight: 600, background: `${color}15`, color, border: `1px solid ${color}30`
    }}>{children}</span>
  );
}

// ── CRUD Section Component ────────────────────────────────────────────────────

function CRUDSection({ title, api, columns, renderForm, emptyForm }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null); // null | { mode: 'create'|'edit', data: {} }
  const [formData, setFormData] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const res = await api.list();
      setItems(res.data);
    } catch { }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => {
    setFormData(emptyForm);
    setModal({ mode: 'create' });
    setMsg(null);
  };

  const openEdit = (item) => {
    setFormData({ ...item });
    setModal({ mode: 'edit' });
    setMsg(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(f => ({ ...f, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (modal.mode === 'create') {
        await api.create(formData);
      } else {
        await api.update(formData.id, formData);
      }
      setMsg({ type: 'success', text: `${modal.mode === 'create' ? 'Created' : 'Updated'} successfully!` });
      await load();
      setTimeout(() => setModal(null), 800);
    } catch (err) {
      setMsg({ type: 'error', text: 'Failed to save. Please check your inputs.' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    try {
      await api.remove(id);
      await load();
    } catch { alert('Failed to delete.'); }
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <h2 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 22, color: 'var(--foreground)' }}>{title}</h2>
        <button className="btn-primary btn-sm" onClick={openCreate}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14"/><path d="M5 12h14"/>
          </svg>
          Add New
        </button>
      </div>

      <div className="admin-card">
        {loading ? (
          <div style={{ padding: 40, textAlign: 'center' }}>
            <div className="spinner" style={{ margin: '0 auto' }} />
          </div>
        ) : items.length === 0 ? (
          <div style={{ padding: 40, textAlign: 'center', color: 'var(--foreground-muted)' }}>
            No items yet. Click "Add New" to get started.
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                {columns.map(c => <th key={c.key}>{c.label}</th>)}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id}>
                  {columns.map(c => (
                    <td key={c.key}>
                      {c.render ? c.render(item[c.key], item) : (
                        <span style={{ display: 'block', maxWidth: 240, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {Array.isArray(item[c.key]) ? item[c.key].join(', ') : item[c.key] || '—'}
                        </span>
                      )}
                    </td>
                  ))}
                  <td>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button onClick={() => openEdit(item)} className="btn-secondary btn-sm" style={{ padding: '6px 12px' }}>
                        Edit
                      </button>
                      <button onClick={() => handleDelete(item.id)}
                        style={{
                          padding: '6px 12px', borderRadius: 8, border: '1.5px solid rgba(239,68,68,0.3)',
                          background: 'rgba(239,68,68,0.06)', color: '#B91C1C', fontSize: 12, fontWeight: 600, cursor: 'pointer',
                          transition: 'all 0.2s ease',
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {modal && (
        <Modal
          title={`${modal.mode === 'create' ? 'Add' : 'Edit'} ${title.replace(/s$/, '')}`}
          onClose={() => setModal(null)}
        >
          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {msg && <div className={`alert alert-${msg.type}`}>{msg.text}</div>}
            {renderForm(formData, handleChange)}
            <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
              <button type="button" className="btn-secondary btn-sm" onClick={() => setModal(null)} style={{ flex: 1, justifyContent: 'center' }}>
                Cancel
              </button>
              <button type="submit" className="btn-primary btn-sm" disabled={saving} style={{ flex: 1, justifyContent: 'center' }}>
                {saving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

// ── Profile Section (special - no list) ──────────────────────────────────────

function ProfileSection() {
  const [data, setData] = useState({});
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

  useEffect(() => {
    adminFetchProfile().then(r => {
      setData(r.data);
      if (r.data.photo_url) setPhotoPreview(r.data.photo_url);
    }).catch(() => {});
  }, []);

  const handleChange = (e) => setData(d => ({ ...d, [e.target.name]: e.target.value }));

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMsg(null);
    try {
      if (photoFile) {
        // Use multipart/form-data when uploading a photo
        const formData = new FormData();
        Object.entries(data).forEach(([k, v]) => {
          if (k !== 'photo' && v !== null && v !== undefined) formData.append(k, v);
        });
        formData.append('photo', photoFile);
        await adminUpdateProfile(formData);
      } else {
        await adminUpdateProfile(data);
      }
      setMsg({ type: 'success', text: 'Profile updated successfully!' });
      setPhotoFile(null);
    } catch {
      setMsg({ type: 'error', text: 'Failed to update profile.' });
    } finally {
      setSaving(false);
    }
  };

  const fields = [
    { label: 'Full Name', name: 'name', required: true },
    { label: 'Title / Role', name: 'title', required: true },
    { label: 'Bio', name: 'bio', textarea: true },
    { label: 'Email', name: 'email', type: 'email' },
    { label: 'Phone', name: 'phone' },
    { label: 'GitHub URL', name: 'github' },
    { label: 'LinkedIn URL', name: 'linkedin' },
    { label: 'Address', name: 'address' },
    { label: 'Resume URL', name: 'resume_url' },
    { label: 'Years of Experience', name: 'years_experience', type: 'number' },
    { label: 'Projects Count', name: 'projects_count', type: 'number' },
    { label: 'Certifications Count', name: 'certs_count', type: 'number' },
  ];

  return (
    <div>
      <h2 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 22, color: 'var(--foreground)', marginBottom: 20 }}>Profile</h2>

      {/* Photo Upload Card */}
      <div className="admin-card" style={{ padding: 24, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 24 }}>
        {/* Preview */}
        <div style={{
          width: 100, height: 100, borderRadius: '50%', overflow: 'hidden', flexShrink: 0,
          background: 'linear-gradient(135deg, #EEF2FF, #E0E7FF)',
          border: '3px solid rgba(79,70,229,0.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {photoPreview
            ? <img src={photoPreview} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            : <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
          }
        </div>

        {/* Upload controls */}
        <div style={{ flex: 1 }}>
          <p style={{ fontWeight: 700, fontSize: 15, color: 'var(--foreground)', marginBottom: 4 }}>Profile Photo</p>
          <p style={{ fontSize: 13, color: 'var(--foreground-muted)', marginBottom: 12 }}>
            {photoFile ? `Selected: ${photoFile.name}` : 'JPG, PNG or WEBP. Max 5MB.'}
          </p>
          <label style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '8px 16px', borderRadius: 10, cursor: 'pointer',
            background: 'rgba(79,70,229,0.08)', border: '1.5px solid rgba(79,70,229,0.2)',
            color: 'var(--primary)', fontSize: 13, fontWeight: 600, transition: 'all 0.2s',
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="17 8 12 3 7 8"/>
              <line x1="12" x2="12" y1="3" y2="15"/>
            </svg>
            Choose Photo
            <input type="file" accept="image/*" onChange={handlePhotoChange} style={{ display: 'none' }} />
          </label>
        </div>
      </div>

      {/* Profile Fields */}
      <div className="admin-card" style={{ padding: 32 }}>
        <form onSubmit={handleSave} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {msg && <div className={`alert alert-${msg.type}`} style={{ gridColumn: '1/-1' }}>{msg.text}</div>}
          {fields.map(f => (
            <div key={f.name} style={{ gridColumn: f.textarea || f.name === 'address' ? '1/-1' : 'auto' }}>
              <FormField {...f} value={data[f.name]} onChange={handleChange} />
            </div>
          ))}
          <div style={{ gridColumn: '1/-1', display: 'flex', justifyContent: 'flex-end', marginTop: 8 }}>
            <button type="submit" className="btn-primary" disabled={saving} style={{ justifyContent: 'center' }}>
              {saving ? 'Saving...' : 'Save Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Main Dashboard ────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { key: 'profile', label: 'Profile', icon: '👤' },
  { key: 'experience', label: 'Experience', icon: '💼' },
  { key: 'projects', label: 'Projects', icon: '🚀' },
  { key: 'skill-categories', label: 'Skill Categories', icon: '🏷️' },
  { key: 'skills', label: 'Skills', icon: '⚡' },
  { key: 'education', label: 'Education', icon: '🎓' },
  { key: 'certifications', label: 'Certifications', icon: '📜' },
  { key: 'achievements', label: 'Achievements', icon: '🏆' },
  { key: 'messages', label: 'Messages', icon: '✉️' },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('profile');
  const { user, logout } = useAuth();

  const renderSection = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileSection />;

      case 'experience':
        return (
          <CRUDSection
            title="Experience"
            api={adminExperience}
            emptyForm={{ role: '', company: '', start_date: '', end_date: '', description: '', bullets: [], technologies: [], order: 0 }}
            columns={[
              { key: 'role', label: 'Role' },
              { key: 'company', label: 'Company' },
              { key: 'start_date', label: 'From' },
              { key: 'end_date', label: 'To' },
            ]}
            renderForm={(data, onChange) => (
              <>
                <FormField label="Job Role / Title" name="role" value={data.role} onChange={onChange} required />
                <FormField label="Company" name="company" value={data.company} onChange={onChange} required />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <FormField label="Start Date" name="start_date" value={data.start_date} onChange={onChange} placeholder="e.g. Jan 2024" />
                  <FormField label="End Date" name="end_date" value={data.end_date} onChange={onChange} placeholder="e.g. Dec 2024 or Present" />
                </div>
                <FormField label="Description" name="description" value={data.description} onChange={onChange} textarea />
                <JSONField label="Bullet Points" name="bullets" value={data.bullets} onChange={onChange} />
                <JSONField label="Technologies" name="technologies" value={data.technologies} onChange={onChange} />
                <FormField label="Order" name="order" value={data.order} onChange={onChange} type="number" />
              </>
            )}
          />
        );

      case 'projects':
        return (
          <CRUDSection
            title="Projects"
            api={adminProjects}
            emptyForm={{ name: '', description: '', technologies: [], github_url: '', live_url: '', order: 0 }}
            columns={[
              { key: 'name', label: 'Name' },
              { key: 'description', label: 'Description' },
              { key: 'github_url', label: 'GitHub', render: v => v ? <a href={v} target="_blank" rel="noreferrer" style={{ color: 'var(--primary)' }}>Link</a> : '—' },
            ]}
            renderForm={(data, onChange) => (
              <>
                <FormField label="Project Name" name="name" value={data.name} onChange={onChange} required />
                <FormField label="Description" name="description" value={data.description} onChange={onChange} textarea />
                <JSONField label="Technologies" name="technologies" value={data.technologies} onChange={onChange} />
                <FormField label="GitHub URL" name="github_url" value={data.github_url} onChange={onChange} type="url" />
                <FormField label="Live URL" name="live_url" value={data.live_url} onChange={onChange} type="url" />
                <FormField label="Order" name="order" value={data.order} onChange={onChange} type="number" />
              </>
            )}
          />
        );

      case 'skill-categories':
        return (
          <CRUDSection
            title="Skill Categories"
            api={adminSkillCategories}
            emptyForm={{ name: '', icon: 'code', order: 0 }}
            columns={[
              { key: 'name', label: 'Category Name' },
              { key: 'icon', label: 'Icon Key' },
              { key: 'order', label: 'Order' },
            ]}
            renderForm={(data, onChange) => (
              <>
                <FormField label="Category Name" name="name" value={data.name} onChange={onChange} required />
                <div>
                  <label className="admin-form-label">Icon Key</label>
                  <select className="admin-form-input" name="icon" value={data.icon || 'code'} onChange={onChange}>
                    {['code', 'globe', 'database', 'tool', 'star', 'language'].map(v => (
                      <option key={v} value={v}>{v}</option>
                    ))}
                  </select>
                </div>
                <FormField label="Order" name="order" value={data.order} onChange={onChange} type="number" />
              </>
            )}
          />
        );

      case 'skills':
        return (
          <CRUDSection
            title="Skills"
            api={adminSkills}
            emptyForm={{ category: '', name: '', order: 0 }}
            columns={[
              { key: 'name', label: 'Skill Name' },
              { key: 'category', label: 'Category ID' },
              { key: 'order', label: 'Order' },
            ]}
            renderForm={(data, onChange) => (
              <>
                <FormField label="Skill Name" name="name" value={data.name} onChange={onChange} required />
                <FormField label="Category ID (number)" name="category" value={data.category} onChange={onChange} type="number" />
                <FormField label="Order" name="order" value={data.order} onChange={onChange} type="number" />
              </>
            )}
          />
        );

      case 'education':
        return (
          <CRUDSection
            title="Education"
            api={adminEducation}
            emptyForm={{ degree: '', field: '', institution: '', start_year: '', end_year: '', score: '', order: 0 }}
            columns={[
              { key: 'degree', label: 'Degree' },
              { key: 'institution', label: 'Institution' },
              { key: 'score', label: 'Score' },
            ]}
            renderForm={(data, onChange) => (
              <>
                <FormField label="Degree" name="degree" value={data.degree} onChange={onChange} required />
                <FormField label="Field of Study" name="field" value={data.field} onChange={onChange} />
                <FormField label="Institution" name="institution" value={data.institution} onChange={onChange} required />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <FormField label="Start Year" name="start_year" value={data.start_year} onChange={onChange} placeholder="2020" />
                  <FormField label="End Year" name="end_year" value={data.end_year} onChange={onChange} placeholder="2024 or Present" />
                </div>
                <FormField label="Score / GPA" name="score" value={data.score} onChange={onChange} placeholder="e.g. 8.5 CGPA" />
                <FormField label="Order" name="order" value={data.order} onChange={onChange} type="number" />
              </>
            )}
          />
        );

      case 'certifications':
        return (
          <CRUDSection
            title="Certifications"
            api={adminCertifications}
            emptyForm={{ name: '', issuer: '', date: '', credential_url: '', order: 0 }}
            columns={[
              { key: 'name', label: 'Certificate Name' },
              { key: 'issuer', label: 'Issuer' },
              { key: 'date', label: 'Date' },
            ]}
            renderForm={(data, onChange) => (
              <>
                <FormField label="Certificate Name" name="name" value={data.name} onChange={onChange} required />
                <FormField label="Issuer / Organization" name="issuer" value={data.issuer} onChange={onChange} required />
                <FormField label="Date" name="date" value={data.date} onChange={onChange} placeholder="e.g. Jan 2024" />
                <FormField label="Credential URL" name="credential_url" value={data.credential_url} onChange={onChange} type="url" />
                <FormField label="Order" name="order" value={data.order} onChange={onChange} type="number" />
              </>
            )}
          />
        );

      case 'achievements':
        return (
          <CRUDSection
            title="Achievements"
            api={adminAchievements}
            emptyForm={{ title: '', description: '', order: 0 }}
            columns={[
              { key: 'title', label: 'Achievement Title' },
              { key: 'description', label: 'Description' },
            ]}
            renderForm={(data, onChange) => (
              <>
                <FormField label="Achievement Title" name="title" value={data.title} onChange={onChange} required />
                <FormField label="Description" name="description" value={data.description} onChange={onChange} textarea />
                <FormField label="Order" name="order" value={data.order} onChange={onChange} type="number" />
              </>
            )}
          />
        );

      case 'messages':
        return <MessagesSection />;

      default:
        return null;
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F1F5F9' }}>
      {/* Sidebar */}
      <aside className="admin-sidebar">
        {/* Header */}
        <div style={{ padding: '0 20px 20px', borderBottom: '1px solid rgba(226,232,240,0.8)', marginBottom: 8 }}>
          <div style={{
            width: 44, height: 44, borderRadius: 14,
            background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: 12, boxShadow: '0 4px 12px rgba(79,70,229,0.3)',
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </div>
          <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: 15, color: 'var(--foreground)' }}>Admin Panel</p>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--foreground-muted)' }}>
            Logged in as <strong>{user?.username}</strong>
          </p>
        </div>

        {/* Nav Items */}
        <nav>
          {NAV_ITEMS.map(item => (
            <button
              key={item.key}
              className={`admin-nav-item${activeTab === item.key ? ' active' : ''}`}
              onClick={() => setActiveTab(item.key)}
              style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <span style={{ fontSize: 16 }}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        {/* Footer actions */}
        <div style={{ position: 'absolute', bottom: 20, left: 0, right: 0, padding: '0 12px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Link
            to="/"
            style={{
              display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', borderRadius: 10,
              fontSize: 13, fontWeight: 600, color: 'var(--foreground-muted)', textDecoration: 'none', transition: 'all 0.2s',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            View Portfolio
          </Link>
          <button
            onClick={logout}
            style={{
              display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', borderRadius: 10,
              fontSize: 13, fontWeight: 600, color: '#B91C1C', background: 'none', border: 'none', cursor: 'pointer',
              textAlign: 'left', transition: 'all 0.2s',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/>
            </svg>
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-content">
        <div style={{ maxWidth: 1000 }}>
          {renderSection()}
        </div>
      </main>
    </div>
  );
}

// ── Messages Section ──────────────────────────────────────────────────────────

function MessagesSection() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const res = await adminMessages.list();
      setMessages(res.data);
    } catch { }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    try {
      await adminMessages.remove(id);
      await load();
    } catch { alert('Failed to delete.'); }
  };

  return (
    <div>
      <h2 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 22, color: 'var(--foreground)', marginBottom: 20 }}>
        Messages <Badge>{messages.length}</Badge>
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {loading ? (
          <div style={{ padding: 40, textAlign: 'center' }}><div className="spinner" style={{ margin: '0 auto' }} /></div>
        ) : messages.length === 0 ? (
          <div className="admin-card" style={{ padding: 40, textAlign: 'center', color: 'var(--foreground-muted)' }}>
            No messages received yet.
          </div>
        ) : (
          messages.map(msg => (
            <div key={msg.id} className="admin-card" style={{ padding: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                <div>
                  <span style={{ fontWeight: 700, fontSize: 15, color: 'var(--foreground)' }}>{msg.name}</span>
                  <span style={{ color: 'var(--foreground-muted)', fontSize: 13, marginLeft: 8 }}>{msg.email}</span>
                </div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--foreground-muted)' }}>
                    {new Date(msg.created_at).toLocaleDateString()}
                  </span>
                  <button
                    onClick={() => handleDelete(msg.id)}
                    style={{
                      padding: '4px 10px', borderRadius: 6, border: '1px solid rgba(239,68,68,0.3)',
                      background: 'rgba(239,68,68,0.06)', color: '#B91C1C', fontSize: 12, fontWeight: 600, cursor: 'pointer',
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
              {msg.subject && (
                <p style={{ fontWeight: 600, fontSize: 14, color: 'var(--foreground)', marginBottom: 6 }}>
                  Subject: {msg.subject}
                </p>
              )}
              <p style={{ fontSize: 14, color: 'var(--foreground-muted)', lineHeight: 1.65 }}>{msg.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
