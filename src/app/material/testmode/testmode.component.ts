import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-testmode',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatExpansionModule],
  templateUrl: './testmode.component.html',
  styleUrl: './testmode.component.css'
})
export class TestmodeComponent {
  private _snackbar = inject(MatSnackBar)
  readonly panelOpenState = signal(false)
  public action:string = "close"
  public date = new Date();
  public amount:number = 200

  public mess:string = "Congratulations, you made it here";
  openSnackBar(){
    this._snackbar.open(this.mess, this.action)
  }
}
