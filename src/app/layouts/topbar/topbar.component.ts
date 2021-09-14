import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../../core/services/event.service';
import { StorageService } from '../../service/storage.service';
import { CommonServiceService } from '../../service/common-service.service';
import { CommonFunctions } from '../../common.function';
declare var $:any;

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {
  pageHeading: string;
  notificationItems: Array<{}>;
  openMobileMenu: boolean;
  public name: any;

  //public commonService:any;

  @Output() settingsButtonClicked = new EventEmitter();
  @Output() mobileMenuButtonClicked = new EventEmitter();

  @Input('topbarName') set topbarName(value) {
    //console.log(value);
    this.name = value;
  }

  constructor(
    private router: Router,
    public commonService: CommonServiceService, 
    private eventService: EventService,
    private storageService: StorageService
    ) { }

  ngOnInit() {
    var routeLink = this.router.url;
    //console.log(routeLink);
    this.commonService.autoLogout(routeLink);
    // get the notifications
    this._fetchNotifications();
    this.openMobileMenu = false;
    
      $("#openit").click(function () {
        $("body").toggleClass("enlarged");
        // $("h1, h2, p").toggleClass("blue");
      });

      this.storageService.get_storageData().then((dbres) => {
        if (CommonFunctions.findKeyIndex(dbres, 'fullName') != undefined) {
          this.commonService.user = {
            name:dbres[CommonFunctions.findKeyIndex(dbres, 'fullName')]['fullName'],
            id:dbres[CommonFunctions.findKeyIndex(dbres, 'id')]['id']
          }
        }else{
          this.commonService.user=undefined;
        }
      });
  }

  
  /**
   * Toggles the right sidebar
   */
  toggleRightSidebar() {
    this.settingsButtonClicked.emit();
  }

  /**
   * Toggle the menu bar when having mobile screen
   */
  toggleMobileMenu(event: any) {
    event.preventDefault();
    this.mobileMenuButtonClicked.emit();
  }

  /**
   * Logout the user
   */
  logout() {
    //this.authService.logout();
    this.storageService.delete_storageData('token');
    this.router.navigate(['']);
  }

  /**
   * Fetches the notification
   * Note: For now returns the hard coded notifications
   */
  _fetchNotifications() {
    this.notificationItems = [{
      text: 'Caleb Flakelar commented on Admin',
      subText: '1 min ago',
      icon: 'mdi mdi-comment-account-outline',
      bgColor: 'primary',
      redirectTo: '/notification/1'
    },
    {
      text: 'New user registered.',
      subText: '5 min ago',
      icon: 'mdi mdi-account-plus',
      bgColor: 'info',
      redirectTo: '/notification/2'
    },
    {
      text: 'Cristina Pride',
      subText: 'Hi, How are you? What about our next meeting',
      icon: 'mdi mdi-comment-account-outline',
      bgColor: 'success',
      redirectTo: '/notification/3'
    },
    {
      text: 'Caleb Flakelar commented on Admin',
      subText: '2 days ago',
      icon: 'mdi mdi-comment-account-outline',
      bgColor: 'danger',
      redirectTo: '/notification/4'
    },
    {
      text: 'Caleb Flakelar commented on Admin',
      subText: '1 min ago',
      icon: 'mdi mdi-comment-account-outline',
      bgColor: 'primary',
      redirectTo: '/notification/5'
    },
    {
      text: 'New user registered.',
      subText: '5 min ago',
      icon: 'mdi mdi-account-plus',
      bgColor: 'info',
      redirectTo: '/notification/6'
    },
    {
      text: 'Cristina Pride',
      subText: 'Hi, How are you? What about our next meeting',
      icon: 'mdi mdi-comment-account-outline',
      bgColor: 'success',
      redirectTo: '/notification/7'
    },
    {
      text: 'Caleb Flakelar commented on Admin',
      subText: '2 days ago',
      icon: 'mdi mdi-comment-account-outline',
      bgColor: 'danger',
      redirectTo: '/notification/8'
    }];
  }
}
