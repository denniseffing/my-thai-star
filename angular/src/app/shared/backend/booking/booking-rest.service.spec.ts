import { TestBed, inject } from '@angular/core/testing';
import {
    BaseRequestOptions,
    HttpModule,
    Http,
    Response,
    ResponseOptions,
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { BookingRestService } from './booking-rest.service';

describe('BookingRestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        BookingRestService,
        {
            provide: Http,
            useFactory: (mockBackend: MockBackend, options: BaseRequestOptions) => {
                return new Http(mockBackend, options);
            },
            deps: [MockBackend, BaseRequestOptions],
        },
        MockBackend,
        BaseRequestOptions,
      ],
    });
  });

  it('should ...', inject([BookingRestService], (service: BookingRestService) => {
    expect(service).toBeTruthy();
  }));
});
