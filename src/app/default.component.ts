import { Component } from '@angular/core';

@Component({
    template:'<br><br><H2 class="flash">{{pageTitle}}</H2>',
    styleUrls: ['./default.component.css']
})

export class DefaultComponent {
    pageTitle = 'PLEASE START BY CLICKING ONE OF THE BUTTONS ABOVE.';
}