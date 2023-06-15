import { Component, OnInit } from '@angular/core';
import { HomeService, StarStudent } from './services/home.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    // columns = ['column 1', 'column 2', 'column 3', 'column 4'];
    columns = [
        {
            id: 1,
            title: 'Projects',
            count: '50+',
        },
        {
            id: 2,
            title: 'Mentors',
            count: '20',
        },
        {
            id: 3,
            title: 'Interns',
            count: '400',
        },
        {
            id: 4,
            title: 'Technologies',
            count: '20+',
        },
    ];

    activities = [
        {
            icon: '../../assets/images/icons/award-icon-01.svg',
            title: '1st place in "Chess”',
            description: 'John Doe won 1st place in "Chess"',
            postingDate: '1 Day ago',
        },
        {
            icon: '../../assets/images/icons/award-icon-02.svg',
            title: 'Participated in "Carrom"',
            description: 'Justin Lee participated in "Carrom"',
            postingDate: '2 Hours ago',
        },
        {
            icon: '../../assets/images/icons/award-icon-03.svg',
            title: 'International conference in "St.John School"',
            description:
                'Justin Leeattended International conference in "St.John School"',
            postingDate: '2 Weeks ago',
        },
        {
            icon: '../../assets/images/icons/award-icon-04.svg',
            title: 'Won 1st place in "Chess"',
            description: 'John Doe won 1st place in "Chess"',
            postingDate: '3 Days ago',
        },
    ];

    socialMedias = [
        {
            title: 'Like us on facebook',
            count: '50,095',
            img: '../../assets/images/icons/social-icon-01.svg',
            bgColor: '#1877f2',
        },
        {
            title: 'Follow us on twitter',
            count: '48,596',
            img: '../../assets/images/icons/social-icon-02.svg',
            bgColor: '#1d9bf0',
        },
        {
            title: 'Follow us on instagram',
            count: '52,085',
            img: '../../assets/images/icons/social-icon-03.svg',
            bgColor: '#fe643b',
        },
        {
            title: 'Follow us on linkedin',
            count: '69,050',
            img: '../../assets/images/icons/social-icon-04.svg',
            bgColor: '#0a66c2',
        },
    ];

    starStudentList: StarStudent[] = [];

    constructor(private homeService: HomeService) {}

    ngOnInit() {
        this.homeService.getStarStudentList().subscribe({
            next: (response) => {
                if (response) {
                    this.starStudentList = response.slice(0, 4);
                }
            },
            error: (error) => {
                console.log(error);
            },
        });
    }
}
