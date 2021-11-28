import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dropfile',
  templateUrl: './dropfile.component.html',
  styleUrls: ['./dropfile.component.css']
})
export class DropfileComponent implements OnInit {
  error: string = "";
  dragAreaClass: string = "";
  onFileChange(event: any) {
    let files: FileList = event.target.files;
    this.saveFiles(files);
  }

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.dragAreaClass = "dragarea";
  }
  onDragOver(event: any) {
    this.dragAreaClass = "droparea";
    event.preventDefault();
  }
  onDragEnter(event: any) {
    this.dragAreaClass = "droparea";
    event.preventDefault();
  }
  onDragEnd(event: any) {
    this.dragAreaClass = "dragarea";
    event.preventDefault();
  }
  onDragLeave(event: any) {
    this.dragAreaClass = "dragarea";
    event.preventDefault();
  }
  onDrop(event: any) {
    this.dragAreaClass = "dragarea";
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.files) {
      let files: FileList = event.dataTransfer.files;
      this.saveFiles(files);
    }
  }

  saveFiles(files: FileList) {
    if (files.length > 1) this.error = "Only one file at time allow";
    else {
      this.error = "";
      console.log("before reader");
      console.log(files[0].size, files[0].name, files[0].type);
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = () => {
        this.http.put('/myapi/files', { name: files[0].name, content: reader.result })
          .subscribe({
            next: (res) => console.log('file sent ok %o', res),
            error: (error) => console.error('file sent ko %o', error),
            complete: () => console.info('file put completed')
          });
      };
    }
  }
}