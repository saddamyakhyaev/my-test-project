// Entry point for JiT compilation.
// declare var System: any;

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';

import { AppModule } from './app/audit-resource-app.component/module';

if (process.env.ENV === 'production') {
    enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);