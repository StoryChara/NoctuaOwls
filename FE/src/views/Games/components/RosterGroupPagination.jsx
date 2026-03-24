import { useState } from 'react';

import { FaUserShield, FaUserGraduate, FaEnvelope, FaChevronLeft } from 'react-icons/fa';
import { getGroupColor } from '../../../utils/getGroupColor';

export function RosterGroup({ group }) {
    const [page, setPage] = useState(1);
    const ITEMS_PER_PAGE = 6;

    const totalPages = Math.ceil(group.members.length / ITEMS_PER_PAGE);
    const displayedMembers = group.members.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

    return (
        <div className="roster-group">
            <h3 className="roster-group-title">
                <span
                    className="roster-color-dot"
                    style={{ backgroundColor: getGroupColor(group.name) }}
                />
                {group.name}
            </h3>
            <div className="row g-3">
                {displayedMembers.map((u, idx) => (
                    <div key={`${group.name}-${u.id_usuario}-${idx}`} className="col-12 col-sm-6">
                        <div className={`player-card ${group.name.includes('Staff') ? 'staff-card-variant' : ''}`}>
                            <div className="player-info">
                                <div className="player-header">
                                    <h4 className="player-name">{u.nombre} {u.apellido}</h4>
                                </div>
                                <div className="player-details">
                                    <span>
                                        {u.cargos.map(c => !c.includes('Noctua') && (
                                            <span key={c} className="role-badge"><FaUserShield />{c}</span>
                                        ))}
                                    </span>

                                    <span title="Carrera"><FaUserGraduate /> {u.carrera}</span>
                                    {u.correo && <a href={`mailto:${u.correo}`} title={u.correo}><FaEnvelope /> Contacto</a>}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
                <div className="pagination-controls d-flex justify-content-center align-items-center gap-3 mt-3">
                    <button
                        className="btn btn-sm"
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        disabled={page === 1}
                        title="Anterior"
                    >
                        <FaChevronLeft />
                    </button>
                    <span className="small fw-bold">Página {page} de {totalPages}</span>
                    <button
                        className="btn btn-sm"
                        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                        disabled={page === totalPages}
                        title="Siguiente"
                    >
                        <FaChevronLeft style={{ transform: 'rotate(180deg)' }} />
                    </button>
                </div>
        </div>
    );
};