import {Injectable} from "@angular/core";


@Injectable()
export class SearchService {

  public last_time: Date;
  public timeout: any;
  constructor(){

  }

  inputWithDelay(func, delay){

    clearTimeout(this.timeout);
    this.timeout = setTimeout(()=>{
      func();
    }, delay);
  }
}
