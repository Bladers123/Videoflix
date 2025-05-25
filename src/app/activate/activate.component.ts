import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-activate',
  imports: [CommonModule],
  templateUrl: './activate.component.html',
  styleUrl: './activate.component.scss'
})


export class ActivateComponent implements OnInit {
  uid: string = '';
  token: string = '';
  activated = false;
  loading = true;

  constructor(private route: ActivatedRoute, private http: HttpClient,) { }

  ngOnInit() {
    this.uid = this.route.snapshot.paramMap.get('uid')!;
    this.token = this.route.snapshot.paramMap.get('token')!;
    const successParam = this.route.snapshot.queryParamMap.get('success');

    if (successParam === 'true') {
      this.activated = true;
      this.loading = false;
    } else if (successParam === 'false') {
      this.activated = false;
      this.loading = false;
    } else {
      this.http.get<{ message: string }>(`/api/auth/activate/${this.uid}/${this.token}/`).subscribe(() => {
        this.activated = true; this.loading = false;
      }, () => {
        this.activated = false; this.loading = false;
      });
    }
  }
}