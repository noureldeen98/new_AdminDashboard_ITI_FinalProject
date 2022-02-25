import { AfterViewInit, Component, OnChanges, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DepartmentsService } from 'src/app/Services/departments.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DialogComponent } from './../common/dialog/dialog.component';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss']
})
export class DepartmentsComponent implements OnInit, OnChanges, AfterViewInit {
  panelOpenState: boolean = false;
  allDept: any[] = [];
  displayedColumns: string[] = ['name', 'head',
  'date', 'numOfDocs', 'popularity', 'btns'];
  dataSource: any;
  //da ll paginator
  //da ll delete 3l4an yreload da
  sentDpts: any[] = [];
  //l filter
  FilterKey = '';
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  pageEvent!: PageEvent;
  constructor(private deptSet: DepartmentsService,
    private _router: Router, private _dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllDepts();
    this.filterData();
  }
  ngAfterViewInit(): void {
    // this.dataSource.paginator = this.paginator;
  }
  ngOnChanges(): void {
    console.log('filter', this.FilterKey);
  }

  getAllDepts() {
    this.deptSet.getAllDepts().then(res => {
      res?.forEach(singleDoc => {
        this.allDept.push(singleDoc);
      })
      this.dataSource = this.allDept;
      this.sentDpts = this.allDept;
    }).catch(err => {
      console.log(err);
    })
  }
  filterData() {
    // this.deptSet.filterByDept('اسنان').subscribe(data => {
    //   console.log('from ts', data);
    // })
    this.deptSet.filterByDept('اسنان').subscribe(data => {
      console.log('from ts', data);
    })
  }
  openEditForm(id: string) {
    console.log('id', id);
    this._router.navigate(['/departments/update/', id]);
  }


  //dialog
  openDialog(id: string): void {
    const dialogRef = this._dialog.open(DialogComponent, {
      width: '350px',
      data: {
        id: id,
        dpts: this.sentDpts
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.dataSource = result //kda 3mlt remove mn l array

      console.log('receieved data', result);

    });
  }




}