import { Component, OnInit } from "@angular/core";
import { SSO } from "src/app/global/sso";
import { AuthService } from "src/app/services/auth/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  public estaLogueado: boolean = false;

  constructor(private authService: AuthService) {
    SSO.login();
  }

  ngOnInit() {}
}
