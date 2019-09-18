export interface Reclamo {
  id: number;
  fecha: string;
  descripcion: string;
  nroOrden: number;
  fuente: string;
  estado: {
    id: number;
    descripcion: string;
  };
  usuario: {
    id: number;
    idSSO: number;
    nombre: string;
    rol: string;
    telefono: string;
    email: string;
    direccion: string;
  };
}
