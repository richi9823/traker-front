export const AlertType = {
    SPEED: 'SPEED',
    DISTANCE: 'DISTANCE',
    ARRIVAL: 'ARRIVAL',
    DISTANCE_ROUTE: 'DISTANCE_ROUTE'
  }

  export function getAlertType (type) {
    switch(type) {
      case AlertType.SPEED: return 'Velocidad';
      case AlertType.DISTANCE: return 'Distancia máxima';
      case AlertType.ARRIVAL: return 'Llegada';
      case AlertType.DISTANCE_ROUTE: return 'Distancia maxima por ruta';
      default: return type;
    }
 }