import { addDays, addMonths, addYears } from 'date-fns';

export function calcularFechaFin(plan: string, fechaInicio: string): Date {
  const inicio = new Date(fechaInicio);
  switch (plan.toLowerCase()) {
    case 'dia':
      return addDays(inicio, 1);
    case 'semanal':
      return addDays(inicio, 7);
    case 'mensual':
      return addMonths(inicio, 1);
    case 'anual':
      return addYears(inicio, 1);
    default:
      return inicio;
  }
}
