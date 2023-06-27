import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { FormControl } from '@angular/forms';
import { DataSource } from '@angular/cdk/collections';
import { Observable, startWith, switchMap } from 'rxjs';

// interface Option {
//   value: string;
//   viewValue: string;
// }

// interface CategoryOptionsGroup {
//   disabled?: boolean;
//   category: string;
//   options: Option[];
// }

// interface Colleague {
//   profilePicture: string;
//   firstName: string;
//   lastName: string;
//   department: string;
//   team: string;
//   skills: string[];
//   email: string;
// }

@Component({
  selector: 'app-search-colleagues',
  templateUrl: './search-colleagues.component.html',
  styleUrls: ['./search-colleagues.component.css']
  
})
export class SearchColleaguesComponent{

  displayedColumns: string[] = [
    'profilePhotoUrl',
    'firstName',
    'lastName',
    'email',
    'department',
    'team',
    'jobTitle',
  ];

  dataSource = new MatTableDataSource([
    {
      profilePhotoUrl: 'assets/portrait.jpg',
      firstName: 'Ion',
      lastName: 'Popescu',
      email: 'ion.popescu@example.com',
      department: 'Corporate Bank',
      team: 'Cash Management',
      jobTitle: 'Cash Manager',
    },
    {
      profilePhotoUrl: 'assets/profile-photo-placeholder.png',
      firstName: 'Ana',
      lastName: 'Ionescu',
      email: 'ana.ionescu@example.com',
      department: 'Investment Bank',
      team: 'Equity Capital Markets',
      jobTitle: 'Investment Banking Analyst',
    },
    {
      profilePhotoUrl: 'assets/profile-photo-placeholder.png',
      firstName: 'Mihai',
      lastName: 'Vasilescu',
      email: 'mihai.vasilescu@example.com',
      department: 'Private Bank',
      team: 'Private Wealth Management',
      jobTitle: 'Wealth Manager',
    },
    {
      profilePhotoUrl: 'assets/profile-photo-placeholder.png',
      firstName: 'Elena',
      lastName: 'Dumitrescu',
      email: 'elena.dumitrescu@example.com',
      department: 'Asset Management',
      team: 'Real Estate Investments',
      jobTitle: 'Real Estate Analyst',

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

    },
    {
      profilePhotoUrl: 'assets/profile-photo-placeholder.png',
      firstName: 'Radu',
      lastName: 'Stefanescu',
      email: 'radu.stefanescu@example.com',
      department: 'Global Transaction Banking',
      team: 'Trade Finance',
      jobTitle: 'Trade Finance Manager',

    },
    {
      profilePhotoUrl: 'assets/profile-photo-placeholder.png',
      firstName: 'Camelia',
      lastName: 'Dinu',
      email: 'camelia.dinu@example.com',
      department: 'Risk Management',
      team: 'Credit Risk',
      jobTitle: 'Credit Risk Analyst',

    },
    {
      profilePhotoUrl: 'assets/profile-photo-placeholder.png',
      firstName: 'Cristian',
      lastName: 'Tudose',
      email: 'cristian.tudose@example.com',
      department: 'Information Technology',
      team: 'Software Development',
      jobTitle: 'Software Engineer',

    },
    {
      profilePhotoUrl: 'assets/profile-photo-placeholder.png',
      firstName: 'Iulia',
      lastName: 'Georgescu',
      email: 'iulia.georgescu@example.com',
      department: 'Human Resources',
      team: 'Recruitment',
      jobTitle: 'Recruiter',

    },
    {
      profilePhotoUrl: 'assets/profile-photo-placeholder.png',
      firstName: 'Bogdan',
      lastName: 'Popa',
      email: 'bogdan.popa@example.com',
      department: 'Finance',
      team: 'Financial Reporting',
      jobTitle: 'Financial Analyst',

    },
    {
      profilePhotoUrl: 'assets/profile-photo-placeholder.png',
      firstName: 'Diana',
      lastName: 'Ciobanu',
      email: 'diana.ciobanu@example.com',
      department: 'Audit',
      team: 'Internal Audit',
      jobTitle: 'Internal Auditor',
    
    },
    {
      profilePhotoUrl: 'assets/profile-photo-placeholder.png',
      firstName: 'Vasile',
      lastName: 'Mocanu',
      email: 'vasile.mocanu@example.com',
      department: 'Corporate Communications',
      team: 'Public Relations',
      jobTitle: 'PR Specialist',
  
    },
    {
      profilePhotoUrl: 'assets/profile-photo-placeholder.png',
      firstName: 'Alina',
      lastName: 'Dragomir',
      email: 'alina.dragomir@example.com',
      department: 'Government & Regulatory Affairs',
      team: 'Government Relations',
      jobTitle: 'Government Relations Specialist',
      
    },
    {
      profilePhotoUrl: 'assets/profile-photo-placeholder.png',
      firstName: 'Florin',
      lastName: 'Antonescu',
      email: 'florin.antonescu@example.com',
      department: 'Research',
      team: 'Equity Research',
      jobTitle: 'Equity Research Analyst',
    
    },
    {
      profilePhotoUrl: 'assets/profile-photo-placeholder.png',
      firstName: 'Ioana',
      lastName: 'Nicolae',
      email: 'ioana.nicolae@example.com',
      department: 'Strategy and Business Development',
      team: 'Corporate Strategy',
      jobTitle: 'Strategy Analyst',
     
    },
    {
      profilePhotoUrl: 'assets/profile-photo-placeholder.png',
      firstName: 'Adrian',
      lastName: 'Ilie',
      email: 'adrian.ilie@example.com',
      department: 'Real Estate Management',
      team: 'Property Management',
      jobTitle: 'Property Manager',
    
    },
    {
      profilePhotoUrl: 'assets/profile-photo-placeholder.png',
      firstName: 'Simona',
      lastName: 'Constantin',
      email: 'simona.constantin@example.com',
      department: 'Legal',
      team: 'Corporate Governance',
      jobTitle: 'Corporate Governance Analyst',
  
    },
    {
      profilePhotoUrl: 'assets/profile-photo-placeholder.png',
      firstName: 'Marius',
      lastName: 'Dumitrache',
      email: 'marius.dumitrache@example.com',
      department: 'Compliance',
      team: 'Regulatory Compliance',
      jobTitle: 'Compliance Officer',
  
    },
    {
      profilePhotoUrl: 'assets/profile-photo-placeholder.png',
      firstName: 'Oana',
      lastName: 'Pavel',
      email: 'oana.pavel@example.com',
      department: 'Operations',
      team: 'Client Services',
      jobTitle: 'Client Services Associate',
      
    },
  ]);
  
