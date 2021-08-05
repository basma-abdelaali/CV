import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, retry } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ContactService {


  path = " https://bck-cv.herokuapp.com/";

  constructor( private http: HttpClient) {}

  /**
   * Option http
   */
  private createRequestOptions() {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
    return headers;
  }

  /**
   * traitement Erreur
   * @param erreur
   */
  traitementErreur(erreur: HttpErrorResponse) {
    if (erreur.error instanceof ErrorEvent) {
      console.log("Une erreur s est produite", erreur.error.message);
    } else
      console.error(
        "code renvoyé par le backen " +
          erreur.status +
          +"le corps était : " +
          JSON.stringify(erreur.error)
      );
    return throwError(
      "quelque chose est arrivé ; Veuillez reessayer plus tard"
    );
  }

  /**
   * Send Mail
   * @param data
   */
   sendMail(data) {
    const options = this.createRequestOptions();
    return this.http
      .post(this.path + "/mail", JSON.stringify(data), { headers: options })
      .pipe(retry(2), catchError(this.traitementErreur));
  }

}
