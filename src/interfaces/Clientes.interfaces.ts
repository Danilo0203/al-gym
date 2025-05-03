export interface Clientes {
  id: number;
  fechaNacimiento: Date;
  sexo: string;
  estatura: number;
  peso: number;
  tipoCuerpo: string;
  inscripcion: Date;
  plan: string;
  valor: number;
  fechaInicio: Date;
  userID: string;
  imagenPerfil: null;
  descuento: number;
  diasPorSemana: number;
  phone: string;
  nombre: string;
  estado: '1' | '0';
}
