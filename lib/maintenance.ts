export const MAINTENANCE_PATH = '/maintenance'

export function isMaintenanceMode() {
  return process.env.MAINTENANCE_MODE === 'true'
}
