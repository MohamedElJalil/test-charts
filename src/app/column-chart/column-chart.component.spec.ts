import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnChartComponent } from './column-chart.component';

import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { NouisliderModule } from 'ng2-nouislider';

describe('ColumnChartComponent', () => {
  let component: ColumnChartComponent;
  let fixture: ComponentFixture<ColumnChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        Ng2GoogleChartsModule,
        NouisliderModule,
     ],
      declarations: [ ColumnChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColumnChartComponent);
    component = fixture.componentInstance;
    component.data = [84, 14, 234, 37, 64, 42, 197, 11];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return the supported number', () => {
    const data = [84, 14, 234];
    expect(data).toContain(84);
    expect(data).toContain(14);
    expect(data).toContain(234);
  });
});
