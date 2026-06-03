import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogAddUser } from '../dialog-add-user/dialog-add-user';
import { UserIF } from '../../models/user-interface.class';
import { MatCardModule } from '@angular/material/card';
import { Firestore, collection, collectionData, addDoc, query } from '@angular/fire/firestore';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user',
  imports: [
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
  ],
  templateUrl: './user.html',
  styleUrl: './user.scss',
})
export class User {
  firestore = inject(Firestore);
  private userCollection = collection(this.firestore, 'users');
  userQuery = query(this.userCollection);
  users$ = collectionData(this.userQuery) as Observable<UserIF[]>;
  users = toSignal(this.users$, { initialValue: [] });
  readonly dialog = inject(MatDialog);

  openDialog(): void {
    this.dialog.open(DialogAddUser, {
      width: '500px',
    });
  }

  constructor() {
    this.users$.subscribe({
      next: (data) => console.log('DATA', data),
      error: (err) => console.error('SUB ERROR', err),
    });
  }
}
