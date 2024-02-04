import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { ROUTES_ADMIN } from '../../sidebar/sidebar.component';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from 'src/helpers/service/auth.service';

@Component({
  moduleId: module.id,
  selector: 'navbar-cmp',
  templateUrl: 'navbar.component.html'
})

export class NavbarComponent implements OnInit {
  location: Location;
  userName: string = '';
  private toggleButton: any;
  private sidebarVisible: boolean;

  public isCollapsed = true;

  constructor(location: Location, private element: ElementRef, private router: Router, private authSrv: AuthService) {
    this.location = location;
    this.sidebarVisible = false;
  }

  ngOnInit() {
    var navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
    this.router.events.subscribe(() => {
      this.sidebarClose();
    });
    this.getTitle()
  }
  getTitle() {
    this.authSrv.getUserDetails().subscribe({
      next: user => {
        let name = user.name + ' ' + user?.lastNames
        this.userName = name
      }
    })
  }




  sidebarToggle() {
    if (this.sidebarVisible === false) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }
  }

  sidebarOpen() {
    const toggleButton = this.toggleButton;
    const html = document.getElementsByTagName('html')[0];
    const mainPanel = <HTMLElement>document.getElementsByClassName('main-panel')[0];
    setTimeout(function () {
      toggleButton.classList.add('toggled');
    }, 500);

    html.classList.add('nav-open');
    if (window.innerWidth < 991) {
      mainPanel.style.position = 'fixed';
    }
    this.sidebarVisible = true;
  };

  sidebarClose() {
    const html = document.getElementsByTagName('html')[0];
    const mainPanel = <HTMLElement>document.getElementsByClassName('main-panel')[0];
    if (mainPanel !== undefined && window.innerWidth < 991) {
      setTimeout(function () {
        mainPanel.style.position = '';
      }, 500);
    }
    this.toggleButton.classList.remove('toggled');
    this.sidebarVisible = false;
    html.classList.remove('nav-open');
  };

}
