export const formatDate = (dateStr) => {
    try {
        const date = new Date(dateStr);
        const formatted = date.toLocaleDateString('es-CO', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
            timeZone: 'America/Bogota',
            timeZoneName: 'short'
        });
        return `${formatted}`;
    } catch (e) { return dateStr; }
};