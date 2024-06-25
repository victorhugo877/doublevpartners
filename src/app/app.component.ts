import { Component, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'project0001-angular';
  successMessage = '';
  private _message$ = new Subject<string>();

  @ViewChild("selfClosingAlert") selfClosingAlert: NgbAlert | null = null;

  constructor(){
    this._message$
			.pipe(
				takeUntilDestroyed(),
				tap((message) => (this.successMessage = message)),
				debounceTime(5000),
			)
			.subscribe(() => this.selfClosingAlert?.close());
  }


  public changeSuccessMessage() {
		this._message$.next(`${new Date()} - Message successfully changed.`);
	}
}
