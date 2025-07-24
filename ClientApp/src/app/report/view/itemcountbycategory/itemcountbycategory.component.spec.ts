import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemcountbycategoryComponent } from './itemcountbycategory.component';

describe('ItemcountbycategoryComponent', () => {
  let component: ItemcountbycategoryComponent;
  let fixture: ComponentFixture<ItemcountbycategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemcountbycategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemcountbycategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
