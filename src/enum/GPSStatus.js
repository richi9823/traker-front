export const GPSStatus = {
    ACTIVE: 'ACTIVE',
    INACTIVE: 'INACTIVE',
  }

  export function getStatus (status) {
    switch(status) {
      case GPSStatus.ACTIVE: return true;
      case GPSStatus.INACTIVE: return false;
      default: return false;
    }
 }