export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  children?: NavigationItem[];
  role?: string[];
  isMainParent?: boolean;
}

export const NavigationItems: NavigationItem[] = [
  {

    id: 'default',
    title: 'Ana səhifə',
    type: 'item',
    classes: 'nav-item',
    url: '/',
    icon: 'ti ti-home',
    breadcrumbs: false
  },
  {
    id: 'default',
    title: 'Event kateqoriya',
    type: 'item',
    classes: 'nav-item',
    url: '/category',
    icon: 'ti ti-category',
    breadcrumbs: false
  },
  {
    id: 'default',
    title: 'Əməkdaşlar',
    type: 'item',
    classes: 'nav-item',
    url: '/users',
    icon: 'ti ti-users',
    breadcrumbs: false
  },
  {
    id: 'default',
    title: 'Tədbirlər',
    type: 'item',
    classes: 'nav-item',
    url: '/my-events',
    icon: 'ti ti-calendar',
    breadcrumbs: false
  },
  {
    id: 'default',
    title: 'İstifadəçi rolları',
    type: 'item',
    classes: 'nav-item',
    url: '/user-role',
    icon: 'ti ti-menu',
    breadcrumbs: false
  },
  {
    id: 'default',
    title: 'Rollar',
    type: 'item',
    classes: 'nav-item',
    url: '/roles',
    icon: 'ti ti-receipt',
    breadcrumbs: false
  },
  {
    id: 'default',
    title: 'Tədbir Məkanları',
    type: 'item',
    classes: 'nav-item',
    url: '/venue',
    icon: 'ti ti-map-pin',
    breadcrumbs: false
  }
  /*
      ]
    },
   /* {
      id: 'page',
      title: 'Pages',
      type: 'group',
      icon: 'icon-navigation',
      children: [
        {
          id: 'Authentication',
          title: 'Authentication',
          type: 'collapse',
          icon: 'ti ti-key',
          children: [
            {
              id: 'login',
              title: 'Login',
              type: 'item',
              url: '/login',
              breadcrumbs: false
            },
            {
              id: 'register',
              title: 'Register',
              type: 'item',
              url: '/guest/register',
              target: true,
              breadcrumbs: false
            }
          ]
        }
      ]
    },*/
  /*  {
      id: 'elements',
      title: 'Elements',
      type: 'group',
      icon: 'icon-navigation',
      children: [
        {
          id: 'typography',
          title: 'Typography',
          type: 'item',
          classes: 'nav-item',
          url: '/typography',
          icon: 'ti ti-typography'
        },
        {
          id: 'color',
          title: 'Colors',
          type: 'item',
          classes: 'nav-item',
          url: '/color',
          icon: 'ti ti-brush'
        },
        {
          id: 'tabler',
          title: 'Tabler',
          type: 'item',
          classes: 'nav-item',
          url: 'https://tabler-icons.io/',
          icon: 'ti ti-plant-2',
          target: true,
          external: true
        }
      ]
    },
    {
      id: 'other',
      title: 'Other',
      type: 'group',
      icon: 'icon-navigation',
      children: [
        {
          id: 'sample-page',
          title: 'Sample Page',
          type: 'item',
          url: '/sample-page',
          classes: 'nav-item',
          icon: 'ti ti-brand-chrome'
        },
        {
          id: 'document',
          title: 'Document',
          type: 'item',
          classes: 'nav-item',
          url: 'https://codedthemes.gitbook.io/berry-angular/',
          icon: 'ti ti-vocabulary',
          target: true,
          external: true
        }
      ]
    }*/
];
