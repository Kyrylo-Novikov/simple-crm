import { ChangeDetectionStrategy, Component, inject, model, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserIF } from '../../models/user-interface.class';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-dialog-add-user',
  imports: [
    MatProgressBarModule,
    MatDatepickerModule,
    MatDialogContent,
    MatDialogActions,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './dialog-add-user.html',
  styleUrl: './dialog-add-user.scss',
})
export class DialogAddUser {
  loading = false;
  user: UserIF = {
    firstName: '',
    lastName: '',
    birthDate: 0,
    email: '',
    street: '',
    zipCode: 0,
    city: '',
  };
  birthDate!: Date;
  readonly dialogRef = inject(MatDialogRef<DialogAddUser>);
  firestore: Firestore = inject(Firestore);
  onCancelClick() {
    this.dialogRef.close();
  }

  async saveUser() {
    this.loading = true;
    this.user.birthDate = this.birthDate.getTime();
    const userCollection = collection(this.firestore, 'users');
    await addDoc(userCollection, this.user);
    this.onCancelClick();
  }
}
