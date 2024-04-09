import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { graphqlProvider } from './graphql.provider';
import { environments } from '../environments/environments';

const firebaseConfig = environments.firebaseConfig
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
  ],
  providers: [graphqlProvider],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';
}
