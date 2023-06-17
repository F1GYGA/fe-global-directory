import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class AdminPanelComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'profilePhotoUrl',
    'firstName',
    'lastName',
    'email',
  ];
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];

  dataSource = new MatTableDataSource([
    {
      profilePhotoUrl: 'assets/portrait.jpg',
      firstName: 'Ion',
      lastName: 'Popescu',
      email: 'ion.popescu@example.com',
      department: 'Corporate Bank',
      team: 'Cash Management',
      jobTitle: 'Cash Manager',
      dateOfEmployment: '2019-06-01',
    },
    {
      profilePhotoUrl: 'assets/profile-photo-placeholder.png',
      firstName: 'Ana',
      lastName: 'Ionescu',
      email: 'ana.ionescu@example.com',
      department: 'Investment Bank',
      team: 'Equity Capital Markets',
      jobTitle: 'Investment Banking Analyst',
      dateOfEmployment: '2018-02-15',
    },
    {
      profilePhotoUrl: 'assets/profile-photo-placeholder.png',
      firstName: 'Mihai',
      lastName: 'Vasilescu',
      email: 'mihai.vasilescu@example.com',
      department: 'Private Bank',
      team: 'Private Wealth Management',
      jobTitle: 'Wealth Manager',
      dateOfEmployment: '2020-09-12',
    },
    {
      profilePhotoUrl: 'assets/profile-photo-placeholder.png',
      firstName: 'Elena',
      lastName: 'Dumitrescu',
      email: 'elena.dumitrescu@example.com',
      department: 'Asset Management',
      team: 'Real Estate Investments',
      jobTitle: 'Real Estate Analyst',
      dateOfEmployment: '2016-08-24',
    },
    {
      profilePhotoUrl: 'assets/profile-photo-placeholder.png',
      firstName: 'Andrei',
      lastName: 'Marin',
      email: 'andrei.marin@example.com',
      department: 'Wealth Management',
      team: 'Investment Advisory',
      jobTitle: 'Investment Advisor',
      dateOfEmployment: '2022-01-03',
    },
    {
      profilePhotoUrl: 'assets/profile-photo-placeholder.png',
      firstName: 'Gabriela',
      lastName: 'Petrovici',
      email: 'gabriela.petrovici@example.com',
      department: 'Global Markets',
      team: 'Equities Trading',
      jobTitle: 'Equity Trader',
      dateOfEmployment: '2017-11-13',
    },
    {
      profilePhotoUrl: 'assets/profile-photo-placeholder.png',
      firstName: 'Radu',
      lastName: 'Stefanescu',
      email: 'radu.stefanescu@example.com',
      department: 'Global Transaction Banking',
      team: 'Trade Finance',
      jobTitle: 'Trade Finance Manager',
      dateOfEmployment: '2021-03-29',
    },
    {
      profilePhotoUrl: 'assets/profile-photo-placeholder.png',
      firstName: 'Camelia',
      lastName: 'Dinu',
      email: 'camelia.dinu@example.com',
      department: 'Risk Management',
      team: 'Credit Risk',
      jobTitle: 'Credit Risk Analyst',
      dateOfEmployment: '2018-07-02',
    },
    {
      profilePhotoUrl: 'assets/profile-photo-placeholder.png',
      firstName: 'Cristian',
      lastName: 'Tudose',
      email: 'cristian.tudose@example.com',
      department: 'Information Technology',
      team: 'Software Development',
      jobTitle: 'Software Engineer',
      dateOfEmployment: '2021-04-21',
    },
    {
      profilePhotoUrl: 'assets/profile-photo-placeholder.png',
      firstName: 'Iulia',
      lastName: 'Georgescu',
      email: 'iulia.georgescu@example.com',
      department: 'Human Resources',
      team: 'Recruitment',
      jobTitle: 'Recruiter',
      dateOfEmployment: '2019-10-14',
    },
    {
      profilePhotoUrl: 'assets/profile-photo-placeholder.png',
      firstName: 'Bogdan',
      lastName: 'Popa',
      email: 'bogdan.popa@example.com',
      department: 'Finance',
      team: 'Financial Reporting',
      jobTitle: 'Financial Analyst',
      dateOfEmployment: '2017-04-15',
    },
    {
      profilePhotoUrl: 'assets/profile-photo-placeholder.png',
      firstName: 'Diana',
      lastName: 'Ciobanu',
      email: 'diana.ciobanu@example.com',
      department: 'Audit',
      team: 'Internal Audit',
      jobTitle: 'Internal Auditor',
      dateOfEmployment: '2016-09-01',
    },
    {
      profilePhotoUrl: 'assets/profile-photo-placeholder.png',
      firstName: 'Vasile',
      lastName: 'Mocanu',
      email: 'vasile.mocanu@example.com',
      department: 'Corporate Communications',
      team: 'Public Relations',
      jobTitle: 'PR Specialist',
      dateOfEmployment: '2020-05-23',
    },
    {
      profilePhotoUrl: 'assets/profile-photo-placeholder.png',
      firstName: 'Alina',
      lastName: 'Dragomir',
      email: 'alina.dragomir@example.com',
      department: 'Government & Regulatory Affairs',
      team: 'Government Relations',
      jobTitle: 'Government Relations Specialist',
      dateOfEmployment: '2018-11-29',
    },
    {
      profilePhotoUrl: 'assets/profile-photo-placeholder.png',
      firstName: 'Florin',
      lastName: 'Antonescu',
      email: 'florin.antonescu@example.com',
      department: 'Research',
      team: 'Equity Research',
      jobTitle: 'Equity Research Analyst',
      dateOfEmployment: '2019-02-11',
    },
    {
      profilePhotoUrl: 'assets/profile-photo-placeholder.png',
      firstName: 'Ioana',
      lastName: 'Nicolae',
      email: 'ioana.nicolae@example.com',
      department: 'Strategy and Business Development',
      team: 'Corporate Strategy',
      jobTitle: 'Strategy Analyst',
      dateOfEmployment: '2022-06-01',
    },
    {
      profilePhotoUrl: 'assets/profile-photo-placeholder.png',
      firstName: 'Adrian',
      lastName: 'Ilie',
      email: 'adrian.ilie@example.com',
      department: 'Real Estate Management',
      team: 'Property Management',
      jobTitle: 'Property Manager',
      dateOfEmployment: '2015-03-08',
    },
    {
      profilePhotoUrl: 'assets/profile-photo-placeholder.png',
      firstName: 'Simona',
      lastName: 'Constantin',
      email: 'simona.constantin@example.com',
      department: 'Legal',
      team: 'Corporate Governance',
      jobTitle: 'Corporate Governance Analyst',
      dateOfEmployment: '2021-08-15',
    },
    {
      profilePhotoUrl: 'assets/profile-photo-placeholder.png',
      firstName: 'Marius',
      lastName: 'Dumitrache',
      email: 'marius.dumitrache@example.com',
      department: 'Compliance',
      team: 'Regulatory Compliance',
      jobTitle: 'Compliance Officer',
      dateOfEmployment: '2017-12-04',
    },
    {
      profilePhotoUrl: 'assets/profile-photo-placeholder.png',
      firstName: 'Oana',
      lastName: 'Pavel',
      email: 'oana.pavel@example.com',
      department: 'Operations',
      team: 'Client Services',
      jobTitle: 'Client Services Associate',
      dateOfEmployment: '2020-07-20',
    },
  ]);
  expandedElement: any | null;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit() {
    this.breakpointObserver
      .observe(['(max-width: 768px)'])
      .subscribe(result => {
        if (result.matches) {
          this.columnsToDisplayWithExpand = [
            'profilePhotoUrl',
            'firstName',
            'lastName',
            'expand',
          ];
        } else {
          this.columnsToDisplayWithExpand = [
            'profilePhotoUrl',
            'firstName',
            'lastName',
            'email',
            'expand',
          ];
        }
      });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  approveUser(user: any) {
    console.log('User approved', user);
  }

  rejectUser(user: any) {
    console.log('User rejected', user);
  }
}
