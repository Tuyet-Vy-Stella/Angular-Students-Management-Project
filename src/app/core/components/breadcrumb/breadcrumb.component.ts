import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { filter } from 'rxjs';

@Component({
    selector: 'app-breadcrumb',
    templateUrl: './breadcrumb.component.html',
    styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnInit {
    constructor(private router: Router) {}
    items!: MenuItem[];
    home!: MenuItem;

    isDisplay: boolean = false;

    ngOnInit() {
        this.router.events
            .pipe(filter((event) => event instanceof NavigationEnd))
            .subscribe((event: any) => {
                const url: string = event.url;
                if (!url) return;
                const urls = url.split('/').filter((url) => url);
                this.isDisplay = !urls.includes('home');
                this.items = urls.map((url) => {
                    return {
                        label: Number.isInteger(Number(url))
                            ? `${urls[0]} detail`
                            : url,
                        routerLink: Number.isInteger(Number(url)) ? false : url,
                    };
                });
            });

        this.items = [
            { label: 'computer' },
            { label: 'Notebook' },
            { label: 'Accessories' },
            { label: 'Backpacks' },
            { label: 'Item' },
        ];

        this.home = { icon: 'pi pi-home', routerLink: '/home' };
    }
}
