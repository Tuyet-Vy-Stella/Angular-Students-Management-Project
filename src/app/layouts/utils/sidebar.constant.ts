import {
  faBookReader,
  faChalkboardUser,
  faGauge,
  faGraduationCap,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';

export const sidebarTabs = [
  {
    id: 1,
    name: 'Dashboard',
    icon: faGauge,
    prefix: '',
    children: [
      {
        id: 11,
        name: 'Admin Dashboard',
        link: '',
      },
    ],
  },
  {
    id: 2,
    name: 'Students',
    icon: faGraduationCap,
    prefix: 'students',
    children: [
      {
        id: 21,
        name: 'Student List',
        link: 'students',
      },
      {
        id: 22,
        name: 'Create Student',
        link: 'students/create',
      },
    ],
  },
  {
    id: 3,
    name: 'Teachers',
    icon: faChalkboardUser,
    prefix: 'teachers',
    children: [
      {
        id: 31,
        name: 'Teacher List',
        link: 'teachers',
      },
      {
        id: 32,
        name: 'Create Teacher',
        link: 'teachers/create',
      },
    ],
  },
  {
    id: 4,
    name: 'Subjects',
    icon: faBookReader,
    prefix: 'subjects',
    children: [
      {
        id: 41,
        name: 'Subject List',
        link: 'subjects',
      },
      {
        id: 42,
        name: 'Create Subject',
        link: 'subjects/create',
      },
    ],
  },
  {
    id: 5,
    name: 'Classroom',
    icon: faUsers,
    prefix: 'subjects',
    children: [
      {
        id: 51,
        name: 'Classroom List',
        link: 'classrooms',
      },
      {
        id: 52,
        name: 'Create Classroom',
        link: 'classrooms/create',
      },
    ],
  },
];
