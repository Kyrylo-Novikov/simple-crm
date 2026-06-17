import { ChangeDetectionStrategy, Component, inject, model, signal, OnInit } from '@angular/core';
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
import { Firestore, collection, addDoc, doc, updateDoc } from '@angular/fire/firestore';
import { MatProgressBarModule } from '@angular/material/progress-bar';
@Component({
  selector: 'app-dialog-edit-address',
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
  templateUrl: './dialog-edit-address.html',
  styleUrl: './dialog-edit-address.scss',
})
export class DialogEditAddress implements OnInit {
  user!: UserIF;
  birthDate!: Date;
  readonly dialogRef = inject(MatDialogRef<DialogEditAddress>);
  private receivedUserData = inject(MAT_DIALOG_DATA);
  firestore = inject(Firestore);
  loading = false;

  onCancelClick() {
    this.dialogRef.close();
  }

  async saveEdit() {
    this.loading = true;
    const userDoc = doc(this.firestore, `users/${this.user.id}`);
    const updateUser = {
      street: this.user.street,
      zipCode: this.user.zipCode,
      city: this.user.city,
    };
    try {
      await updateDoc(userDoc, updateUser);
    } catch (error) {
      console.log(error);
    } finally {
      this.loading = false;
      this.onCancelClick();
    }
  }
  ngOnInit(): void {
    this.user = this.receivedUserData;
  }
}
