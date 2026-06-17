import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserIF } from '../../models/user-interface.class';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-dialog-edit-user',
  imports: [
    MatDialogActions,
    MatProgressBarModule,
    MatDatepickerModule,
    MatDialogContent,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './dialog-edit-user.html',
  styleUrl: './dialog-edit-user.scss',
})
export class DialogEditUser implements OnInit {
  firestore = inject(Firestore);
  user!: UserIF;
  birthDate!: Date;
  readonly dialogRef = inject(MatDialogRef<DialogEditUser>);
  private receivedUserData = inject(MAT_DIALOG_DATA);
  loading = false;

  onCancelClick() {
    this.dialogRef.close();
  }

  async saveEdit() {
    this.loading = true;
    this.user.birthDate = this.birthDate.getTime();
    const userDoc = doc(this.firestore, `users/${this.user.id}`);
    const updateUser = {
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      birthDate: this.user.birthDate,
      email: this.user.email,
    };
    try {
      await updateDoc(userDoc, updateUser);
    } catch (error) {
    } finally {
      this.loading = false;
      this.onCancelClick();
    }
  }

  ngOnInit(): void {
    this.user = this.receivedUserData;
    if (this.user.birthDate) {
      this.birthDate = new Date(this.user.birthDate);
    }
  }
}
