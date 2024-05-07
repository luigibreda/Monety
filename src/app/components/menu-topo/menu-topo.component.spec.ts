import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuTopoComponent } from './menu-topo.component';

describe('MenuTopoComponent', () => {
  let component: MenuTopoComponent;
  let fixture: ComponentFixture<MenuTopoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuTopoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MenuTopoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
