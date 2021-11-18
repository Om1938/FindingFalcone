import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
declare var jQuery: any;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent implements AfterViewInit {
  @Input() class!: string;
  @Input() title!: string;
  @Input() icon!: string;
  @Input() items!: Array<{}>;
  @Input() options: {} = {};
  @Output() onChange: EventEmitter<string | number> = new EventEmitter<
    string | number
  >();
  @ViewChild('dropdown') dropdown!: ElementRef;

  constructor() {}
  ngAfterViewInit(): void {
    const options = {
      onChange: (
        value: string | number,
        a: string | number,
        b: Array<HTMLElement>
      ) => {
        if (b != null && b.length) {
          this.onChange.emit(b[0].innerText);
        }
      },
      ...this.options,
    };
    jQuery(this.dropdown.nativeElement).dropdown(options);
  }

  ngOnInit(): void {}
}
