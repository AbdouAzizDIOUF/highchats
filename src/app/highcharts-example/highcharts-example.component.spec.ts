import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighchartsExampleComponent } from './highcharts-example.component';

describe('HighchartsExampleComponent', () => {
  let component: HighchartsExampleComponent;
  let fixture: ComponentFixture<HighchartsExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HighchartsExampleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HighchartsExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
