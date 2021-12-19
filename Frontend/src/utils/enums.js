const Roles = {
    ADMINISTRADOR: 'Administrador',
    ESTUDIANTE: 'Estudiante',
    LIDER: 'Lider',
};

const EstadoUsuario = {
    PENDIENTE: 'Pendiente',
    AUTORIZADO: 'Autorizado',
    NO_AUTORIZADO: 'No autorizado',
};

const EstadoProyecto = {
    ACTIVO: 'Activo',
    INACTIVO: 'Inactivo',
};

const FaseProyecto = {
    INICIADO : 'Iniciado',
    DESARROLLO : 'En desarrollo',
    TERMINADO :  'Terminado',
};

const EstadoInscripcion = {
    ACEPTADA: 'Aceptada',
    RECHAZADA: 'Rechazada',
    PENDIENTE: 'Pendiente'
}

export { Roles, EstadoUsuario, EstadoProyecto, FaseProyecto, EstadoInscripcion};