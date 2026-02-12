import type { NotificationConfig } from '@/lib/toast';

export interface Preset {
  id: string;
  name: string;
  config: Omit<NotificationConfig, 'id'>;
  createdAt: string;
}
