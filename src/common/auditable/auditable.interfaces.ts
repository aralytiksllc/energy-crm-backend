export interface IAuditableProvider {
  getCurrentUserId(): Promise<string | null>;
}
