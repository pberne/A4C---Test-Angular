import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListeOfs } from './liste-ofs';

describe('ListeOfs', () => {
  let component: ListeOfs;
  let fixture: ComponentFixture<ListeOfs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeOfs],
    }).compileComponents();

    fixture = TestBed.createComponent(ListeOfs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
