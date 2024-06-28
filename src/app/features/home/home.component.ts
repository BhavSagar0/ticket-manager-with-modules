import { Component, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ticket } from '../models/ticket.interface';
import {
  priorityFilterNames,
  priorityFilterValues,
} from '../models/priority-filter.enum';
import {
  DueDateFilter,
  dueDateFilterNames,
  dueDateFilterValues,
} from '../models/due-date-filter.enum';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  clearAllFilters() {
    this.ticketListView = this.ticketList;
    this.dateRangeToggle = false;
    this.showFilterByDueDateDropDown = false;
    this.showFilterbyPriorityDropdown = false;
  }
  startDate: Date = new Date();
  endDate: Date = new Date();
  priorityFilterNames = priorityFilterNames;
  priorityFilterValues = priorityFilterValues;

  dueDateFilterNames = dueDateFilterNames;
  dueDateFilterValues = dueDateFilterValues;
  dateRangeToggle: boolean = false;

  currentPageSelection: number = 0;

  startDateChange(arg0: string) {
    this.startDate = new Date(arg0);
    this.ticketListView = this.ticketList;
    if (this.startDate <= this.endDate) {
      this.ticketListView = this.ticketListView.filter(
        (x) =>
          new Date(x.DueDate.toString()) >= this.startDate &&
          new Date(x.DueDate.toString()) <= this.endDate
      );
    }
  }
  endDateChange(arg0: string) {
    this.endDate = new Date(arg0);
    this.ticketListView = this.ticketList;
    if (this.startDate <= this.endDate) {
      this.ticketListView = this.ticketListView.filter(
        (x) =>
          new Date(x.DueDate.toString()) >= this.startDate &&
          new Date(x.DueDate.toString()) <= this.endDate
      );

      console.log('After : ' + this.ticketListView);
    }
  }

  filterBy(filterValue: number, filterBy: number) {
    if (filterBy === 1) {
      this.ticketListView = this.ticketList;
      this.ticketListView = this.ticketListView.filter(
        (x) => x.PriorityLevel === filterValue
      );
    } else if (filterBy === 2) {
      this.ticketListView = this.ticketList;

      if (filterValue === DueDateFilter['Within Next Week']) {
        console.log('Entered Within Next Week Zone');
        this.ticketListView = this.ticketList;
        this.ticketListView = this.ticketListView.filter(
          (x) =>
            new Date(x.DueDate.toString()) >= new Date() &&
            new Date(x.DueDate.toString()) <=
              new Date(new Date().setDate(new Date().getDate() + 7))
        );
      } else if (filterValue === DueDateFilter['Within Next Month']) {
        console.log('Before Filter : ' + this.ticketListView);

        this.ticketListView = this.ticketList;
        this.ticketListView = this.ticketListView.filter((x) => {
          return (
            new Date(x.DueDate.toString()) >= new Date() &&
            new Date(x.DueDate.toString()) <=
              new Date(new Date().setDate(new Date().getDate() + 30))
          );
        });
      } else {
        this.ticketListView = this.ticketList;
        this.dateRangeToggle = !this.dateRangeToggle;
        this.toggleDueDateFilterDropdown();
      }
    }
  }
  togglePriorityFilterDropdown() {
    this.showFilterbyPriorityDropdown = !this.showFilterbyPriorityDropdown;
  }

  toggleDueDateFilterDropdown() {
    this.showFilterByDueDateDropDown = !this.showFilterByDueDateDropDown;
  }

  start: number = 0;
  end: number = 10;
  dueDateOrder: boolean = false;
  priorityLevelOrder: boolean = false;
  showFilterbyPriorityDropdown: boolean = false;
  showFilterByDueDateDropDown: boolean = false;

  onPageChange(i: number) {
    this.start = i * 10;
    this.end = (i + 1) * 10;

    this.currentPageSelection = i;
  }

  sort(colCode: number, order: boolean) {
    if (colCode === 1) {
      if (this.priorityLevelOrder) {
        this.ticketListView.sort((a, b) =>
          a.PriorityLevel > b.PriorityLevel
            ? 1
            : a.PriorityLevel < b.PriorityLevel
            ? -1
            : 0
        );
      } else {
        this.ticketListView.sort((a, b) =>
          b.PriorityLevel > a.PriorityLevel
            ? 1
            : b.PriorityLevel < a.PriorityLevel
            ? -1
            : 0
        );
      }
      this.priorityLevelOrder = !this.priorityLevelOrder;
    } else {
      if (this.dueDateOrder) {
        this.ticketListView.sort((a, b) =>
          new Date(a.DueDate.toString()) > new Date(b.DueDate.toString())
            ? 1
            : new Date(a.DueDate.toString()) < new Date(b.DueDate.toString())
            ? -1
            : 0
        );
      } else {
        this.ticketListView.sort((a, b) =>
          new Date(b.DueDate.toString()) > new Date(a.DueDate.toString())
            ? 1
            : new Date(b.DueDate.toString()) < new Date(a.DueDate.toString())
            ? -1
            : 0
        );
      }
      this.dueDateOrder = !this.dueDateOrder;
    }
  }
  onDelete(ticketId: string | undefined) {
    console.log('Ticket to be deleted Id : ' + ticketId);
    var response = confirm('Are you sure you want to delete this ticket?');
    if (response === true) {
      const headers = { 'content-type': 'application/json' };
      this.http
        .delete('http://localhost:3000/tickets/' + ticketId, {
          headers: headers,
        })
        .subscribe((result: any) => {
          console.log('Ticket Deleted');
        });
      window.location.reload();
    }
  }
  ticketList: Ticket[] = [];
  ticketListView: Ticket[] = [];

  constructor(private http: HttpClient) {
    this.getUserTickets();
  }

  getUserTickets() {
    const headers = { 'content-type': 'application/json' };
    var res = this.http
      .get(
        'http://localhost:3000/tickets?userid=' +
          sessionStorage.getItem('loggedInUserId'),
        { headers: headers }
      )
      .subscribe((result: any) => {
        this.ticketListView = this.ticketList = JSON.parse(
          JSON.stringify(result)
        ) as Ticket[];
      });
  }
}
