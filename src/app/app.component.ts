import { Component, OnInit } from '@angular/core';
import { DataTransferService } from './data-transfer.service';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'playgroundCodeReactive';
  constructor(private service : DataTransferService,private fb: FormBuilder) {
    
  }
  fields:any[] = [];
  formFieldColl:any[] = [];
  dynamicForm: any;
  flag = false;
  

  ngOnInit() {
    this.service.loadQuestionData().subscribe( response => {
   
      let controls:any = {};
      let data: any = response;
      this.fields = data.item;
      for(let data1 of  this.fields){
        let obj: any = {};
        obj.label = data1.text;
        obj.type = data1.type;
        obj.fieldX = 'field' + data1.linkId;
        obj.linkId = data1.linkId;
        obj.validation  = {};
        this.formFieldColl.push(obj)
        if (data1.item != undefined) {
          for(let data2 of  data1.item){
          let obj: any = {};
          obj.label = data2.text;
          obj.type = data2.type;
          obj.fieldX = 'field' + data2.linkId;
          obj.linkId = data2.linkId;
          obj.validation  = {};
          controls['field' +  data2.linkId] = new FormControl('', obj.validation);
          this.formFieldColl.push(obj)
          }
        }
        if( data1.type != 'group') {
        controls['field' +  data1.linkId] = new FormControl('', obj.validation);
        }
      }
      this.dynamicForm = new FormGroup(controls);
      
    });


  }

   
 





     
  



}
