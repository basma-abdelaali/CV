import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../shared/services/contact.service';
declare var require: any
const FileSaver = require('file-saver');

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  contactForm: FormGroup;

  constructor(    
    private fb: FormBuilder,
    private contactServ: ContactService,

    ) { 
    this.contactForm = this.fb.group({
      email: [
        "",
        Validators.compose([
          Validators.pattern(
            "^[_A-Za-z0-9-]+(\\.[_A-Za-z0-9-]{0,10})*@[A-Za-z0-9]+(\\.[A-Za-z0-9]{0,10})*(\\.[A-Za-z]{0,5})$"
          ),
          Validators.required,
        ]),
      ],
      name: ["", Validators.required],
      emailHost: ["contact@hatemattia.tn", Validators.required],
      message: ["", Validators.required],
    });
  }

  ngOnInit() {
  }


  downloadPdf() {
    const pdfUrl = './assets/cv-basma.pdf';
    const pdfName = 'cv-basma.pdf';
    FileSaver.saveAs(pdfUrl, pdfName);
  }

  sendMail() {
    this.contactServ.sendMail(this.contactForm.value).subscribe((res) => {
      this.contactForm.setValue({
        email: "",
        name: "",
        emailHost: "bassmaatia@gmail.com",
        message: "",
        subject: "",
      });
    });
  }
}
