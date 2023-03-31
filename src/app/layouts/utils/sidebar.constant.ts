import { faGauge, faGraduationCap, faChalkboardUser, faBookReader, faChevronRight } from '@fortawesome/free-solid-svg-icons'

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
        link: ''
      },
    ]
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
        link: 'students'
      },
      {
        id: 22,
        name: 'Create Student',
        link: 'students/create'
      }
    ]
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
        link: 'teachers'
      },
      {
        id: 32,
        name: 'Create Teacher',
        link: 'teachers/new'
      }
    ]
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
        link: 'subjects'
      },
      // {
      //   id: 42,
      //   name: 'Create Subject',
      //   link: 'subjects/create'
      // }
    ]
  }
]
