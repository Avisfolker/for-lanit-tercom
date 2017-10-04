import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {isUndefined} from "util";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private http: HttpClient) {}
  searchWord: string;
  searchData: any = [];
  searchErr: any = false;


  setValue() {
    this.searchErr = false;
      this.http.get('/api/getSearch?searchWord=' + this.searchWord).subscribe((data: any) => {
        console.log(data);
        console.log(data.response);
        if (data.success === false) {
          this.searchData = [];
          this.searchErr = 'Ошибка, попробуйте другое слово.';
        } else {
          if (data.response.count === 0) {
            this.searchData = [];
            this.searchErr = 'По вашему запросу ничего не найдено.';
          } else {
            this.searchData = data.response.items;
          }
        }

    });



  }
  delValue(id){
    for(let i = 0;i < this.searchData.length; i++ ) {
      if(this.searchData[i].id === id) {
        this.searchData.splice(i,1);
      }
    }


  }


  title = 'приложение';
}
