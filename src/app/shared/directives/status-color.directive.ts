import { Directive, ElementRef, Input, HostListener } from '@angular/core';

@Directive({
  selector: '[appStatusColor]',
})
export class StatusColorDirective {
  constructor(private el: ElementRef) {}

  @Input('appStatusColor') statusColor: string;

  @HostListener('onLoad') onLoad() {
    console.log(this.statusColor);
    this.setStatusColor(this.statusColor);
  }
  private setStatusColor(status: string) {
    console.log(this.statusColor);
    if (status === 'Expired') {
    } else if (status === 'Error') {
      this.el.nativeElement.style.color = 'red';
    } else if (status === 'InProgress') {
      this.el.nativeElement.style.color = 'blue';
    } else if (status === 'Scheduled') {
      this.el.nativeElement.style.color = 'white';
    } else if (status === 'Success') {
      this.el.nativeElement.style.color = 'green';
    }
  }
}
