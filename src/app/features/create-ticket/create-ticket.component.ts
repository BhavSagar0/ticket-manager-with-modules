import { Component, inject } from '@angular/core';
import { Ticket } from '../models/ticket.interface';
import { PriorityLevel } from '../models/priority-level.enum';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { privateDecrypt } from 'crypto';


@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrl: './create-ticket.component.css',
})
export class CreateTicketComponent {
  private router = inject(Router);

  onSubmit() {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(this.ticketObj);
    if(this.ticketObj.id !== undefined && this.ticketObj.id !== null)
      {
        var res = this.http.put('http://localhost:3000/tickets/'+this.ticketObj.id, body,{'headers':headers}).subscribe((result:any) => {
          this.router.navigate(["home"]);
          console.log(result);
        });
      }
      else{
        var res = this.http.post('http://localhost:3000/tickets', body,{'headers':headers}).subscribe((result:any) => {
          this.router.navigate(["home"]);
          console.log(result);
        });
      }
    
  }
  priorityLevelsList = Object.values(PriorityLevel).filter(
    (value) => typeof value === 'string'
  ).filter((value) => value !== PriorityLevel[PriorityLevel.No_Priority] );
  ticketObj: Ticket;

  constructor(private http: HttpClient,private route: ActivatedRoute) {
    this.ticketObj = {
      UserId: sessionStorage.getItem("loggedInUserId") || "000",
      Title: '',
      Description: '',
      PriorityLevel: PriorityLevel.No_Priority,
      DueDate: new Date('1/1/0001 12:00:00 AM'),
      InitialStatus: '',
    };

    var ticketId = this.route.snapshot.paramMap.get('id');
    if(ticketId !== undefined && ticketId !== null)
      {
        const headers = { 'content-type': 'application/json'}
        this.http.get('http://localhost:3000/tickets/'+ticketId, {'headers':headers}).subscribe((result:any) => {
          this.ticketObj = result;  
        });
      }

    

    console.log('Priority level list' + this.priorityLevelsList);
  }
}