  expandedElement: any | null;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _liveAnnouncer: LiveAnnouncer
    ) {}

  searchKeywordFilter = new FormControl();

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  //   this.searchKeywordFilter.valueChanges
  //     .pipe(
  //       startWith({}),
  //       switchMap(() => {
  //         // this.isLoadingResults = true;
  //         var filterValue = this.searchKeywordFilter.value == null ? '' : this.searchKeywordFilter.value;
  //         return this.getUsersService.getUsers(filterValue)
  //         .
  //     )
  // }
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

  // constructor() { }
  // colleagues: Colleague[] = [
  //   {
  //     profilePicture: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANoAAADoCAMAAAC+cQpPAAAAflBMVEX///8AAACBgYE+Pj7p6emsrKxNTU2Hh4ebm5vT09PU1NTHx8fDw8PPz8/JycnLy8u5ubn09PTh4eFzc3OWlpaOjo7j4+NhYWFoaGg0NDRUVFRubm5dXV3t7e0lJSV7e3sTExMdHR1FRUU7OzszMzOurq67u7sjIyMYGBikpKSXggkjAAAD0klEQVR4nO2d21bqMBRFyfEKikhFQOR2UDj2/3/wWKo2bdOGNBndq7jmmxk+rDkoachlp9cjhBBCCCGEEGInil8vPrbvy+c76SSBibcqYzOVjhOOK1XgSTpRKK6LZp/0pUOFYGUQ++RROpc/Y7PZObitq9TUQDqaJ5tKM6Wks/kR1ZipG+l0Xpg6x4yxdDwPprVmaiKdz4PnerWtdD4PqrvHlO6OuCrfad/spRM2ZmBTe5ZO2Jh7m9qrdMLGPNrUZtIJG3Owqc2lEzZmaFP7I52wMRW/ZzJi6YTNsal1+Afpk0VNOp8HD/VmnZ4i2daqRdLxfKh9sy2k0/nxVqN2KR3Oj5r+v8M9f8pdlVl3x48/VHzdujt81DAOt7o95fPDeFEyG0lnCsbo4rw6kBzRZJdqrTfntsCWsIqijr/KCMFjcIhvTyLej1bSYU8nmrxUjxyNdKTXvL+wqxi4lc5tJXL9wDLAZ8ktSzP17JDX23Y+Zgp4eXv819NMKdTuxN9MqaG0hBHfpzEFcZTp1YNkrKU9ytRuo3ABbzmxblbODbRxV+XElTtoU11h+pAUrDf3ZUAzsOHkbUg1rE4y5PMI1pEENVP30joawV5qKUjb0gJ2/QlIq6XWvS9uLKV9NPZh1a6lfTRKZxSoRjVJfo/afDav3yqe4/3z3/NTfMBqPes+H51k7Tf/Ex1bzbqBNSPZOXhDtfahGtWo1g5UoxrV2uFXqTnMllBNCKpRjWrtQDWqUa0dqEY1qrUD1agGruawnEE1IahGNaq1A9WoRrV2+FVqI6pRTQ6qUQ1KrbD3uOephlSqKS+yK7VY1eJcy0baRyeXLDnu46iWP250kNbRyT1QySEtR7XeUm8RlimgVXA71kV3VdMr0oLVH8zOZF8d/3ZV06o/Ix0WSpkccy2/Suw5q33vP54jnl7uTYfZQX+T2vVisTCUHsyqlkZD2EoBGia1pHsxVOzoWkFWU8mz5FGjGjJUoxoUVKMaFFSjGhRUoxoUVKMaFFTrolqfalRDgmpUg4JqVIOCalSDgmpUg4JqVIOCalSDgmpUg4JqVIOCalSDgmpUg4JqVIOCalSDgmpUg4JqVINiQDWqIUE1qkFBNapBccZqpvthk6t5Dbfp3UhndWRcVjhWSNmUm/fSWV0pX+g+S5oN98ZOpaO6Ur4gNi2RUmp+Ew7agKLCS9pcujR8KBuzCcU+8rv6S+FJhSosdSqHig/nn96MdMmyA9rn9hFp7fOsHenSbzfidfo1K/Tv/dnXwwhZouhUVv27/tjQHj2MOtfpE0IIIYQQQgD5D4thRYd84C2qAAAAAElFTkSuQmCC',
  //     firstName: 'coleg2',
  //     lastName: 'coleg2',
  //     department: 'Department1',
  //     skills: ['skill1','skill2','skill3'],
  //     team: 'Team1',
  //     email: 'example@example.com'
  //   },
  //   {
  //     profilePicture: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANoAAADoCAMAAAC+cQpPAAAAflBMVEX///8AAACBgYE+Pj7p6emsrKxNTU2Hh4ebm5vT09PU1NTHx8fDw8PPz8/JycnLy8u5ubn09PTh4eFzc3OWlpaOjo7j4+NhYWFoaGg0NDRUVFRubm5dXV3t7e0lJSV7e3sTExMdHR1FRUU7OzszMzOurq67u7sjIyMYGBikpKSXggkjAAAD0klEQVR4nO2d21bqMBRFyfEKikhFQOR2UDj2/3/wWKo2bdOGNBndq7jmmxk+rDkoachlp9cjhBBCCCGEEGInil8vPrbvy+c76SSBibcqYzOVjhOOK1XgSTpRKK6LZp/0pUOFYGUQ++RROpc/Y7PZObitq9TUQDqaJ5tKM6Wks/kR1ZipG+l0Xpg6x4yxdDwPprVmaiKdz4PnerWtdD4PqrvHlO6OuCrfad/spRM2ZmBTe5ZO2Jh7m9qrdMLGPNrUZtIJG3Owqc2lEzZmaFP7I52wMRW/ZzJi6YTNsal1+Afpk0VNOp8HD/VmnZ4i2daqRdLxfKh9sy2k0/nxVqN2KR3Oj5r+v8M9f8pdlVl3x48/VHzdujt81DAOt7o95fPDeFEyG0lnCsbo4rw6kBzRZJdqrTfntsCWsIqijr/KCMFjcIhvTyLej1bSYU8nmrxUjxyNdKTXvL+wqxi4lc5tJXL9wDLAZ8ktSzP17JDX23Y+Zgp4eXv819NMKdTuxN9MqaG0hBHfpzEFcZTp1YNkrKU9ytRuo3ABbzmxblbODbRxV+XElTtoU11h+pAUrDf3ZUAzsOHkbUg1rE4y5PMI1pEENVP30joawV5qKUjb0gJ2/QlIq6XWvS9uLKV9NPZh1a6lfTRKZxSoRjVJfo/afDav3yqe4/3z3/NTfMBqPes+H51k7Tf/Ex1bzbqBNSPZOXhDtfahGtWo1g5UoxrV2uFXqTnMllBNCKpRjWrtQDWqUa0dqEY1qrUD1agGruawnEE1IahGNaq1A9WoRrV2+FVqI6pRTQ6qUQ1KrbD3uOephlSqKS+yK7VY1eJcy0baRyeXLDnu46iWP250kNbRyT1QySEtR7XeUm8RlimgVXA71kV3VdMr0oLVH8zOZF8d/3ZV06o/Ix0WSpkccy2/Suw5q33vP54jnl7uTYfZQX+T2vVisTCUHsyqlkZD2EoBGia1pHsxVOzoWkFWU8mz5FGjGjJUoxoUVKMaFFSjGhRUoxoUVKMaFFTrolqfalRDgmpUg4JqVIOCalSDgmpUg4JqVIOCalSDgmpUg4JqVIOCalSDgmpUg4JqVIOCalSDgmpUg4JqVINiQDWqIUE1qkFBNapBccZqpvthk6t5Dbfp3UhndWRcVjhWSNmUm/fSWV0pX+g+S5oN98ZOpaO6Ur4gNi2RUmp+Ew7agKLCS9pcujR8KBuzCcU+8rv6S+FJhSosdSqHig/nn96MdMmyA9rn9hFp7fOsHenSbzfidfo1K/Tv/dnXwwhZouhUVv27/tjQHj2MOtfpE0IIIYQQQgD5D4thRYd84C2qAAAAAElFTkSuQmCC',
  //     firstName: 'coleg1',
  //     lastName: 'coleg1',
  //     department: 'Department1',
  //     skills: ['skill1','skill2','skill3'],
  //     team: 'Team1',
  //     email: 'example@example.com'
  //   },
  //   {
  //     profilePicture: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANoAAADoCAMAAAC+cQpPAAAAflBMVEX///8AAACBgYE+Pj7p6emsrKxNTU2Hh4ebm5vT09PU1NTHx8fDw8PPz8/JycnLy8u5ubn09PTh4eFzc3OWlpaOjo7j4+NhYWFoaGg0NDRUVFRubm5dXV3t7e0lJSV7e3sTExMdHR1FRUU7OzszMzOurq67u7sjIyMYGBikpKSXggkjAAAD0klEQVR4nO2d21bqMBRFyfEKikhFQOR2UDj2/3/wWKo2bdOGNBndq7jmmxk+rDkoachlp9cjhBBCCCGEEGInil8vPrbvy+c76SSBibcqYzOVjhOOK1XgSTpRKK6LZp/0pUOFYGUQ++RROpc/Y7PZObitq9TUQDqaJ5tKM6Wks/kR1ZipG+l0Xpg6x4yxdDwPprVmaiKdz4PnerWtdD4PqrvHlO6OuCrfad/spRM2ZmBTe5ZO2Jh7m9qrdMLGPNrUZtIJG3Owqc2lEzZmaFP7I52wMRW/ZzJi6YTNsal1+Afpk0VNOp8HD/VmnZ4i2daqRdLxfKh9sy2k0/nxVqN2KR3Oj5r+v8M9f8pdlVl3x48/VHzdujt81DAOt7o95fPDeFEyG0lnCsbo4rw6kBzRZJdqrTfntsCWsIqijr/KCMFjcIhvTyLej1bSYU8nmrxUjxyNdKTXvL+wqxi4lc5tJXL9wDLAZ8ktSzP17JDX23Y+Zgp4eXv819NMKdTuxN9MqaG0hBHfpzEFcZTp1YNkrKU9ytRuo3ABbzmxblbODbRxV+XElTtoU11h+pAUrDf3ZUAzsOHkbUg1rE4y5PMI1pEENVP30joawV5qKUjb0gJ2/QlIq6XWvS9uLKV9NPZh1a6lfTRKZxSoRjVJfo/afDav3yqe4/3z3/NTfMBqPes+H51k7Tf/Ex1bzbqBNSPZOXhDtfahGtWo1g5UoxrV2uFXqTnMllBNCKpRjWrtQDWqUa0dqEY1qrUD1agGruawnEE1IahGNaq1A9WoRrV2+FVqI6pRTQ6qUQ1KrbD3uOephlSqKS+yK7VY1eJcy0baRyeXLDnu46iWP250kNbRyT1QySEtR7XeUm8RlimgVXA71kV3VdMr0oLVH8zOZF8d/3ZV06o/Ix0WSpkccy2/Suw5q33vP54jnl7uTYfZQX+T2vVisTCUHsyqlkZD2EoBGia1pHsxVOzoWkFWU8mz5FGjGjJUoxoUVKMaFFSjGhRUoxoUVKMaFFTrolqfalRDgmpUg4JqVIOCalSDgmpUg4JqVIOCalSDgmpUg4JqVIOCalSDgmpUg4JqVIOCalSDgmpUg4JqVINiQDWqIUE1qkFBNapBccZqpvthk6t5Dbfp3UhndWRcVjhWSNmUm/fSWV0pX+g+S5oN98ZOpaO6Ur4gNi2RUmp+Ew7agKLCS9pcujR8KBuzCcU+8rv6S+FJhSosdSqHig/nn96MdMmyA9rn9hFp7fOsHenSbzfidfo1K/Tv/dnXwwhZouhUVv27/tjQHj2MOtfpE0IIIYQQQgD5D4thRYd84C2qAAAAAElFTkSuQmCC',
  //     firstName: 'coleg1',
  //     lastName: 'coleg1',
  //     department: 'Department1',
  //     skills: ['skill1','skill2','skill3'],
  //     team: 'Team1',
  //     email: 'example@example.com'
  //   },
  //   {
  //     profilePicture: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANoAAADoCAMAAAC+cQpPAAAAflBMVEX///8AAACBgYE+Pj7p6emsrKxNTU2Hh4ebm5vT09PU1NTHx8fDw8PPz8/JycnLy8u5ubn09PTh4eFzc3OWlpaOjo7j4+NhYWFoaGg0NDRUVFRubm5dXV3t7e0lJSV7e3sTExMdHR1FRUU7OzszMzOurq67u7sjIyMYGBikpKSXggkjAAAD0klEQVR4nO2d21bqMBRFyfEKikhFQOR2UDj2/3/wWKo2bdOGNBndq7jmmxk+rDkoachlp9cjhBBCCCGEEGInil8vPrbvy+c76SSBibcqYzOVjhOOK1XgSTpRKK6LZp/0pUOFYGUQ++RROpc/Y7PZObitq9TUQDqaJ5tKM6Wks/kR1ZipG+l0Xpg6x4yxdDwPprVmaiKdz4PnerWtdD4PqrvHlO6OuCrfad/spRM2ZmBTe5ZO2Jh7m9qrdMLGPNrUZtIJG3Owqc2lEzZmaFP7I52wMRW/ZzJi6YTNsal1+Afpk0VNOp8HD/VmnZ4i2daqRdLxfKh9sy2k0/nxVqN2KR3Oj5r+v8M9f8pdlVl3x48/VHzdujt81DAOt7o95fPDeFEyG0lnCsbo4rw6kBzRZJdqrTfntsCWsIqijr/KCMFjcIhvTyLej1bSYU8nmrxUjxyNdKTXvL+wqxi4lc5tJXL9wDLAZ8ktSzP17JDX23Y+Zgp4eXv819NMKdTuxN9MqaG0hBHfpzEFcZTp1YNkrKU9ytRuo3ABbzmxblbODbRxV+XElTtoU11h+pAUrDf3ZUAzsOHkbUg1rE4y5PMI1pEENVP30joawV5qKUjb0gJ2/QlIq6XWvS9uLKV9NPZh1a6lfTRKZxSoRjVJfo/afDav3yqe4/3z3/NTfMBqPes+H51k7Tf/Ex1bzbqBNSPZOXhDtfahGtWo1g5UoxrV2uFXqTnMllBNCKpRjWrtQDWqUa0dqEY1qrUD1agGruawnEE1IahGNaq1A9WoRrV2+FVqI6pRTQ6qUQ1KrbD3uOephlSqKS+yK7VY1eJcy0baRyeXLDnu46iWP250kNbRyT1QySEtR7XeUm8RlimgVXA71kV3VdMr0oLVH8zOZF8d/3ZV06o/Ix0WSpkccy2/Suw5q33vP54jnl7uTYfZQX+T2vVisTCUHsyqlkZD2EoBGia1pHsxVOzoWkFWU8mz5FGjGjJUoxoUVKMaFFSjGhRUoxoUVKMaFFTrolqfalRDgmpUg4JqVIOCalSDgmpUg4JqVIOCalSDgmpUg4JqVIOCalSDgmpUg4JqVIOCalSDgmpUg4JqVINiQDWqIUE1qkFBNapBccZqpvthk6t5Dbfp3UhndWRcVjhWSNmUm/fSWV0pX+g+S5oN98ZOpaO6Ur4gNi2RUmp+Ew7agKLCS9pcujR8KBuzCcU+8rv6S+FJhSosdSqHig/nn96MdMmyA9rn9hFp7fOsHenSbzfidfo1K/Tv/dnXwwhZouhUVv27/tjQHj2MOtfpE0IIIYQQQgD5D4thRYd84C2qAAAAAElFTkSuQmCC',
  //     firstName: 'coleg1',
  //     lastName: 'coleg1',
  //     department: 'Department1',
  //     skills: ['skill1','skill2','skill3'],
  //     team: 'Team1',
  //     email: 'example@example.com'
  //   },
  //   {
  //     profilePicture: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANoAAADoCAMAAAC+cQpPAAAAflBMVEX///8AAACBgYE+Pj7p6emsrKxNTU2Hh4ebm5vT09PU1NTHx8fDw8PPz8/JycnLy8u5ubn09PTh4eFzc3OWlpaOjo7j4+NhYWFoaGg0NDRUVFRubm5dXV3t7e0lJSV7e3sTExMdHR1FRUU7OzszMzOurq67u7sjIyMYGBikpKSXggkjAAAD0klEQVR4nO2d21bqMBRFyfEKikhFQOR2UDj2/3/wWKo2bdOGNBndq7jmmxk+rDkoachlp9cjhBBCCCGEEGInil8vPrbvy+c76SSBibcqYzOVjhOOK1XgSTpRKK6LZp/0pUOFYGUQ++RROpc/Y7PZObitq9TUQDqaJ5tKM6Wks/kR1ZipG+l0Xpg6x4yxdDwPprVmaiKdz4PnerWtdD4PqrvHlO6OuCrfad/spRM2ZmBTe5ZO2Jh7m9qrdMLGPNrUZtIJG3Owqc2lEzZmaFP7I52wMRW/ZzJi6YTNsal1+Afpk0VNOp8HD/VmnZ4i2daqRdLxfKh9sy2k0/nxVqN2KR3Oj5r+v8M9f8pdlVl3x48/VHzdujt81DAOt7o95fPDeFEyG0lnCsbo4rw6kBzRZJdqrTfntsCWsIqijr/KCMFjcIhvTyLej1bSYU8nmrxUjxyNdKTXvL+wqxi4lc5tJXL9wDLAZ8ktSzP17JDX23Y+Zgp4eXv819NMKdTuxN9MqaG0hBHfpzEFcZTp1YNkrKU9ytRuo3ABbzmxblbODbRxV+XElTtoU11h+pAUrDf3ZUAzsOHkbUg1rE4y5PMI1pEENVP30joawV5qKUjb0gJ2/QlIq6XWvS9uLKV9NPZh1a6lfTRKZxSoRjVJfo/afDav3yqe4/3z3/NTfMBqPes+H51k7Tf/Ex1bzbqBNSPZOXhDtfahGtWo1g5UoxrV2uFXqTnMllBNCKpRjWrtQDWqUa0dqEY1qrUD1agGruawnEE1IahGNaq1A9WoRrV2+FVqI6pRTQ6qUQ1KrbD3uOephlSqKS+yK7VY1eJcy0baRyeXLDnu46iWP250kNbRyT1QySEtR7XeUm8RlimgVXA71kV3VdMr0oLVH8zOZF8d/3ZV06o/Ix0WSpkccy2/Suw5q33vP54jnl7uTYfZQX+T2vVisTCUHsyqlkZD2EoBGia1pHsxVOzoWkFWU8mz5FGjGjJUoxoUVKMaFFSjGhRUoxoUVKMaFFTrolqfalRDgmpUg4JqVIOCalSDgmpUg4JqVIOCalSDgmpUg4JqVIOCalSDgmpUg4JqVIOCalSDgmpUg4JqVINiQDWqIUE1qkFBNapBccZqpvthk6t5Dbfp3UhndWRcVjhWSNmUm/fSWV0pX+g+S5oN98ZOpaO6Ur4gNi2RUmp+Ew7agKLCS9pcujR8KBuzCcU+8rv6S+FJhSosdSqHig/nn96MdMmyA9rn9hFp7fOsHenSbzfidfo1K/Tv/dnXwwhZouhUVv27/tjQHj2MOtfpE0IIIYQQQgD5D4thRYd84C2qAAAAAElFTkSuQmCC',
  //     firstName: 'coleg1',
  //     lastName: 'coleg1',
  //     department: 'Department1',
  //     skills: ['skill1','skill2','skill3'],
  //     team: 'Team1',
  //     email: 'example@example.com'
  //   },
  //   {
  //     profilePicture: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANoAAADoCAMAAAC+cQpPAAAAflBMVEX///8AAACBgYE+Pj7p6emsrKxNTU2Hh4ebm5vT09PU1NTHx8fDw8PPz8/JycnLy8u5ubn09PTh4eFzc3OWlpaOjo7j4+NhYWFoaGg0NDRUVFRubm5dXV3t7e0lJSV7e3sTExMdHR1FRUU7OzszMzOurq67u7sjIyMYGBikpKSXggkjAAAD0klEQVR4nO2d21bqMBRFyfEKikhFQOR2UDj2/3/wWKo2bdOGNBndq7jmmxk+rDkoachlp9cjhBBCCCGEEGInil8vPrbvy+c76SSBibcqYzOVjhOOK1XgSTpRKK6LZp/0pUOFYGUQ++RROpc/Y7PZObitq9TUQDqaJ5tKM6Wks/kR1ZipG+l0Xpg6x4yxdDwPprVmaiKdz4PnerWtdD4PqrvHlO6OuCrfad/spRM2ZmBTe5ZO2Jh7m9qrdMLGPNrUZtIJG3Owqc2lEzZmaFP7I52wMRW/ZzJi6YTNsal1+Afpk0VNOp8HD/VmnZ4i2daqRdLxfKh9sy2k0/nxVqN2KR3Oj5r+v8M9f8pdlVl3x48/VHzdujt81DAOt7o95fPDeFEyG0lnCsbo4rw6kBzRZJdqrTfntsCWsIqijr/KCMFjcIhvTyLej1bSYU8nmrxUjxyNdKTXvL+wqxi4lc5tJXL9wDLAZ8ktSzP17JDX23Y+Zgp4eXv819NMKdTuxN9MqaG0hBHfpzEFcZTp1YNkrKU9ytRuo3ABbzmxblbODbRxV+XElTtoU11h+pAUrDf3ZUAzsOHkbUg1rE4y5PMI1pEENVP30joawV5qKUjb0gJ2/QlIq6XWvS9uLKV9NPZh1a6lfTRKZxSoRjVJfo/afDav3yqe4/3z3/NTfMBqPes+H51k7Tf/Ex1bzbqBNSPZOXhDtfahGtWo1g5UoxrV2uFXqTnMllBNCKpRjWrtQDWqUa0dqEY1qrUD1agGruawnEE1IahGNaq1A9WoRrV2+FVqI6pRTQ6qUQ1KrbD3uOephlSqKS+yK7VY1eJcy0baRyeXLDnu46iWP250kNbRyT1QySEtR7XeUm8RlimgVXA71kV3VdMr0oLVH8zOZF8d/3ZV06o/Ix0WSpkccy2/Suw5q33vP54jnl7uTYfZQX+T2vVisTCUHsyqlkZD2EoBGia1pHsxVOzoWkFWU8mz5FGjGjJUoxoUVKMaFFSjGhRUoxoUVKMaFFTrolqfalRDgmpUg4JqVIOCalSDgmpUg4JqVIOCalSDgmpUg4JqVIOCalSDgmpUg4JqVIOCalSDgmpUg4JqVINiQDWqIUE1qkFBNapBccZqpvthk6t5Dbfp3UhndWRcVjhWSNmUm/fSWV0pX+g+S5oN98ZOpaO6Ur4gNi2RUmp+Ew7agKLCS9pcujR8KBuzCcU+8rv6S+FJhSosdSqHig/nn96MdMmyA9rn9hFp7fOsHenSbzfidfo1K/Tv/dnXwwhZouhUVv27/tjQHj2MOtfpE0IIIYQQQgD5D4thRYd84C2qAAAAAElFTkSuQmCC',
  //     firstName: 'coleg1',
  //     lastName: 'coleg1',
  //     department: 'Department1',
  //     skills: ['skill1','skill2','skill3'],
  //     team: 'Team1',
  //     email: 'example@example.com'
  //   },{
  //     profilePicture: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANoAAADoCAMAAAC+cQpPAAAAflBMVEX///8AAACBgYE+Pj7p6emsrKxNTU2Hh4ebm5vT09PU1NTHx8fDw8PPz8/JycnLy8u5ubn09PTh4eFzc3OWlpaOjo7j4+NhYWFoaGg0NDRUVFRubm5dXV3t7e0lJSV7e3sTExMdHR1FRUU7OzszMzOurq67u7sjIyMYGBikpKSXggkjAAAD0klEQVR4nO2d21bqMBRFyfEKikhFQOR2UDj2/3/wWKo2bdOGNBndq7jmmxk+rDkoachlp9cjhBBCCCGEEGInil8vPrbvy+c76SSBibcqYzOVjhOOK1XgSTpRKK6LZp/0pUOFYGUQ++RROpc/Y7PZObitq9TUQDqaJ5tKM6Wks/kR1ZipG+l0Xpg6x4yxdDwPprVmaiKdz4PnerWtdD4PqrvHlO6OuCrfad/spRM2ZmBTe5ZO2Jh7m9qrdMLGPNrUZtIJG3Owqc2lEzZmaFP7I52wMRW/ZzJi6YTNsal1+Afpk0VNOp8HD/VmnZ4i2daqRdLxfKh9sy2k0/nxVqN2KR3Oj5r+v8M9f8pdlVl3x48/VHzdujt81DAOt7o95fPDeFEyG0lnCsbo4rw6kBzRZJdqrTfntsCWsIqijr/KCMFjcIhvTyLej1bSYU8nmrxUjxyNdKTXvL+wqxi4lc5tJXL9wDLAZ8ktSzP17JDX23Y+Zgp4eXv819NMKdTuxN9MqaG0hBHfpzEFcZTp1YNkrKU9ytRuo3ABbzmxblbODbRxV+XElTtoU11h+pAUrDf3ZUAzsOHkbUg1rE4y5PMI1pEENVP30joawV5qKUjb0gJ2/QlIq6XWvS9uLKV9NPZh1a6lfTRKZxSoRjVJfo/afDav3yqe4/3z3/NTfMBqPes+H51k7Tf/Ex1bzbqBNSPZOXhDtfahGtWo1g5UoxrV2uFXqTnMllBNCKpRjWrtQDWqUa0dqEY1qrUD1agGruawnEE1IahGNaq1A9WoRrV2+FVqI6pRTQ6qUQ1KrbD3uOephlSqKS+yK7VY1eJcy0baRyeXLDnu46iWP250kNbRyT1QySEtR7XeUm8RlimgVXA71kV3VdMr0oLVH8zOZF8d/3ZV06o/Ix0WSpkccy2/Suw5q33vP54jnl7uTYfZQX+T2vVisTCUHsyqlkZD2EoBGia1pHsxVOzoWkFWU8mz5FGjGjJUoxoUVKMaFFSjGhRUoxoUVKMaFFTrolqfalRDgmpUg4JqVIOCalSDgmpUg4JqVIOCalSDgmpUg4JqVIOCalSDgmpUg4JqVIOCalSDgmpUg4JqVINiQDWqIUE1qkFBNapBccZqpvthk6t5Dbfp3UhndWRcVjhWSNmUm/fSWV0pX+g+S5oN98ZOpaO6Ur4gNi2RUmp+Ew7agKLCS9pcujR8KBuzCcU+8rv6S+FJhSosdSqHig/nn96MdMmyA9rn9hFp7fOsHenSbzfidfo1K/Tv/dnXwwhZouhUVv27/tjQHj2MOtfpE0IIIYQQQgD5D4thRYd84C2qAAAAAElFTkSuQmCC',
  //     firstName: 'coleg1',
  //     lastName: 'coleg1',
  //     department: 'Department1',
  //     skills: ['skill1','skill2','skill3'],
  //     team: 'Team1',
  //     email: 'example@example.com'
  //   },
  //   {
  //     profilePicture: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANoAAADoCAMAAAC+cQpPAAAAflBMVEX///8AAACBgYE+Pj7p6emsrKxNTU2Hh4ebm5vT09PU1NTHx8fDw8PPz8/JycnLy8u5ubn09PTh4eFzc3OWlpaOjo7j4+NhYWFoaGg0NDRUVFRubm5dXV3t7e0lJSV7e3sTExMdHR1FRUU7OzszMzOurq67u7sjIyMYGBikpKSXggkjAAAD0klEQVR4nO2d21bqMBRFyfEKikhFQOR2UDj2/3/wWKo2bdOGNBndq7jmmxk+rDkoachlp9cjhBBCCCGEEGInil8vPrbvy+c76SSBibcqYzOVjhOOK1XgSTpRKK6LZp/0pUOFYGUQ++RROpc/Y7PZObitq9TUQDqaJ5tKM6Wks/kR1ZipG+l0Xpg6x4yxdDwPprVmaiKdz4PnerWtdD4PqrvHlO6OuCrfad/spRM2ZmBTe5ZO2Jh7m9qrdMLGPNrUZtIJG3Owqc2lEzZmaFP7I52wMRW/ZzJi6YTNsal1+Afpk0VNOp8HD/VmnZ4i2daqRdLxfKh9sy2k0/nxVqN2KR3Oj5r+v8M9f8pdlVl3x48/VHzdujt81DAOt7o95fPDeFEyG0lnCsbo4rw6kBzRZJdqrTfntsCWsIqijr/KCMFjcIhvTyLej1bSYU8nmrxUjxyNdKTXvL+wqxi4lc5tJXL9wDLAZ8ktSzP17JDX23Y+Zgp4eXv819NMKdTuxN9MqaG0hBHfpzEFcZTp1YNkrKU9ytRuo3ABbzmxblbODbRxV+XElTtoU11h+pAUrDf3ZUAzsOHkbUg1rE4y5PMI1pEENVP30joawV5qKUjb0gJ2/QlIq6XWvS9uLKV9NPZh1a6lfTRKZxSoRjVJfo/afDav3yqe4/3z3/NTfMBqPes+H51k7Tf/Ex1bzbqBNSPZOXhDtfahGtWo1g5UoxrV2uFXqTnMllBNCKpRjWrtQDWqUa0dqEY1qrUD1agGruawnEE1IahGNaq1A9WoRrV2+FVqI6pRTQ6qUQ1KrbD3uOephlSqKS+yK7VY1eJcy0baRyeXLDnu46iWP250kNbRyT1QySEtR7XeUm8RlimgVXA71kV3VdMr0oLVH8zOZF8d/3ZV06o/Ix0WSpkccy2/Suw5q33vP54jnl7uTYfZQX+T2vVisTCUHsyqlkZD2EoBGia1pHsxVOzoWkFWU8mz5FGjGjJUoxoUVKMaFFSjGhRUoxoUVKMaFFTrolqfalRDgmpUg4JqVIOCalSDgmpUg4JqVIOCalSDgmpUg4JqVIOCalSDgmpUg4JqVIOCalSDgmpUg4JqVINiQDWqIUE1qkFBNapBccZqpvthk6t5Dbfp3UhndWRcVjhWSNmUm/fSWV0pX+g+S5oN98ZOpaO6Ur4gNi2RUmp+Ew7agKLCS9pcujR8KBuzCcU+8rv6S+FJhSosdSqHig/nn96MdMmyA9rn9hFp7fOsHenSbzfidfo1K/Tv/dnXwwhZouhUVv27/tjQHj2MOtfpE0IIIYQQQgD5D4thRYd84C2qAAAAAElFTkSuQmCC',
  //     firstName: 'coleg1',
  //     lastName: 'coleg1',
  //     department: 'Department1',
  //     skills: ['skill1','skill2','skill3'],
  //     team: 'Team1',
  //     email: 'example@example.com'
  //   },
  //   {
  //     profilePicture: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANoAAADoCAMAAAC+cQpPAAAAflBMVEX///8AAACBgYE+Pj7p6emsrKxNTU2Hh4ebm5vT09PU1NTHx8fDw8PPz8/JycnLy8u5ubn09PTh4eFzc3OWlpaOjo7j4+NhYWFoaGg0NDRUVFRubm5dXV3t7e0lJSV7e3sTExMdHR1FRUU7OzszMzOurq67u7sjIyMYGBikpKSXggkjAAAD0klEQVR4nO2d21bqMBRFyfEKikhFQOR2UDj2/3/wWKo2bdOGNBndq7jmmxk+rDkoachlp9cjhBBCCCGEEGInil8vPrbvy+c76SSBibcqYzOVjhOOK1XgSTpRKK6LZp/0pUOFYGUQ++RROpc/Y7PZObitq9TUQDqaJ5tKM6Wks/kR1ZipG+l0Xpg6x4yxdDwPprVmaiKdz4PnerWtdD4PqrvHlO6OuCrfad/spRM2ZmBTe5ZO2Jh7m9qrdMLGPNrUZtIJG3Owqc2lEzZmaFP7I52wMRW/ZzJi6YTNsal1+Afpk0VNOp8HD/VmnZ4i2daqRdLxfKh9sy2k0/nxVqN2KR3Oj5r+v8M9f8pdlVl3x48/VHzdujt81DAOt7o95fPDeFEyG0lnCsbo4rw6kBzRZJdqrTfntsCWsIqijr/KCMFjcIhvTyLej1bSYU8nmrxUjxyNdKTXvL+wqxi4lc5tJXL9wDLAZ8ktSzP17JDX23Y+Zgp4eXv819NMKdTuxN9MqaG0hBHfpzEFcZTp1YNkrKU9ytRuo3ABbzmxblbODbRxV+XElTtoU11h+pAUrDf3ZUAzsOHkbUg1rE4y5PMI1pEENVP30joawV5qKUjb0gJ2/QlIq6XWvS9uLKV9NPZh1a6lfTRKZxSoRjVJfo/afDav3yqe4/3z3/NTfMBqPes+H51k7Tf/Ex1bzbqBNSPZOXhDtfahGtWo1g5UoxrV2uFXqTnMllBNCKpRjWrtQDWqUa0dqEY1qrUD1agGruawnEE1IahGNaq1A9WoRrV2+FVqI6pRTQ6qUQ1KrbD3uOephlSqKS+yK7VY1eJcy0baRyeXLDnu46iWP250kNbRyT1QySEtR7XeUm8RlimgVXA71kV3VdMr0oLVH8zOZF8d/3ZV06o/Ix0WSpkccy2/Suw5q33vP54jnl7uTYfZQX+T2vVisTCUHsyqlkZD2EoBGia1pHsxVOzoWkFWU8mz5FGjGjJUoxoUVKMaFFSjGhRUoxoUVKMaFFTrolqfalRDgmpUg4JqVIOCalSDgmpUg4JqVIOCalSDgmpUg4JqVIOCalSDgmpUg4JqVIOCalSDgmpUg4JqVINiQDWqIUE1qkFBNapBccZqpvthk6t5Dbfp3UhndWRcVjhWSNmUm/fSWV0pX+g+S5oN98ZOpaO6Ur4gNi2RUmp+Ew7agKLCS9pcujR8KBuzCcU+8rv6S+FJhSosdSqHig/nn96MdMmyA9rn9hFp7fOsHenSbzfidfo1K/Tv/dnXwwhZouhUVv27/tjQHj2MOtfpE0IIIYQQQgD5D4thRYd84C2qAAAAAElFTkSuQmCC',
  //     firstName: 'coleg1',
  //     lastName: 'coleg1',
  //     department: 'Department1',
  //     skills: ['skill1','skill2','skill3'],
  //     team: 'Team1',
  //     email: 'example@example.com'
  //   }
    
  // ];

  // categoryControl = new FormControl();
  // categoryGroup: CategoryOptionsGroup[] = [
  //   {
  //     category: 'Department',
  //     options: [
  //       {value: 'Department1', viewValue: 'Department1'},
  //       {value: 'Department2', viewValue: 'Department2'},
  //       {value: 'Department3', viewValue: 'Department3'}
  //     ]
  //   },
  //   {
  //     category: 'Team',
  //     options: [
  //       {value: 'Team1', viewValue: 'Team1'},
  //       {value: 'Team2', viewValue: 'Team2'},
  //       {value: 'Team3', viewValue: 'Team3'}
  //     ],
  //   },
  //   {
  //     category: 'Skills',
  //     options: [
  //       {value: 'skill1', viewValue: 'Skill1'},
  //       {value: 'skill2', viewValue: 'Skill2'},
  //       {value: 'skill3', viewValue: 'Skill3'}
  //     ],
  //   },  
  // ];

  // searchColleaguesFormControl = new FormControl();

  // searchForm = new FormGroup({
  //   searchedColleague: new FormControl(''), 
  // });

  // searchResults: Colleague[] = [];

  // ngOnInit(): void {
  //   this.search();
  // }
 
  // search(){
  //     this.searchResults = this.colleagues.filter((colleague : Colleague) =>{
  //       if(this.searchForm.value.searchedColleague === ''){
  //         return true;
  //       }
        
  //       if(this.searchForm.value.searchedColleague!= null &&
  //         colleague.firstName.toLowerCase().includes(this.searchForm.value.searchedColleague.toLowerCase())){
  //         return true;
  //       }

  //       if(this.searchForm.value.searchedColleague!= null &&
  //         colleague.lastName.toLowerCase().includes(this.searchForm.value.searchedColleague.toLowerCase())){
  //         return true;
  //       }

  //       if(this.searchForm.value.searchedColleague!= null &&
  //         colleague.firstName.toLowerCase().includes(this.searchForm.value.searchedColleague.toLowerCase())){
  //         return true;
  //       }

  //       return false;
  //     });
  // }
}
