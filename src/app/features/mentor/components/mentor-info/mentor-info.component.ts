import { Component, Input, OnInit } from '@angular/core';
import { Mentor } from '../../models/mentor.model';
import { mentors } from '../../mentor.data';
import { teams } from 'app/features/team/team.data';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-mentor-info',
    templateUrl: './mentor-info.component.html',
    styleUrls: ['./mentor-info.component.scss'],
})
export class MentorInfoComponent {
    @Input() mentor?: Mentor;
    mentors = mentors;
    teams = teams;

    rows = 10;

    items: MenuItem[] = [
        { label: 'Info', icon: 'pi pi-fw pi-home', id: 'info' },
        { label: 'Edit', icon: 'pi pi-fw pi-calendar', id: 'edit' },
    ];

    activeItem: MenuItem = this.items[0];

    subTabs: MenuItem[] = [
        { label: 'Intern', icon: 'pi pi-fw pi-home', id: 'intern' },
        { label: 'Team', icon: 'pi pi-fw pi-calendar', id: 'team' },
    ];

    activeSubTab: MenuItem = this.subTabs[0];
}
