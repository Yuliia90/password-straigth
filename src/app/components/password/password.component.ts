import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {ValidationStatus} from "../../shared/core/constans";

export const changePassword$: Subject<number> = new Subject();

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit, OnDestroy {

  bar0!: string;
  bar1!: string;
  bar2!: string;

  destroy$: Subject<boolean> = new Subject<boolean>();

  @Input() public passwordToCheck!: string | null | undefined;

  @Output() passwordStrength: EventEmitter<boolean> = new EventEmitter<boolean>();

  getBarStatus(type: number): any {
    switch (type) {
      case ValidationStatus.lessThenEight:
        return {
          index: [0, 1, 2],
          color: ['red', 'red', 'red'],
        };
      case ValidationStatus.upperLetters:
        return {
          index: [0],
          color: ['red'],
        };
      case ValidationStatus.numbers:
        return {
          index: [0, 1],
          color: ['yellow', 'yellow', 'grey'],
        };
      case ValidationStatus.symbols:
        return {
          index: [0, 1, 2],
          color: ['green', 'green', 'green'],
        };
    }
  }

  private setBarColors(indexArray: number[], colorArray: string[]): void {
    indexArray.forEach((indexItem: number):void => {
      (this as any)['bar' + indexItem] = colorArray[indexItem];
    });
  }

  ngOnInit(): void {
    changePassword$.pipe(takeUntil(this.destroy$)).subscribe((data:number): void => {
      this.setBarColors([0, 1, 2], ['#DDD', '#DDD', '#DDD']);

      data === ValidationStatus.symbols ? this.passwordStrength.emit(true) : this.passwordStrength.emit(false);

      const color = this.getBarStatus(data);
      this.setBarColors(color.index, color.color);
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
    changePassword$.complete();
  }
}

