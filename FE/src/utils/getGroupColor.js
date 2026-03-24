export const getGroupColor = (groupName) => {
    switch (groupName) {
        case 'Noctua Gold': return '#eea734'; // Dorado
        case 'Noctua Black': return '#141026'; // Negro
        case 'Noctua White': return '#faecd2'; // Blanco
        case 'Noctua Rose': return '#FF69B4'; // Rosado
        case 'Noctua Academy': return '#4c98ff'; // Azul
        case 'Staff & Coordinación': return '#ff432e' // Staff
        default: return '#7e7e7e'; // Staff fallback
    }
};