import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.css']
})
export class ModalDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ModalDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public modalData: any,
  ) {
    console.log(this.modalData);
  }

  ngOnInit() { }

  childEvent($event) {
    if($event === true) {
      this.closeModal();
    }    
  }
  
  closeModal() {
    this.dialogRef.close();
  }
}
