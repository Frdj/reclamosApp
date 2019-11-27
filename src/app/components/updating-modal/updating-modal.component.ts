import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-updating-modal',
  templateUrl: './updating-modal.component.html',
  styleUrls: ['./updating-modal.component.scss']
})
export class UpdatingModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<UpdatingModalComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string) { }

  ngOnInit() {
  }

}
