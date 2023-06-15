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
        name: 'Interns',
        icon: faGraduationCap,
        prefix: 'students',
        children: [
            {
                id: 21,
                name: 'Intern List',
                link: 'students',
            },
        ],
    },
    {
        id: 3,
        name: 'Mentors',
        icon: faChalkboardUser,
        prefix: 'teachers',
        children: [
            {
                id: 31,
                name: 'Mentor List',
                link: 'teachers',
            },
        ],
    },
    {
        id: 4,
        name: 'Technologies',
        icon: faBookReader,
        prefix: 'subjects',
        children: [
            {
                id: 41,
                name: 'Technology List',
                link: 'subjects',
            },
        ],
    },
    {
        id: 5,
        name: 'Project',
        icon: faUsers,
        prefix: 'projects',
        children: [
            {
                id: 51,
                name: 'Project List',
                link: 'classrooms',
            },
        ],
    },
];
