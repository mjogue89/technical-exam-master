import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-alert",
  templateUrl: "./alert.component.html",
  styleUrls: ["./alert.component.scss"],
})
export class AlertComponent implements OnInit {
  clear = faWindowClose;
  constructor(
    public dialog: MatDialogRef<AlertComponent>,
    @Inject(MAT_DIALOG_DATA) public message: any
  ) {}

  ngOnInit(): void {}
}
