import { Component, input, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Firestore, doc, docData } from '@angular/fire/firestore';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Observable, switchMap } from 'rxjs';
import { UserIF } from '../../models/user-interface.class';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogEditAddress } from '../dialog-edit-address/dialog-edit-address';
import { DialogEditUser } from '../dialog-edit-user/dialog-edit-user';
@Component({
  selector: 'app-user-detail',
  imports: [MatCardModule, MatIconModule, MatButtonModule, MatMenuModule, MatDialogModule],
  templateUrl: './user-detail.html',
  styleUrl: './user-detail.scss',
})
export class UserDetail {
  firestore = inject(Firestore);
  readonly dialog = inject(MatDialog);
  id = input<string>();
  id$ = toObservable(this.id);
  user$ = this.id$.pipe(
    switchMap((currentID) => {
      const userDoc = doc(this.firestore, `/users/${currentID}`);
      return docData(userDoc) as Observable<UserIF>;
    }),
  );
  user = toSignal(this.user$);

  editUserDetail(): void {
    this.dialog.open(DialogEditUser, { data: { ...this.user(), id: this.id() } });
  }

  editMenu(): void {
    this.dialog.open(DialogEditAddress, { data: { ...this.user(), id: this.id() } });
  }
}
