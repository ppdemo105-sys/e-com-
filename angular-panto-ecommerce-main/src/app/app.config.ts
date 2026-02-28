import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { MetaReducer, provideStore } from '@ngrx/store';
import { reducers } from '@/stores';
import { localStorageMetaReducer } from '@/local-storage.metareducer';

import { provideAnimations } from '@angular/platform-browser/animations';
import { providePrimeNG } from 'primeng/config';
import { ToastModule } from 'primeng/toast';
import Aura from '@primeuix/themes/aura';
import { MessageService } from 'primeng/api';

export const metaReducers: MetaReducer[] = [localStorageMetaReducer];

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideStore(reducers, { metaReducers }),
    provideAnimations(),
    importProvidersFrom(ToastModule),
    providePrimeNG({
      theme: { preset: Aura },
    }),
    MessageService,
  ],
};
