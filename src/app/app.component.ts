import {Component} from '@angular/core';
import {SwUpdate, SwPush} from '@angular/service-worker';
import {UpdateAvailableEvent} from '@angular/service-worker/src/low_level';

@Component({
    selector: 'ls-root',
    templateUrl: './app.component.html'
})

export class AppComponent {
    constructor(swUpdate: SwUpdate, swPush: SwPush) {
        if (swUpdate.isEnabled) {
            swUpdate.available.subscribe(
                (event: UpdateAvailableEvent) => {
                    const msg = 'current version: ' +
                        event.current.hash +
                        '. New version: ' +
                        event.available.hash +
                        ' ?';
                    if (confirm(msg)) {
                        window.location.reload();
                    }
                }
            );
        }
    }
}
