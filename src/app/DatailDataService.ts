import {Injectable} from "@angular/core";


@Injectable()
export class DatailDataService{
  constructor() {}

  public search(data: any[], str_search: any) {

    let cloned = data.map(x => Object.assign({}, x));
    if(str_search.length == 0) return cloned;

    cloned.forEach(x => {x.pOpen = 0;});
    cloned.forEach(x => {
      if(x.pGroup != 10)
      if((x.pName != undefined && x.pName.indexOf(str_search) != -1) || (x.pTopic != undefined && x.pTopic.indexOf(str_search) != -1)){
        if(x.pParent != 0) cloned.forEach(x2 => {if(x2.pID == x.pParent) this.editParentData(x2);});
        else this.editParentData(x);
      }
    });

    console.log(cloned)
    return cloned;
  }

  public editParentData(parent){
    parent.pOpen = 1;
    parent.pName = `<span style="text-decoration: underline; padding-left: 0;">${parent.pName}</span>`;
  }


}
