import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderTicketErrorComponent } from './order-ticket-error.component';

describe('OrderTicketErrorComponent', () => {
  let component: OrderTicketErrorComponent;
  let fixture: ComponentFixture<OrderTicketErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderTicketErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderTicketErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
