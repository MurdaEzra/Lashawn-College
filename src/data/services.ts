export type ServiceIconKey =
  | 'printer'
  | 'pen-tool'
  | 'globe'
  | 'settings'
  | 'file-text'
  | 'help-circle'
  | 'repeat'
  | 'award';

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: ServiceIconKey;
}

export const SERVICE_ICON_OPTIONS: Array<{
  value: ServiceIconKey;
  label: string;
}> = [
  { value: 'printer', label: 'Printer' },
  { value: 'pen-tool', label: 'Pen Tool' },
  { value: 'globe', label: 'Globe' },
  { value: 'settings', label: 'Settings' },
  { value: 'file-text', label: 'File Text' },
  { value: 'help-circle', label: 'Help Circle' },
  { value: 'repeat', label: 'Repeat' },
  { value: 'award', label: 'Award' }
];

export const DEFAULT_SERVICES: ServiceItem[] = [
  {
    id: 'printing-services',
    title: 'Printing Services',
    description:
      'Regular, large format, and plotter printing for documents, posters, banners, and more.',
    icon: 'printer'
  },
  {
    id: 'tshirt-branding',
    title: 'T-shirt & Branding',
    description:
      'Custom t-shirt printing, branding materials, and promotional items for businesses and events.',
    icon: 'pen-tool'
  },
  {
    id: 'web-hosting-design',
    title: 'Web Hosting & Design',
    description:
      'Website design, hosting, and maintenance services for businesses and individuals.',
    icon: 'globe'
  },
  {
    id: 'software-installation',
    title: 'Software Installation',
    description:
      'Professional software installation, updates, and troubleshooting for your devices.',
    icon: 'settings'
  },
  {
    id: 'kra-services',
    title: 'KRA Services',
    description:
      'Assistance with KRA PIN registration, returns filing, and tax compliance matters.',
    icon: 'file-text'
  },
  {
    id: 'helb-applications',
    title: 'HELB Applications',
    description:
      'Guidance and support with HELB loan applications and management.',
    icon: 'help-circle'
  },
  {
    id: 'driving-licence-renewal',
    title: 'Driving Licence Renewal',
    description:
      'Simplified process for renewing your driving licence without the hassle.',
    icon: 'repeat'
  },
  {
    id: 'ecitizen-services',
    title: 'eCitizen Services',
    description:
      'Assistance with eCitizen registration and various government services applications.',
    icon: 'award'
  }
];

const SERVICES_STORAGE_KEY = 'lashawnServices';

function hasWindow() {
  return typeof window !== 'undefined';
}

function normalizeService(service: Partial<ServiceItem>, fallbackId: string): ServiceItem {
  const title = (service.title ?? '').trim();
  const description = (service.description ?? '').trim();
  const icon = SERVICE_ICON_OPTIONS.some((option) => option.value === service.icon)
    ? (service.icon as ServiceIconKey)
    : 'printer';

  return {
    id: (service.id ?? fallbackId).trim() || fallbackId,
    title,
    description,
    icon
  };
}

export function getStoredServices(): ServiceItem[] {
  if (!hasWindow()) {
    return DEFAULT_SERVICES;
  }

  const raw = window.localStorage.getItem(SERVICES_STORAGE_KEY);
  if (!raw) {
    return DEFAULT_SERVICES;
  }

  try {
    const parsed = JSON.parse(raw) as Partial<ServiceItem>[];
    if (!Array.isArray(parsed)) {
      return DEFAULT_SERVICES;
    }

    return parsed
      .map((service, index) => normalizeService(service, `service-${index + 1}`))
      .filter((service) => service.title && service.description);
  } catch {
    return DEFAULT_SERVICES;
  }
}

export function saveServices(services: ServiceItem[]) {
  if (!hasWindow()) {
    return;
  }

  window.localStorage.setItem(
    SERVICES_STORAGE_KEY,
    JSON.stringify(services.map((service) => normalizeService(service, service.id)))
  );
}

export function createEmptyService(): ServiceItem {
  return {
    id: `service-${Date.now()}`,
    title: '',
    description: '',
    icon: 'printer'
  };
}
